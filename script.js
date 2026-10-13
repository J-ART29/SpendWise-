const appName = "SpendWise";
let budget = 0;
let expenses = 0;
let remainingBalance = 0;

const currencyFormatter = new Intl.NumberFormat("en-KE", {
    maximumFractionDigits: 2
});

const startButton = document.getElementById("start-budget");
const budgetForm = document.getElementById("budget-form");
const expenseFields = document.getElementById("expense-fields");
const formMessage = document.getElementById("form-message");
const quickCalculatorForm = document.getElementById("quick-calculator-form");
const quickCalculatorMessage = document.getElementById("calculator-message");
const sampleExpenses = [
    { name: "Lunch", amount: 350, category: "Food", date: "2026-10-01" },
    { name: "Bus fare", amount: 100, category: "Transport", date: "2026-10-02" },
    { name: "House rent", amount: 12000, category: "Rent", date: "2026-10-03" },
    { name: "Movie ticket", amount: 800, category: "Entertainment", date: "2026-10-04" },
    { name: "Shopping", amount: 1500, category: "Other", date: "2026-10-05" }
];
const categories = ["Food", "Transport", "Rent", "Entertainment", "Other"];

function formatMoney(amount) {
    return `KSh ${currencyFormatter.format(amount)}`;
}

function getValidAmount(message) {
    while (true) {
        const input = window.prompt(message);

        if (input === null) {
            return null;
        }

        const amount = Number(input.trim());
        if (input.trim() !== "" && Number.isFinite(amount) && amount >= 0) {
            return amount;
        }

        window.alert("Please enter a valid, non-negative amount.");
    }
}

function calculateBalance(budgetAmount, expenseAmount) {
    return budgetAmount - expenseAmount;
}

function calculateQuickBudget(event) {
    event.preventDefault();
    quickCalculatorMessage.textContent = "";

    const budgetInput = document.getElementById("quick-budget").value.trim();
    const expensesInput = document.getElementById("quick-expenses").value.trim();
    const calculatorBudget = Number(budgetInput);
    const calculatorExpenses = Number(expensesInput);

    if (
        budgetInput === "" ||
        expensesInput === "" ||
        !Number.isFinite(calculatorBudget) ||
        !Number.isFinite(calculatorExpenses) ||
        calculatorBudget < 0 ||
        calculatorExpenses < 0
    ) {
        quickCalculatorMessage.textContent = "Enter valid, non-negative amounts in both fields.";
        return;
    }

    const balance = calculateBalance(calculatorBudget, calculatorExpenses);
    const percentage = calculatorBudget === 0
        ? 0
        : calculatorExpenses / calculatorBudget * 100;

    document.getElementById("quick-balance").textContent =
        `${currencyFormatter.format(balance)} KES`;
    document.getElementById("quick-percentage").textContent =
        `${percentage.toFixed(2)}%`;

    const status = document.getElementById("quick-status");
    status.textContent = balance < 0 ? "Over budget." : "Within budget.";
    status.classList.toggle("over-budget", balance < 0);
}

function displayResults() {
    console.log("===== " + appName + " Budget Summary =====");
    console.log("Total Budget: KSh " + budget);
    console.log("Total Expenses: KSh " + expenses);
    console.log("Remaining Balance: KSh " + remainingBalance);

    showBudgetSummary(budget, [{
        name: "Total expenses",
        amount: expenses,
        category: "N/A",
        date: "N/A"
    }], false);
}

function addExpenseField(expense = {}) {
    const entry = document.createElement("div");
    entry.className = "expense-entry";
    entry.innerHTML = `
        <label>
            Expense name
            <input name="expense-name" type="text" placeholder="Lunch">
        </label>
        <label>
            Amount (KSh)
            <input name="expense-amount" type="number" min="0" step="0.01" placeholder="350">
        </label>
        <label>
            Category
            <select name="expense-category">
                ${categories.map((category) => `<option value="${category}">${category}</option>`).join("")}
            </select>
        </label>
        <label>
            Date
            <input name="expense-date" type="date">
        </label>
        <button class="remove-expense" type="button" aria-label="Remove expense">Remove</button>
    `;
    entry.querySelector('input[name="expense-name"]').value = expense.name || "";
    entry.querySelector('input[name="expense-amount"]').value =
        expense.amount === undefined ? "" : expense.amount;
    entry.querySelector('select[name="expense-category"]').value = expense.category || "Other";
    entry.querySelector('input[name="expense-date"]').value = expense.date || "";
    expenseFields.append(entry);
    entry.querySelector(".remove-expense").addEventListener("click", () => entry.remove());

    if (!expense.name) {
        entry.querySelector('input[name="expense-name"]').focus();
    }
}

function showBudgetSummary(budgetAmount, expenseItems, logResults = true) {
    const totalExpenses = expenseItems.reduce((total, expense) => total + expense.amount, 0);
    const remaining = calculateBalance(budgetAmount, totalExpenses);

    document.getElementById("monthly-budget").textContent = formatMoney(budgetAmount);
    document.getElementById("total-expenses").textContent = formatMoney(totalExpenses);
    document.getElementById("remaining-balance").textContent = formatMoney(remaining);

    const expenseList = document.getElementById("expense-list");
    expenseList.replaceChildren();

    if (expenseItems.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 4;
        cell.textContent = "No expenses entered.";
        row.append(cell);
        expenseList.append(row);
    } else {
        for (const expense of expenseItems) {
            const row = document.createElement("tr");
            for (const value of [
                expense.name,
                formatMoney(expense.amount),
                expense.category,
                expense.date
            ]) {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.append(cell);
            }
            expenseList.append(row);
        }
    }

    document.getElementById("budget-summary").hidden = false;

    if (logResults) {
        console.log("Monthly budget:", formatMoney(budgetAmount));
        console.table(expenseItems.map(({ name, amount, category, date }) => ({
            Expense: name,
            Amount: formatMoney(amount),
            Category: category,
            Date: date
        })));
        console.log("Total expenses:", formatMoney(totalExpenses));
        console.log("Remaining balance:", formatMoney(remaining));
    }
}

quickCalculatorForm.addEventListener("submit", calculateQuickBudget);

startButton.addEventListener("click", () => {
    const enteredBudget = getValidAmount("Enter your total budget in KSh:");
    if (enteredBudget === null) {
        return;
    }

    const enteredExpenses = getValidAmount("Enter your total expenses in KSh:");
    if (enteredExpenses === null) {
        return;
    }

    budget = enteredBudget;
    expenses = enteredExpenses;
    remainingBalance = calculateBalance(budget, expenses);
    displayResults();
});

document.getElementById("track-expenses").addEventListener("click", () => {
    budgetForm.hidden = false;
    if (expenseFields.children.length === 0) {
        sampleExpenses.forEach((expense) => addExpenseField(expense));
    }
    document.getElementById("budget-input").focus();
});

document.getElementById("add-expense").addEventListener("click", () => addExpenseField());

budgetForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent = "";

    const detailedBudget = Number(document.getElementById("budget-input").value);
    if (!Number.isFinite(detailedBudget) || detailedBudget <= 0) {
        formMessage.textContent = "Enter a monthly budget greater than zero.";
        return;
    }

    const names = expenseFields.querySelectorAll('input[name="expense-name"]');
    const amounts = expenseFields.querySelectorAll('input[name="expense-amount"]');
    const expenseCategories = expenseFields.querySelectorAll('select[name="expense-category"]');
    const dates = expenseFields.querySelectorAll('input[name="expense-date"]');
    const detailedExpenses = [];

    for (let index = 0; index < names.length; index += 1) {
        const name = names[index].value.trim();
        const rawAmount = amounts[index].value;
        const category = expenseCategories[index].value;
        const date = dates[index].value;

        if (name === "" && rawAmount === "" && date === "") {
            continue;
        }

        const amount = Number(rawAmount);
        if (name === "" || rawAmount === "" || date === "" || !Number.isFinite(amount) || amount < 0) {
            formMessage.textContent = "Complete the expense name, amount, category, and date, or remove the blank row.";
            return;
        }

        detailedExpenses.push({ name, amount, category, date });
    }

    showBudgetSummary(detailedBudget, detailedExpenses);
});