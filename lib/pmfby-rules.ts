export type DamageType = "LOCALIZED" | "WIDESPREAD";
export type ReportingDelay = "UNDER_72" | "OVER_72";

export interface ClaimScenario {
  crop: string;
  sumInsured: number;
  claimReceived: number;
  damageType: DamageType;
  reportingDelay?: ReportingDelay;
}

export interface MatchedRule {
  ruleCode: string;
  clauseTitle: string;
  technicalDescription: string;
  missingDataRequired: string[];
}

/**
 * Deterministic rule-matching engine that evaluates claim scenarios against
 * official PMFBY (Pradhan Mantri Fasal Bima Yojana) operational guidelines.
 */
export function matchPmfbyRule(scenario: ClaimScenario): MatchedRule {
  const { damageType, reportingDelay, claimReceived, sumInsured } = scenario;

  // Logic Branch 1: 72-Hour Late Intimation Rule for Localized Calamities
  if (damageType === "LOCALIZED" && reportingDelay === "OVER_72" && claimReceived === 0) {
    return {
      ruleCode: "SEC_21.5.2",
      clauseTitle: "Late Intimation of Localized Calamity",
      technicalDescription:
        "Under PMFBY Guidelines Section 21.5.2, individual localized calamity claims (such as hailstorm, landslide, or inundation) must be intimated within 72 hours of the occurrence. Intimations received after 72 hours are subject to automatic repudiation due to delayed loss verification availability.",
      missingDataRequired: [
        "Timestamp of claim registration on NCIP",
        "Local weather station timestamp of peril"
      ]
    };
  }

  // Logic Branch 2: Area Correction Factor (ACF) / Yield Shortfall for Widespread Claims
  if (damageType === "WIDESPREAD" && claimReceived > 0 && claimReceived < sumInsured) {
    return {
      ruleCode: "SEC_25_OR_18",
      clauseTitle: "Yield Shortfall / Area Correction Factor",
      technicalDescription:
        "Under PMFBY Guidelines Section 18 & Section 25, partial claim settlements occur when the Actual Yield (AY) recorded via Crop Cutting Experiments (CCE) is less than the Threshold Yield (TY), or when the Area Correction Factor (ACF) is invoked due to total insured area exceeding the official state sown area in the notified block.",
      missingDataRequired: [
        "Threshold Yield (TY)",
        "Actual Yield (AY)",
        "Notified block sown area vs Insured block area"
      ]
    };
  }

  // Logic Branch 3: Fallback / Unknown Review Required
  return {
    ruleCode: "UNKNOWN",
    clauseTitle: "Standard Review Required",
    technicalDescription:
      "The claim scenario parameters do not match standard automated rule triggers. A manual audit of the NCIP portal log and bank disbursement records is required.",
    missingDataRequired: [
      "NCIP Status Log",
      "Bank DBT transmission record"
    ]
  };
}
