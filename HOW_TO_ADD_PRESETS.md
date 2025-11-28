# How to Add More Paytable Presets

## ✅ What I've Done

I've moved all your preset configurations to a **separate file** called `presets.js` to keep them organized and easy to manage. This file now contains:

1. **7 Paytable Presets** (3 original + 4 new examples)
2. **Uniform Odds Presets** (for the "Apply Uniform Odds" dropdown)
3. **Game Templates** (for the "Game Template" dropdown)

## 📁 File Structure

```
prizing-simulator-1/
├── index.html          ← Loads presets.js
├── config.js           ← UI text configuration
├── presets.js          ← ⭐ ALL PRESETS ARE HERE
├── script.js           ← Main logic (no longer has presets)
└── ...
```

## 🎯 Current Presets Available

Your tool now has **7 presets** in the dropdown:

1. **Pick6 • 8.50** - Classic Pick 6 format
2. **Pick6 • 8.50 (Split Top 2)** - Pick 6 with split top prizes
3. **NFL 10Q • 1.92 (Split Top 2)** - NFL format
4. **Quiz 8 • 3.00 (Medium Difficulty)** - 8-question quiz
5. **Soccer 5 • 2.50 (Easy)** - Easy 5-question game
6. **High Stakes Pick 6 • 10.00** - Hard difficulty, big prizes
7. **Budget Friendly 10Q • 2.00** - Low cost, high engagement

## 📝 How to Add More Presets

### Step 1: Open `presets.js`

### Step 2: Copy This Template

```javascript
{
  id: 'your_preset_id',              // Unique ID (no spaces, lowercase)
  label: 'Display Name • X.XX',      // What shows in dropdown
  questions: 8,                       // Number of questions
  oddsPerQuestion: 3.00,             // Uniform odds for all questions
  prizes: [0, 0, 0, 5, 10, 50, 250, 1000, 5000],  // Prize for each score (0/N to N/N)
  note: 'Optional description',       // Shows in preview
  prizeModes: ['guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'split', 'split', 'split']
}
```

### Step 3: Customize Your Values

**Example: Creating a "Premier League 7Q" preset**

```javascript
{
  id: 'premier_league_7q',
  label: 'Premier League 7Q • 2.80',
  questions: 7,
  oddsPerQuestion: 2.80,
  prizes: [0, 0, 0, 10, 50, 200, 1000, 5000],
  note: '7/7 $5,000; 6/7 $1,000; 5/7 $200 (Split top 2)',
  prizeModes: ['guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'split', 'split']
}
```

### Step 4: Add It to the PRESETS Array

Open `presets.js` and add your preset **before the closing `]`**:

```javascript
const PRESETS = [
  {
    id: 'pick6_850',
    // ... existing presets ...
  },
  {
    id: 'budget_friendly_10q',
    // ... last existing preset ...
  },
  
  // ADD YOUR NEW PRESET HERE:
  {
    id: 'premier_league_7q',
    label: 'Premier League 7Q • 2.80',
    questions: 7,
    oddsPerQuestion: 2.80,
    prizes: [0, 0, 0, 10, 50, 200, 1000, 5000],
    note: '7/7 $5,000; 6/7 $1,000; 5/7 $200 (Split top 2)',
    prizeModes: ['guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'split', 'split']
  }
];
```

### Step 5: Save and Refresh

Save `presets.js` and refresh your browser. Your new preset will appear in the dropdown!

## 🔑 Important Rules

### Rule 1: Array Lengths Must Match

```javascript
questions: 7
prizes: [0, 0, 0, 10, 50, 200, 1000, 5000]  // Must have 8 values (7 + 1)
prizeModes: ['guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'split', 'split']  // Must have 8 values
```

**Formula:** `prizes.length = questions + 1`

### Rule 2: Prize Order

- `prizes[0]` = Prize for 0 correct answers
- `prizes[1]` = Prize for 1 correct answer
- ...
- `prizes[N]` = Prize for perfect score (all correct)

**Example for 5 questions:**
```javascript
prizes: [0, 0, 5, 25, 100, 500]
//       0  1  2  3   4    5  ← score
```

### Rule 3: Payout Modes

You have 3 options for `prizeModes`:

**Option A: All Split (Cost-Controlled)**
```javascript
prizeModes: null
```

**Option B: Custom Mix**
```javascript
prizeModes: ['guaranteed', 'guaranteed', 'guaranteed', 'split', 'split', 'split']
```

**Option C: All Guaranteed (Player-Friendly)**
```javascript
prizeModes: ['guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed']
```

## 💡 Common Patterns

### Pattern 1: Split Top 2 (Most Common)

```javascript
// For 6 questions:
prizeModes: ['guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'split', 'split']
//           0/6          1/6          2/6          3/6          4/6          5/6    6/6

// For 10 questions:
prizeModes: ['guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'split', 'split']
```

### Pattern 2: Split Top 3

```javascript
// For 8 questions:
prizeModes: ['guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'split', 'split', 'split']
//           0/8          1/8          2/8          3/8          4/8          5/8          6/8    7/8    8/8
```

### Pattern 3: Split Top Score Only

```javascript
// For 6 questions:
prizeModes: ['guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'split']
//           0/6          1/6          2/6          3/6          4/6          5/6          6/6
```

## 🎨 Preset Design Tips

### Tip 1: Name Your Presets Clearly

Good names include:
- Game type (Pick 6, NFL, Quiz)
- Odds value (8.50, 1.92)
- Special features (Split Top 2, Easy, High Stakes)

**Examples:**
- ✅ `'NFL 10Q • 1.92 (Split Top 2)'`
- ✅ `'Quiz 8 • 3.00 (Medium Difficulty)'`
- ❌ `'Preset 1'`
- ❌ `'My Game'`

### Tip 2: Use Consistent Prize Scaling

Prizes should generally increase with score:

```javascript
// Good - prizes increase
prizes: [0, 0, 10, 50, 250, 1000, 5000]

// Bad - prizes decrease
prizes: [0, 0, 1000, 500, 100, 50, 10]
```

### Tip 3: Balance Cost vs Engagement

- **High engagement:** More guaranteed prizes at lower scores
- **Low cost:** More split prizes, especially at top scores
- **Hybrid:** Split top 2-3, guaranteed for the rest

## 🚀 Quick Examples to Copy

### Easy Game (High Win Rate)
```javascript
{
  id: 'easy_5q',
  label: 'Easy 5Q • 2.00 (50% odds)',
  questions: 5,
  oddsPerQuestion: 2.00,
  prizes: [0, 1, 5, 25, 100, 500],
  note: 'High engagement, many winners',
  prizeModes: ['guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'split', 'split']
}
```

### Medium Game (Balanced)
```javascript
{
  id: 'medium_8q',
  label: 'Medium 8Q • 4.00 (25% odds)',
  questions: 8,
  oddsPerQuestion: 4.00,
  prizes: [0, 0, 0, 5, 10, 50, 250, 1000, 5000],
  note: 'Balanced difficulty and cost',
  prizeModes: ['guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'split', 'split', 'split']
}
```

### Hard Game (Low Win Rate)
```javascript
{
  id: 'hard_10q',
  label: 'Hard 10Q • 8.00 (12.5% odds)',
  questions: 10,
  oddsPerQuestion: 8.00,
  prizes: [0, 0, 0, 0, 0, 0, 0, 50, 500, 5000, 50000],
  note: 'High stakes, few winners',
  prizeModes: ['guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'guaranteed', 'split', 'split', 'split']
}
```

## ❓ Troubleshooting

**Problem:** Preset doesn't appear in dropdown
- ✅ Check you saved `presets.js`
- ✅ Refresh your browser (Ctrl+F5)
- ✅ Check browser console for JavaScript errors

**Problem:** "Preset prize vector ≠ N+1" warning
- ✅ Make sure `prizes.length = questions + 1`
- ✅ Example: 6 questions needs 7 prize values (0/6 through 6/6)

**Problem:** Preset applies wrong payout modes
- ✅ Check `prizeModes.length = prizes.length`
- ✅ Use `null` for all split, or provide exact array

## 📚 Summary

1. **All presets are in `presets.js`** - one place to manage everything
2. **Copy an existing preset** and modify it
3. **Remember:** `prizes.length = questions + 1`
4. **prizeModes:** Use `null` for all split, or custom array
5. **Save and refresh** to see your changes

---

**Need help?** Check the examples in `presets.js` - I've added 4 new ones showing different patterns!
