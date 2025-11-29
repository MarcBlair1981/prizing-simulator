# Prize Simulator Enhancement Suggestions

## Current Status ✅
The SPLASH Tech Prize Simulator v3.1 is fully functional with:
- Question management with decimal odds
- Two payout modes (Split/Guaranteed)
- Paytable presets system
- Game templates
- CSV import/export
- Visual analytics and charts
- **UI Fix Applied**: Operations and Paytable Presets sections now have matching layouts

---

## 🎯 Suggested Enhancements

### 1. **Save & Load Game Configurations**

#### Feature Description:
Allow users to save complete game configurations (questions, odds, prizes, payout modes) for later use.

#### Implementation Options:

**Option A: Browser LocalStorage (Simple)**
- Save configurations to browser's localStorage
- Pros: No backend needed, instant saves
- Cons: Limited to ~5MB, browser-specific, can be cleared

**Option B: JSON Download/Upload (Current + Enhanced)**
- Extend current JSON export to include ALL game state
- Add "Load JSON" button to restore saved games
- Pros: Portable, shareable, unlimited storage
- Cons: Manual file management

**Option C: Named Saves System (Recommended)**
```javascript
// Save current game with a name
{
  "savedGames": [
    {
      "id": "game_001",
      "name": "NFL Week 12 - High Stakes",
      "timestamp": "2025-11-29T10:00:00Z",
      "participants": 1000,
      "questions": [...],
      "prizes": [...],
      "prizeModes": [...],
      "notes": "User notes about this configuration"
    }
  ]
}
```

#### UI Changes Needed:
1. Add "Save Game" button in Quick Actions
2. Add "Load Saved Game" dropdown
3. Modal dialog for naming saves
4. List view showing all saved games with:
   - Name
   - Date created
   - Quick stats (# questions, total prize pool)
   - Load/Delete buttons

---

### 2. **Non-Monetary Prizes (Free Spins, Bonus Credits, etc.)**

#### Feature Description:
Support prizes that aren't cash but have a monetary equivalent value for cost calculations.

#### Implementation Approach:

**Prize Type System:**
```javascript
{
  "prizes": [
    {
      "score": 6,
      "displayValue": "100 Free Spins",
      "monetaryValue": 50.00,  // $0.50 per spin
      "prizeType": "free_spins",
      "mode": "guaranteed"
    },
    {
      "score": 5,
      "displayValue": "$500 Bonus Credit",
      "monetaryValue": 500.00,
      "prizeType": "bonus_credit",
      "mode": "split"
    },
    {
      "score": 4,
      "displayValue": "$100 Cash",
      "monetaryValue": 100.00,
      "prizeType": "cash",
      "mode": "guaranteed"
    }
  ]
}
```

#### Prize Type Definitions:
1. **Cash** - Direct monetary prize
2. **Free Spins** - Calculated as: `quantity × value_per_spin`
3. **Bonus Credit** - In-game currency with conversion rate
4. **Merchandise** - Physical items with estimated value
5. **Entry Tickets** - Tournament/event entries with value
6. **Custom** - User-defined with manual value input

#### UI Changes Needed:

**Enhanced Prize Input:**
```
┌─────────────────────────────────────────────────────┐
│ Score 6/6 Prize Configuration                       │
├─────────────────────────────────────────────────────┤
│ Prize Type: [Dropdown: Cash/Free Spins/Bonus/etc.] │
│                                                     │
│ Display Value: [100 Free Spins___________________] │
│                                                     │
│ Monetary Value: [$___50.00_______________________] │
│ (For cost calculations)                             │
│                                                     │
│ Payout Mode: [Split ▼]                             │
└─────────────────────────────────────────────────────┘
```

**Prize Type Specific Fields:**
- **Free Spins**: Quantity + Value per spin
- **Bonus Credit**: Amount + Conversion rate (e.g., 1:1 or 2:1)
- **Merchandise**: Item name + Estimated value
- **Entry Tickets**: Event name + Ticket value

#### Table Display Enhancement:
```
Score | Probability | Users | Prize              | Mode       | Expected Cost
6/6   | 0.05%      | 0.5   | 100 Free Spins    | Split      | $25.00
                            | ($0.50 each)       |            |
5/6   | 0.30%      | 3     | $500 Bonus Credit | Guaranteed | $1,500.00
4/6   | 1.50%      | 15    | $100 Cash         | Guaranteed | $1,500.00
```

---

### 3. **Additional Simplification Suggestions**

#### A. **Preset Management**
- **Add "Save as Preset" button** - Convert current configuration to a new preset
- **Edit existing presets** - Modify built-in presets
- **Delete custom presets** - Remove user-created presets
- **Import/Export presets** - Share preset configurations

#### B. **Quick Templates**
- **Duplicate Game** - Clone current setup for variations
- **Scale Prizes** - Multiply all prizes by a factor (e.g., 2x for high-roller version)
- **Adjust Difficulty** - Bulk modify all odds by percentage

#### C. **Comparison Mode**
- **Side-by-side comparison** - Compare two game configurations
- **What-if scenarios** - Test different participant counts/odds
- **Cost projections** - See how changes affect expected costs

#### D. **Validation & Warnings**
- **Prize progression check** - Warn if prizes decrease with higher scores
- **Cost ceiling alerts** - Notify when expected cost exceeds threshold
- **Probability warnings** - Alert if jackpot odds are too high/low
- **Balance recommendations** - Suggest optimal prize/odds combinations

---

### 4. **Implementation Priority**

#### Phase 1 (Quick Wins):
1. ✅ **UI Layout Fix** - COMPLETED
2. **Enhanced JSON Export** - Include all game state
3. **Load JSON Feature** - Import saved configurations
4. **Prize Type Dropdown** - Add basic non-monetary prize support

#### Phase 2 (Core Features):
5. **Named Saves System** - LocalStorage-based save/load
6. **Non-Monetary Prize Calculator** - Full implementation
7. **Save as Preset** - Convert games to presets

#### Phase 3 (Advanced):
8. **Comparison Mode** - Side-by-side analysis
9. **Validation System** - Smart warnings and recommendations
10. **Preset Management UI** - Full CRUD for presets

---

### 5. **Non-Monetary Prize Examples**

#### Example 1: Free Spins Game
```
Game: "Spin Master Challenge"
Questions: 6
Odds: 8.50 per question

Prizes:
- 6/6: 500 Free Spins ($0.50 each) = $250 value [Split]
- 5/6: 100 Free Spins ($0.50 each) = $50 value [Split]
- 4/6: 25 Free Spins ($0.50 each) = $12.50 value [Guaranteed]
- 3/6: 10 Free Spins ($0.50 each) = $5 value [Guaranteed]
```

#### Example 2: Mixed Prize Pool
```
Game: "Ultimate Sports Predictor"
Questions: 10
Odds: 1.92 per question

Prizes:
- 10/10: $10,000 Cash [Split]
- 9/10: VIP Event Ticket ($500 value) [Split]
- 8/10: $100 Bonus Credit (1:1 conversion) [Split]
- 7/10: 50 Free Spins ($0.50 each = $25) [Guaranteed]
- 6/10: $10 Cash [Guaranteed]
```

#### Example 3: Bonus Credit Ladder
```
Game: "Casino Bonus Builder"
Questions: 8
Odds: 3.00 per question

Prizes:
- 8/8: $5,000 Bonus Credit (2:1 = $2,500 cost) [Split]
- 7/8: $1,000 Bonus Credit (2:1 = $500 cost) [Split]
- 6/8: $250 Bonus Credit (2:1 = $125 cost) [Guaranteed]
- 5/8: $50 Bonus Credit (2:1 = $25 cost) [Guaranteed]
```

---

### 6. **Data Structure Changes**

#### Current Prize Structure:
```javascript
prizeByScore = [0, 0, 10, 20, 100, 1000, 10000];
prizeModeByScore = ['guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'split', 'split'];
```

#### Enhanced Prize Structure:
```javascript
prizeByScore = [
  {
    score: 0,
    displayValue: "No Prize",
    monetaryValue: 0,
    prizeType: "none",
    mode: "guaranteed",
    metadata: {}
  },
  // ... more scores
  {
    score: 6,
    displayValue: "100 Free Spins",
    monetaryValue: 50.00,
    prizeType: "free_spins",
    mode: "split",
    metadata: {
      quantity: 100,
      valuePerUnit: 0.50,
      spinValue: "$0.50",
      gameRestrictions: "Slots only"
    }
  }
];
```

---

### 7. **Configuration File Approach**

For easier management, create a `savedGames.js` file:

```javascript
const SAVED_GAMES = [
  {
    id: "nfl_week12_2025",
    name: "NFL Week 12 - High Stakes",
    description: "10 question NFL pick'em with mixed prizes",
    created: "2025-11-29T10:00:00Z",
    lastModified: "2025-11-29T10:00:00Z",
    config: {
      participants: 1000,
      questions: 10,
      gameTemplate: "nfl",
      rows: [...],
      prizes: [...],
      prizeModes: [...]
    },
    stats: {
      totalPrizePool: 15000,
      expectedCostPerUser: 2.50,
      jackpotOdds: "1 in 2000"
    }
  }
];
```

---

## 🎨 UI Mockup for Save/Load Feature

```
┌─────────────────────────────────────────────────────────┐
│ Quick actions                                           │
├─────────────────────────────────────────────────────────┤
│ [Add question] [Clear all] [Load example] [Export JSON] │
│ [Load CSV] [💾 Save Game] [📂 Load Game ▼]             │
│                                           ☑ Show Implied│
└─────────────────────────────────────────────────────────┘

When "Save Game" clicked:
┌─────────────────────────────────────────────────────────┐
│ Save Current Game Configuration                         │
├─────────────────────────────────────────────────────────┤
│ Game Name: [NFL Week 12 High Stakes__________________] │
│                                                         │
│ Description (optional):                                 │
│ [10 question NFL pick'em with $15k prize pool________] │
│ [________________________________________________]      │
│                                                         │
│ [Cancel]                              [💾 Save Game]   │
└─────────────────────────────────────────────────────────┘

When "Load Game ▼" clicked:
┌─────────────────────────────────────────────────────────┐
│ Saved Games (3)                                         │
├─────────────────────────────────────────────────────────┤
│ ● NFL Week 12 High Stakes                              │
│   10 questions • $15k pool • Saved Nov 29, 2025        │
│   [Load] [Delete]                                       │
│                                                         │
│ ● Pick 6 Free Spins Special                            │
│   6 questions • 500 spins • Saved Nov 28, 2025         │
│   [Load] [Delete]                                       │
│                                                         │
│ ● Champions League Predictor                           │
│   8 questions • €10k pool • Saved Nov 27, 2025         │
│   [Load] [Delete]                                       │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 Summary of Benefits

### Save/Load System:
- ✅ **Efficiency**: No need to recreate complex configurations
- ✅ **Experimentation**: Easily test variations
- ✅ **Collaboration**: Share configurations with team members
- ✅ **Version Control**: Track changes over time

### Non-Monetary Prizes:
- ✅ **Flexibility**: Support diverse prize types
- ✅ **Accurate Costing**: Calculate true cost regardless of prize format
- ✅ **User Experience**: Display prizes in user-friendly format
- ✅ **Compliance**: Track monetary value for regulatory purposes

---

## 🚀 Next Steps

1. **Review this document** and prioritize features
2. **Decide on implementation approach** (LocalStorage vs. JSON files)
3. **Define prize types** relevant to your business
4. **Create mockups** for new UI elements
5. **Implement Phase 1** features first

Would you like me to implement any of these features?
