import { NextResponse } from 'next/server';
import { matchPmfbyRule, ClaimScenario } from '@/lib/pmfby-rules';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const payload: ClaimScenario = await request.json();

    // 1. Pass parsed payload to deterministic rule engine
    const matchedRule = matchPmfbyRule(payload);

    const plainLanguageExplanation = matchedRule.technicalDescription;
    const rtiDraft = `To the Public Information Officer,\nState Agriculture Department & PMFBY Nodal Agency,\n\nSubject: Request for Information under RTI Act, 2005 regarding PMFBY Claim Rule [${matchedRule.ruleCode}].\n\nDear Sir/Madam,\n\nRegarding my PMFBY claim for ${payload.crop || 'Crop'} (Rule: ${matchedRule.clauseTitle}), please provide certified copies of the following under RTI Act 2005:\n${matchedRule.missingDataRequired.map((dp, idx) => `${idx + 1}. ${dp}`).join('\n')}\n\nSincerely,\n[Farmer Name]\nAadhaar: [Aadhaar Redacted]\nApplication Ref: [CLM-8892]`;

    // 2. Return combined response payload
    return NextResponse.json({
      ruleCode: matchedRule.ruleCode,
      clauseTitle: matchedRule.clauseTitle,
      plainLanguageExplanation,
      rtiDraft,
    });
  } catch (error) {
    console.error('Error in analyze-claim API route:', error);
    return NextResponse.json(
      { error: 'Failed to process claim analysis' },
      { status: 500 }
    );
  }
}
