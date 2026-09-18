import { NextResponse } from 'next/server';
import { matchPmfbyRule, ClaimScenario } from '@/lib/pmfby-rules';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function POST(request: Request) {
  try {
    const payload: ClaimScenario = await request.json();

    // 1. Pass parsed payload to deterministic rule engine
    const matchedRule = matchPmfbyRule(payload);

    // 2. Prepare GenAI Prompts & Instructions
    const systemInstruction =
      "You are an assistant for the crop.ins portal. Your task is to take a PMFBY operational rule matched by our backend and output a JSON response with two keys: 'plainLanguageExplanation' (explaining the rule simply, without stating the claim is definitely right or wrong) and 'rtiDraft' (a formal Right to Information draft addressed to the Public Information Officer requesting ONLY the missing data points provided). CRITICAL: You must use generic placeholders like [Farmer Name] and strictly use [Aadhaar Redacted] for any identification numbers. NEVER generate or echo real sensitive identification numbers.";

    const prompt = `
Crop: ${payload.crop || 'Paddy / Notified Crop'}
Matched Rule Code: ${matchedRule.ruleCode}
Clause Title: ${matchedRule.clauseTitle}
Technical Description: ${matchedRule.technicalDescription}
Missing Data Points Required:
${matchedRule.missingDataRequired.map((dp, i) => `${i + 1}. ${dp}`).join('\n')}
`;

    let plainLanguageExplanation = '';
    let rtiDraft = '';

    // 3. Generative AI Integration via Gemini 2.5 Flash
    if (ai) {
      try {
        const genResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
          },
        });

        const textOutput = genResponse.text || '';
        const jsonParsed = JSON.parse(textOutput);
        plainLanguageExplanation = jsonParsed.plainLanguageExplanation || '';
        rtiDraft = jsonParsed.rtiDraft || '';
      } catch (genErr) {
        console.warn('Gemini API call warning, relying on rule-engine fallback:', genErr);
      }
    }

    // Fallback formatting if AI API key is unconfigured or call returns empty
    if (!plainLanguageExplanation) {
      plainLanguageExplanation = matchedRule.technicalDescription;
    }
    if (!rtiDraft) {
      rtiDraft = `To the Public Information Officer,\nState Agriculture Department & PMFBY Nodal Agency,\n\nSubject: Request for Information under RTI Act, 2005 regarding PMFBY Claim Rule [${matchedRule.ruleCode}].\n\nDear Sir/Madam,\n\nRegarding my PMFBY claim for ${payload.crop || 'Crop'} (Rule: ${matchedRule.clauseTitle}), please provide certified copies of the following under RTI Act 2005:\n${matchedRule.missingDataRequired.map((dp, idx) => `${idx + 1}. ${dp}`).join('\n')}\n\nSincerely,\n[Farmer Name]\nAadhaar: [Aadhaar Redacted]\nApplication Ref: [CLM-8892]`;
    }

    // 4. Return combined response payload
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
