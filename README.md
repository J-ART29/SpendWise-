# SpendWise - JavaScript Foundation

## Project Description

SpendWise is a beginner-friendly budget tracking application. Its main
**Start Budgeting** action asks for a monthly budget and total expenses, checks
the input, calculates the remaining balance, and prints a labeled summary in
the browser console. The page also includes an interactive budget calculator
and an optional detailed expense tracker.

## JavaScript Concepts Implemented

- Variables and constants
- Numbers, strings, arrays, and objects
- User input with `prompt()`
- Type conversion with `Number()`
- Conditional statements and a `while` loop for input validation
- Functions with parameters and return values
- Arithmetic calculations and percentage calculations
- DOM updates and button/form event listeners
- Console output using `console.log()` and `console.table()`
- Input validation for empty, invalid, and negative amounts

## How Variables Are Used

The `budget`, `expenses`, and `remainingBalance` variables store the values
entered in the prompt-based budget flow and its calculated result.
`appName` stores the application name. The detailed tracker keeps expenses in
an array of objects, with each object containing a name, amount, category, and
date.

## How User Input Is Collected

Click **Start Budgeting** to enter a monthly budget and total expenses through
browser prompts. `getValidAmount()` converts each answer to a number and
re-prompts if the answer is empty, invalid, or negative. Choosing **Cancel**
stops the current calculation.

The **Try a budget calculation** section accepts two amounts in page fields.
The **Track individual expenses** option opens a form for a budget and
categorized, dated expenses. These additional options provide a visible
calculation and a detailed expense table.

## How Calculations Are Performed

The remaining balance is calculated using:

```text
Remaining Balance = Budget - Expenses
```

The calculator also calculates the percentage of the budget spent:

```text
Spending Percentage = (Expenses / Budget) * 100
```

A zero budget produces a spending percentage of 0% to avoid division by zero.
Expenses may exceed the budget, in which case the remaining balance is
negative and the calculator reports that spending is over budget.

## How Functions Organize the Code

- `getValidAmount()` prompts for an amount and rejects invalid or negative input.
- `calculateBalance()` returns the budget remaining after expenses.
- `displayResults()` prints the prompt-based budget summary and updates the page.
- `calculateQuickBudget()` validates and calculates values entered in the
  on-page calculator.
- `addExpenseField()` creates a detailed expense entry.
- `showBudgetSummary()` calculates totals and renders the result summary/table.

Event listeners connect the page buttons and forms to these functions.

## Technologies Used

- HTML5
- CSS3
- JavaScript

## How to Run the Project

1. Open `index.html` in a web browser, or run the folder with VS Code Live Server.
2. Click **Start Budgeting** and enter a budget and expenses to test the prompt
   flow. Open Developer Tools and select the Console tab to see its report.
3. Use **Try a budget calculation** to test normal, equal-budget, overspending,
   zero-budget, and invalid-input cases directly on the page.
4. Use **Track individual expenses** to edit the sample expenses or add your
   own, then select **Calculate budget** to see the detailed summary.

## Project Files

- `index.html` - Page structure, calculator, and expense tracker
- `style.css` - Responsive page and form styling
- `script.js` - Input handling, validation, calculations, and page updates
- `README.md` - Project documentation