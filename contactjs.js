// Initialize variables
let users = JSON.parse(localStorage.getItem('users')) || [];
const form = document.querySelector('#myForm');
const table = document.querySelector('#myTable tbody');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const addressInput = document.querySelector('#address');
const submitBtn = document.querySelector('#submitBtn');
const updateBtn = document.querySelector('#updateBtn');
const cancelBtn = document.querySelector('#cancelBtn');

// Function to render table rows
function renderRows() {
  table.innerHTML = '';
  users.forEach((user, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>${user.address}</td>
      <td>
        <button type="button" onclick="editUser(${index})">Edit</button>
        <button type="button" onclick="deleteUser(${index})">Delete</button>
      </td>
    `;
    table.appendChild(tr);
  });
}

// Function to add user
function addUser(event) {
  event.preventDefault();
  const user = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    address: addressInput.value.trim()
  };
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  form.reset();
  renderRows();
}

// Function to edit user
function editUser(index) {
  const user = users[index];
  nameInput.value = user.name;
  emailInput.value = user.email;
  phoneInput.value = user.phone;
  addressInput.value = user.address;
  submitBtn.style.display = 'none';
  updateBtn.style.display = 'inline-block';
  cancelBtn.style.display = 'inline-block';
  updateBtn.onclick = function() {
    user.name = nameInput.value.trim();
    user.email = emailInput.value.trim();
    user.phone = phoneInput.value.trim();
    user.address = addressInput.value.trim();
    localStorage.setItem('users', JSON.stringify(users));
    form.reset();
    renderRows();
    submitBtn.style.display = 'inline-block';
    updateBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
  };
  cancelBtn.onclick = function() {
    form.reset();
    submitBtn.style.display = 'inline-block';
    updateBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
  };
}

// Function to delete user
function deleteUser(index) {
  if (confirm('Are you sure you want to delete this user?')) {
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    renderRows();
  }
}

// Add event listeners
form.addEventListener('submit', addUser);

// Render initial table rows
renderRows();
