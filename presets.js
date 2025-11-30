/* ========================================
   PAYTABLE PRESETS CONFIGURATION
   ======================================== */

const PRESETS = [
    {
        id: 'pick6_850',
        label: 'Pick6 • 8.50',
        questions: 6,
        oddsPerQuestion: 8.50,
        prizes: [0, 0, 10, 20, 100, 1000, 10000],
        note: '6/6 $10,000; 5/6 $1,000; 4/6 $100; 3/6 $20; 2/6 $10',
        prizeModes: null,
    },
    {
        id: 'pick6_split_top',
        label: 'Pick6 • 8.50 (Split Top 2)',
        questions: 6,
        oddsPerQuestion: 8.50,
        prizes: [0, 0, 10, 20, 100, 1000, 10000],
        note: 'Top two scores (6/6, 5/6) are Split. Others are Guaranteed.',
        prizeModes: ['guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'split', 'split']
    },
    {
        id: 'pick_em',
        label: 'NFL 10Q • 1.92 (Split Top 3)',
        questions: 10,
        oddsPerQuestion: 1.92,
        prizes: [0, 0, 0, 0, 0, 0, 0, 1, 100, 250, 1000],
        note: 'Top three scores (10/10, 9/10, 8/10) are Split. Others are Guaranteed.',
        prizeModes: ['guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'split', 'split', 'split']
    },

    // ===== EXAMPLE PRESETS BELOW - COPY AND MODIFY THESE =====

    {
        id: 'quiz8_medium',
        label: 'Quiz 8 • 3.00 (Medium Difficulty)',
        questions: 8,
        oddsPerQuestion: 3.00,
        prizes: [0, 0, 0, 5, 10, 50, 250, 1000, 5000],
        note: '8/8 $5,000; 7/8 $1,000; 6/8 $250 (Split top 3)',
        prizeModes: ['guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'split', 'split', 'split']
    },
    {
        id: 'soccer5_easy',
        label: 'Soccer 5 • 2.50 (Easy)',
        questions: 5,
        oddsPerQuestion: 2.50,
        prizes: [0, 0, 5, 25, 100, 500],
        note: '5/5 $500; 4/5 $100; 3/5 $25 (All guaranteed)',
        prizeModes: ['guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed']
    },
    {
        id: 'highstakes_pick6',
        label: 'Aggressive Pick 6',
        questions: 6,
        oddsPerQuestion: 8.50,
        prizes: [0, 0.5, 5, 10, 100, 1000, 100000],
        note: '6/6 $50,000; 5/6 $5,000 (Split top score only)',
        prizeModes: ['guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'split']
    },
    {
        id: 'EPL 10Q Coupon',
        label: 'Coupon 10Q',
        questions: 10,
        oddsPerQuestion: 1.80,
        prizes: [0, 0, 0, 0, 0.1, 0.5, 1, 2, 100, 250, 1000],
        note: '10Q Coupon $1.60 cpu',
        prizeModes: ['split', 'split', 'split', 'split', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'split', 'split', 'split']
    },
    {
        id: 'vip_p6',
        label: 'VIP Pick 6',
        questions: 6,
        oddsPerQuestion: 8.50,
        prizes: [0, 25, 50, 100, 1000, 10000, 1000000],
        note: '6/6 $1,000,000; 5/6 $100,000 (Split top score only)',
        prizeModes: ['guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'split']
    }

    // ADD YOUR CUSTOM PRESETS BELOW - Just copy one of the examples above and modify:
    // {
    //   id: 'your_preset_id',
    //   label: 'Your Preset Name • X.XX',
    //   questions: 8,
    //   oddsPerQuestion: 3.00,
    //   prizes: [0, 0, 0, 5, 10, 50, 250, 1000, 5000],
    //   note: 'Optional description',
    //   prizeModes: ['guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'split', 'split', 'split']
    // }
];

/* ========================================
   UNIFORM ODDS PRESETS
   ======================================== */

const UNIFORM_ODDS_PRESETS = [
    { value: 1.50, label: '66% (1.50)' },
    { value: 1.67, label: '60% (1.67)' },
    { value: 1.82, label: '55% (1.82)' },
    { value: 2.00, label: '50% (2.00)' },
    { value: 2.50, label: '40% (2.50)' },
    { value: 3.00, label: '33.3% (3.00)' },
    { value: 4.00, label: '25% (4.00)' },
    { value: 6.00, label: '16.7% (6.00)' },
    { value: 8.50, label: '11.8% (8.50) - Pick6 default' },
    { value: 10.00, label: '10% (10.00)' },
    { value: 16.00, label: '6.25% (16.00)' }
];

/* ========================================
   GAME TEMPLATES
   ======================================== */

const GAME_TEMPLATES = [
    { id: 'pick6', label: 'Pick 6', questions: 6, text: 'What will be the correct score?', odds: 8.5 },
    { id: 'coupon10', label: 'Coupon (10Q)', questions: 10, text: 'Match Result', odds: 1.8 },
    { id: 'quiz8', label: '8 Question Predictor Quiz', questions: 8, text: 'Question', odds: 4.8 },
    { id: 'goals6', label: 'How many goals? (6Q)', questions: 6, text: 'How many goals will be scored?', odds: 4 },
    { id: 'goals8', label: 'How many goals? (8Q)', questions: 8, text: 'How many goals will be scored?', odds: 2 },
    { id: 'gcc9', label: 'Goals, Corners, Cards (9Q)', questions: 9, text: 'Prediction', odds: 4 },
    { id: 'nfl', label: "NFL Pick'em", questions: 10, text: 'Will the Chiefs win by more than 6?', odds: 1.92 }
];




