import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { crop, sumInsured, claimReceived, damageType, reportingDelay } = body;

    const cropName = crop || 'Paddy / Crop';
    const expectedAmt = sumInsured ? `₹${sumInsured}` : '₹50,000';
    const actualAmt = claimReceived ? `₹${claimReceived}` : '₹12,500';

    let rule = 'Section 25: Area Correction Factor (ACF)';
    let plainLanguageExplanation =
      `Based on PMFBY rules, your claim for ${cropName} was likely reduced because the total insured area in your block exceeded the government's official sown area. To prevent over-insurance, all claims in this unit were scaled down by the Area Correction Factor (ACF).`;
    let rtiDraft =
      `To the Public Information Officer,\nState Agriculture Department & PMFBY Nodal Agency,\n\nSubject: Request for Information under RTI Act, 2005 regarding PMFBY Claim Application #CLM-8892.\n\nDear Sir/Madam,\n\nI received a partial PMFBY claim for Application #CLM-8892 (${cropName}). Expected: ${expectedAmt} | Received: ${actualAmt}.\n\nI request the following data under the RTI Act, 2005:\n1. The total notified sown area for ${cropName} in my Insurance Unit.\n2. The total insured area under PMFBY policies in this unit.\n3. The exact Area Correction Factor (ACF) calculation applied to my claim.\n\nSincerely,\nRamesh Kumar\nFarmer ID: FRM-90824152`;

    if (damageType === 'LOCALIZED') {
      if (reportingDelay === 'OVER_72') {
        rule = 'Section 21.4: 72-Hour Loss Intimation Requirement';
        plainLanguageExplanation =
          `Under PMFBY guidelines for localized calamities (such as hailstorm or inundation), farmers are required to intimate crop loss within 72 hours of the event. Because the intimation was recorded after 72 hours, individual field assessment was disallowed and the claim was defaulted to standard unit yield calculations.`;
        rtiDraft =
          `To the Public Information Officer,\nState Agriculture Department & PMFBY Nodal Agency,\n\nSubject: Request for Information under RTI Act, 2005 regarding 72-Hour Intimation Record for Application #CLM-8892.\n\nDear Sir/Madam,\n\nRegarding my PMFBY claim for ${cropName} (Expected: ${expectedAmt}, Received: ${actualAmt}), please provide:\n1. The exact timestamp of the loss intimation record in the portal.\n2. Certified copy of the Mandal-level localized calamity report.\n3. The reason for disallowance under Section 21.4 individual assessment.\n\nSincerely,\nRamesh Kumar\nFarmer ID: FRM-90824152`;
      } else {
        rule = 'Section 21.2: Joint Inspection Committee (JIC) Assessment';
        plainLanguageExplanation =
          `For localized damage reported within 72 hours, loss assessment is conducted by a Joint Inspection Committee (DAO & Insurer). Your claim payout was determined by the verified damage percentage of your specific survey number as recorded in the JIC field report.`;
        rtiDraft =
          `To the Public Information Officer,\nState Agriculture Department & PMFBY Nodal Agency,\n\nSubject: Request for Information under RTI Act, 2005 regarding Joint Inspection Report for Application #CLM-8892.\n\nDear Sir/Madam,\n\nI request certified copies of the following under the RTI Act, 2005:\n1. The Joint Inspection Committee (JIC) field report for my survey number (${cropName}).\n2. The surveyor loss percentage calculation sheet.\n3. Final claim approval voucher.\n\nSincerely,\nRamesh Kumar\nFarmer ID: FRM-90824152`;
      }
    }

    return NextResponse.json({
      rule,
      plainLanguageExplanation,
      rtiDraft,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process claim analysis' },
      { status: 500 }
    );
  }
}
