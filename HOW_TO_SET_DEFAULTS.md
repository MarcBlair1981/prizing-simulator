# How to Set Default Game Template and Paytable Preset

## Quick Setup

Open `config.js` and edit lines 8 and 13:

```javascript
defaultGameTemplate: 'nfl',      // Change this to your preferred default
defaultPaytablePreset: 'pick_em', // Change this to your preferred default
```

## Available Options

### Game Templates (defaultGameTemplate)
Use the ID from the list below:

- `'pick6'` - Pick 6 (6 questions, 8.5 odds)
- `'coupon10'` - Coupon (10 questions, 1.8 odds)
- `'quiz8'` - 8 Question Predictor Quiz (8 questions, 4.8 odds)
- `'goals6'` - How many goals? (6 questions, 4.0 odds)
- `'goals8'` - How many goals? (8 questions, 2.0 odds)
- `'gcc9'` - Goals, Corners, Cards (9 questions, 4.0 odds)
- `'nfl'` - NFL Pick'em (10 questions, 1.92 odds)
- `null` - No default template (blank start)

### Paytable Presets (defaultPaytablePreset)
Use the ID from the list below:

- `'pick6_850'` - Pick6 • 8.50 (all guaranteed)
- `'pick6_split_top'` - Pick6 • 8.50 (Split Top 2)
- `'pick_em'` - NFL 10Q • 1.92 (Split Top 3)
- `'quiz8_medium'` - Quiz 8 • 3.00 (Medium Difficulty)
- `'soccer5_easy'` - Soccer 5 • 2.50 (Easy)
- `'highstakes_pick6'` - High Stakes Pick 6 • 10.00
- `'budget_friendly_10q'` - Budget Friendly 10Q • 2.00
- `null` - Use fallback default

## Current Settings

**Default Game Template:** NFL Pick'em (10 questions)
**Default Paytable Preset:** NFL 10Q • 1.92 (Split Top 3)

## How It Works

When a user visits the app for the **first time**:
1. The app loads the specified Game Template (creates questions with the template text and odds)
2. The app loads the specified Paytable Preset (sets up the prize structure)
3. The user sees a fully configured game ready to use

**Note:** This only applies on first visit. If the user has visited before, their previous state is preserved.

## To Reset and Test

To see the defaults again:
1. Open browser DevTools (F12)
2. Go to Application > Local Storage
3. Delete the `__f2p_init__` key
4. Refresh the page

Or use Incognito/Private browsing mode.
