const form = document.getElementById("transaction-form");
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const list = document.getElementById("transaction-list");

let transactions = [];

function updateStats() {
  let income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  let expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);
  let balance = income - expenses;

  document.getElementById("income").textContent = `₹${income.toFixed(2)}`;
  document.getElementById("expenses").textContent = `₹${expenses.toFixed(2)}`;
  document.getElementById("balance").textContent = `₹${balance.toFixed(2)}`;
}

function renderTransactions() {
  list.innerHTML = "";
  transactions.forEach((t, index) => {
    const div = document.createElement("div");
    div.classList.add("transaction");
    div.innerHTML = `
      <span>${t.desc} (${t.category})</span>
      <span style="color:${
        t.type === "income" ? "#00ffc6" : "#ff5c5c"
      };">${t.type === "income" ? "+" : "-"} ₹${t.amount.toFixed(2)}</span>
      <button class="remove-btn" onclick="removeTransaction(${index})">Remove</button>
    `;
    list.appendChild(div);
  });
}

function removeTransaction(index) {
  transactions.splice(index, 1);
  renderTransactions();
  updateStats();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const transaction = {
    desc: descInput.value,
    amount: parseFloat(amountInput.value),
    type: typeInput.value,
    category: document.getElementById("category").value,
  };
  transactions.push(transaction);
  renderTransactions();
  updateStats();
  form.reset();
});
