// start here 
let entries = [];
let totalIncome = 0;
let totalExpenses = 0;

// Add Entry
function addEntry() {
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;
  const date = document.getElementById('date').value;

  if (!description) {
    alert('Please fill in valid description.');
    return;
  }
  if (!amount || amount <=0) {
    alert('Please fill in valid amount.');
    return;
  }
  if (!date) {
    alert('Please fill the date.');
    return;
  }

  // Add entry to the list
  const entry = {
    id: Date.now(),
    description,
    amount,
    type,
    date,
  };

  entries.push(entry);

  // Update Total Values
  if (type === 'income') {
    totalIncome += amount;
  } else {
    totalExpenses += amount;
  }

  // Reset form
  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';
  document.getElementById(`date`).value = '';

  renderEntries();
  updateOverview();
}

// Render Entries in the Table
function renderEntries() {
  const tableBody = document.querySelector('#entries-table tbody');
  tableBody.innerHTML = '';

  entries.forEach(entry => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.date}</td>
      <td>${entry.description}</td>
      <td>${entry.amount}</td>
      <td>${entry.type}</td>
      <td class="actions">
        <button class="edit-btn" onclick="editEntry(${entry.id})">Edit</button>
        <button class="delete-btn" onclick="deleteEntry(${entry.id})">Delete</button>
      </td>

    `;
    tableBody.appendChild(row);
  });
}

// Edit Entry
function editEntry(id) {
  const entry = entries.find(e => e.id === id);
  document.getElementById('date').value = entry.date;
  document.getElementById('description').value = entry.description;
  document.getElementById('amount').value = entry.amount;
  document.getElementById('type').value = entry.type;

  // Remove the entry temporarily to update later
  deleteEntry(id);
}

// Delete Entry
function deleteEntry(id) {
  const entry = entries.find(e => e.id === id);
  if (entry.type === 'income') {
    totalIncome -= entry.amount;
  } else {
    totalExpenses -= entry.amount;
  }

  // Remove entry from the array
  entries = entries.filter(e => e.id !== id);

  renderEntries();
  updateOverview();
}

// Update Overview
function updateOverview() {
  document.getElementById('total-income').textContent = totalIncome.toFixed(2);
  document.getElementById('total-expenses').textContent = totalExpenses.toFixed(2);
  document.getElementById('net-balance').textContent = (totalIncome - totalExpenses).toFixed(2);
}
