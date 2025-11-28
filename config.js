const CONFIG = {
  // Branding & Headers
  pageTitle: "F2P – Interactive Odds Demo (SPLASH Tech, v3.0)",
  brandName: "SPLASH Tech",
  brandSub: "Free-to-Play Cost Projection Tools",
  version: "v3.1",
  mainHeader: "F2P – Interactive Odds Demo",
  introText: "Enter question text and decimal odds for the <b>optimal pick</b>. Use the controls to project winners and the full score distribution.",

  // Input Section (Card 1)
  participantsLabel: "Participants",
  questionsCountLabel: "# Questions",
  gameTemplateLabel: "Game Template",
  selectTemplatePlaceholder: "(Select a template)",
  questionTemplateLabel: "Question template",
  questionTemplatePlaceholder: "Type or choose (auto-fills when you add rows)",

  // Controls Section (Card 2)
  oddsMultiplierLabel: "Odds multiplier",
  oddsMultiplierTooltip: "Multiplies each DECIMAL odd before converting to probability (p = 1/(odds × multiplier)). Lower = easier; Higher = harder.",
  quickActionsLabel: "Quick actions",
  btnAdd: "Add question",
  btnClear: "Clear all",
  btnExample: "Load example",
  btnExport: "Export JSON",
  btnLoadCSV: "Load CSV",
  showImpliedLabel: "Show Implied Odds",

  bulkOperationsLabel: "Operations",
  btnApplyUniform: "Apply Odds",
  btnCloneTop: "Clone Top Row to All",

  paytablePresetsLabel: "Paytable Presets",
  applyStructureLabel: "Apply structure (N & odds)",
  btnPreview: "Preview",
  btnApply: "Apply",

  // Questions List (Card 3)
  questionsListLabel: "Questions (type to edit; odds = decimal for optimal pick)",

  // Stats Grid (Card 4)
  statQuestions: "Questions",
  statProb: "Jackpot Chance / Odds",
  statWinners: "Expected perfect winners @",

  // Distribution Table (Card 5)
  distTableLabel: "Expected users at each score (Poisson–binomial, independent questions)",
  tableHeaderScore: "Score",
  tableHeaderProb: "Probability %",
  tableHeaderImplied: "Implied Odds",
  tableHeaderUsers: "Expected Users @",
  tableHeaderPrize: "Prize",
  tableHeaderMode: "Payout Mode",
  tableHeaderExpPrize: "Expected Prize",
  tableTotal: "TOTAL:",
  tableTotalExpPrize: "Total Expected Prize:",

  // Chart (Card 6)
  chartSectionTitle: "<b>Score distribution</b> — X: score (0..N), Y: % of users. Line = CDF (≤ score).",
  chartXAxis: "Score",
  chartYAxis: "% of users",
  chartTitle: "Score Distribution (bars) with CDF (line)",
  chartLegendPMF: "PMF (% at score)",
  chartLegendCDF: "CDF (≤ score)",

  // Defaults & Dynamic Text
  defaultQuestionText: "Question",
  defaultAnswerText: "Optimal pick",
  defaultNewQuestion: "What will be the Correct Score?",
  exportFileName: "f2p_interactive_export.json",

  // Status Messages
  msgExported: "Exported JSON downloaded.",
  msgAppliedUniform: "Applied uniform odds of {0} to all questions.",
  msgCopiedTop: "Copied top row to all.",
  msgPresetNotFound: "Preset not found",
  msgAppliedPreset: "Applied preset: {0}",
  msgInvalidOdds: "Invalid odds selected (must be ≥ 1.01).",
  msgCSVLoaded: "Loaded {0} questions from CSV.",
  msgCSVError: "Error reading CSV: {0}"
};
