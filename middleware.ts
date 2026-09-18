import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

const FARMER_ROLES = ['farmer'];
const ADMIN_ROLES = [
  'district_officer',
  'district_agriculture_officer',
  'dao',
  'csc_operator',
  'csc',
  'state_officer',
  'state_agriculture_department',
  'state',
  'ministry_officer',
  'ministry_agriculture',
  'ministry',
];

const ROLE_ROUTE_MATRIX: Record<string, string> = {
  farmer: '/dashboard/farmer',
  district_officer: '/dashboard/dao',
  district_agriculture_officer: '/dashboard/dao',
  dao: '/dashboard/dao',
  csc_operator: '/dashboard/csc',
  csc: '/dashboard/csc',
  state_officer: '/dashboard/state',
  state_agriculture_department: '/dashboard/state',
  state: '/dashboard/state',
  ministry_officer: '/dashboard/ministry',
  ministry_agriculture: '/dashboard/ministry',
  ministry: '/dashboard/ministry',
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exclude static assets, API routes, and system files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 1. Refresh Supabase session if using auth.users
  const { supabase, user, response } = await updateSession(request);

  // 2. Read role from cookies or user metadata
  let role = request.cookies.get('demo_user_role')?.value;

  if (user && !role) {
    role = user.user_metadata?.role;
    if (!role) {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', user.id)
          .single();
        if (profile) {
          role = profile.role;
        }
      } catch (err) {
        console.error('Middleware profile lookup error:', err);
      }
    }
  }

  const isAuthenticated = Boolean(role || user);
  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isFarmerRoute = pathname.startsWith('/dashboard/farmer');
  const isAdminRoute =
    pathname.startsWith('/dashboard/dao') ||
    pathname.startsWith('/dashboard/csc') ||
    pathname.startsWith('/dashboard/state') ||
    pathname.startsWith('/dashboard/ministry') ||
    pathname.startsWith('/dashboard/admin');

  // Rule 1: Unauthenticated user accessing dashboard -> /login
  if (!isAuthenticated && isDashboardRoute) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const getRoleDestination = (userRole: string) => {
    const key = userRole.toLowerCase();
    return ROLE_ROUTE_MATRIX[key] || '/dashboard/farmer';
  };

  // Rule 2: Authenticated user visiting / -> Redirect to their dashboard
  if (isAuthenticated && pathname === '/' && role) {
    const targetPath = getRoleDestination(role);
    return NextResponse.redirect(new URL(targetPath, request.url));
  }

  // Rule 3: Farmers accessing admin routes -> /dashboard/farmer
  if (isAuthenticated && role && FARMER_ROLES.includes(role.toLowerCase()) && isAdminRoute) {
    return NextResponse.redirect(new URL('/dashboard/farmer', request.url));
  }

  // Rule 4: Admin accessing farmer route -> Their specific admin dashboard
  if (isAuthenticated && role && ADMIN_ROLES.includes(role.toLowerCase()) && isFarmerRoute) {
    const targetPath = getRoleDestination(role);
    return NextResponse.redirect(new URL(targetPath, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
