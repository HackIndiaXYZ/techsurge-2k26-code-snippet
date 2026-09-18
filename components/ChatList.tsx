'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Search, MessageSquare, Sparkles, X, User, CheckCheck, Clock } from 'lucide-react';

export type Chat = {
  id: string;
  name: string;
  last_message: string;
  timestamp?: string;
  unread_count?: number;
  role_tag?: string;
  avatar_url?: string;
};

const DEFAULT_DEMO_CHATS: Chat[] = [
  {
    id: 'c1',
    name: 'Ramesh Kumar (Farmer)',
    last_message: 'Has my Kharif Paddy claim #CLM-8902 been verified by the DAO?',
    timestamp: '10:42 AM',
    unread_count: 2,
    role_tag: 'farmer',
    avatar_url: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'c2',
    name: 'Dr. S. K. Sharma (DAO)',
    last_message: 'Joint inspection team approved CCE loss report for Medak mandal.',
    timestamp: '09:15 AM',
    unread_count: 0,
    role_tag: 'district_officer',
    avatar_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'c3',
    name: 'Pooja Verma (CSC VLE)',
    last_message: 'Batch non-loanee farmer applications uploaded for village #402.',
    timestamp: 'Yesterday',
    unread_count: 1,
    role_tag: 'csc_operator',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'c4',
    name: 'State Agriculture Grievances',
    last_message: 'Subsidy tranche #2 matching fund credited to insurance pool.',
    timestamp: 'Sep 17',
    unread_count: 0,
    role_tag: 'state_officer',
    avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
  },
];

export default function ChatList({ onSelectChat }: { onSelectChat?: (chat: Chat) => void }) {
  const [chats, setChats] = useState<Chat[]>(DEFAULT_DEMO_CHATS);
  const [q, setQ] = useState('');
  const [activeChatId, setActiveChatId] = useState<string | null>('c1');

  useEffect(() => {
    const supabase = createClient();

    // 1. Fetch initial chats from Supabase table 'chats'
    supabase
      .from('chats')
      .select('*')
      .then(({ data, error }) => {
        if (data && data.length > 0 && !error) {
          setChats(data as Chat[]);
        }
      });

    // 2. Realtime Postgres Changes Subscription
    const ch = supabase
      .channel('chats-rt')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'chats' }, (p) => {
        setChats((c) => {
          if (p.eventType === 'INSERT') return [p.new as Chat, ...c];
          if (p.eventType === 'UPDATE')
            return c.map((x) => (x.id === (p.new as Chat).id ? (p.new as Chat) : x));
          if (p.eventType === 'DELETE')
            return c.filter((x) => x.id !== (p.old as Chat).id);
          return c;
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(ch);
    };
  }, []);

  const filtered = chats.filter(
    (c) =>
      c.name.toLowerCase().includes(q.toLowerCase()) ||
      c.last_message.toLowerCase().includes(q.toLowerCase())
  );

  const handleChatClick = (chat: Chat) => {
    setActiveChatId(chat.id);
    if (onSelectChat) onSelectChat(chat);
  };

  const getRoleBadge = (role?: string) => {
    switch (role?.toLowerCase()) {
      case 'farmer':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'district_officer':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'csc_operator':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'state_officer':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 glass-panel border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      {/* Header */}
      <header className="py-4 px-5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-extrabold text-base tracking-tight font-mono text-slate-100">
              crop<span className="text-emerald-400">.ins</span> Chat &amp; Helpdesk
            </h2>
            <p className="text-[10px] text-slate-400 font-medium">Realtime PMFBY Stakeholder Communication</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Sparkles className="w-3 h-3 animate-pulse" /> Live Realtime
        </span>
      </header>

      {/* Search Input Box */}
      <div className="p-3 relative bg-slate-950/60 border-b border-slate-800/60">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search chats, farmers, officers..."
          className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium"
        />
        {q && (
          <button
            onClick={() => setQ('')}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Chat List Items Container */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-2">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs">
            <MessageSquare className="w-8 h-8 mx-auto text-slate-700 mb-2 stroke-[1.5]" />
            No chats match "{q}"
          </div>
        ) : (
          filtered.map((c) => {
            const isActive = activeChatId === c.id;
            return (
              <div
                key={c.id}
                onClick={() => handleChatClick(c)}
                className={`rounded-2xl p-3.5 flex items-start justify-between border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-950/50 to-slate-900 border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {c.avatar_url ? (
                    <img
                      src={c.avatar_url}
                      alt={c.name}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-700 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 font-bold flex items-center justify-center text-xs flex-shrink-0">
                      {c.name[0]}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-xs text-slate-100 truncate group-hover:text-emerald-300">
                        {c.name}
                      </span>
                      {c.timestamp && (
                        <span className="text-[10px] text-slate-500 flex-shrink-0 font-mono">
                          {c.timestamp}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 truncate leading-snug">
                      {c.last_message}
                    </p>

                    {c.role_tag && (
                      <span
                        className={`inline-block mt-1.5 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider border ${getRoleBadge(
                          c.role_tag
                        )}`}
                      >
                        {c.role_tag.replace(/_/g, ' ')}
                      </span>
                    )}
                  </div>
                </div>

                {c.unread_count && c.unread_count > 0 ? (
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] flex items-center justify-center shadow-md shadow-emerald-500/30 flex-shrink-0 ml-2 mt-1">
                    {c.unread_count}
                  </span>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
