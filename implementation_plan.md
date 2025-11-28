# Implementing Game Templates

## Goal Description
The user wants to introduce a "Game Template" feature. This will be a dropdown menu that allows the user to select a predefined game structure. Selecting a template will override the current questions and odds.

## Proposed Changes

### `index.html`
- [MODIFY] Add a new `<select>` element for "Game Template" in the "Participants" card (or a new card if space is tight, but likely under "Question template").
- [MODIFY] Populate the dropdown with the requested options:
    - Pick 6
    - Coupon (10Q)
    - 8 Question Predictor Quiz
    - How many goals? (6Q)
    - How many goals? (8Q)
    - Goals, Corners, Cards (9Q)
    - NFL Pick'em

### `script.js`
- [NEW] Define a `GAME_TEMPLATES` constant containing the configuration for each template.
    - **Pick 6**: 6 questions, "What will be the correct score?", odds 8.50.
    - **Others**: Placeholder configurations (likely default question text and 2.00 odds for now, or specific if inferred). I will use generic defaults for the ones not fully specified, but ensure the *count* is correct.
- [NEW] Add event listener to the new dropdown.
- [NEW] Implement `applyGameTemplate(templateId)` function:
    - Clear existing rows.
    - Loop `n` times (based on template).
    - Add row with template's question text and odds.
    - Update `qcount` input.
    - Render rows.

## Verification Plan
- **Manual Verification**:
    - Select "Pick 6" and verify 6 rows appear with "What will be the correct score?" and 8.50 odds.
    - Select "Coupon (10Q)" and verify 10 rows appear.
    - Verify that "Apply Uniform Odds" still works after a template is loaded.
