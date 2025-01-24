// Hardcoded credentials for simplicity
const correctUsername = "user123";
const correctPassword = "password123";
 
// Selectors
const loginScreen = document.getElementById("login-screen");
const mainPage = document.getElementById("main-page");
const dashboardContent = document.getElementById("dashboard-content");
const dashboardHeader = document.getElementById("dashboard-header");
const errorMessage = document.getElementById("error-message");
const remindersContainer = document.getElementById("reminders-container"); 
const addReminderButton = document.querySelector(".quick-add-btn"); 

// Modal elements
const modal = document.createElement("div");
modal.classList.add("modal");
modal.innerHTML = `
  <div class="modal-content">
    <h2>Add Reminder</h2>
    <input type="text" id="reminder-input" placeholder="Enter your reminder">
    <div class="modal-buttons">
      <button id="save-reminder-btn">Save</button>
      <button id="close-modal-btn">Cancel</button>
    </div>
  </div>
`;
document.body.appendChild(modal);

const reminderInput = modal.querySelector("#reminder-input");
const saveReminderBtn = modal.querySelector("#save-reminder-btn");
const closeModalBtn = modal.querySelector("#close-modal-btn");

// Ensure the main page is hidden on load
document.addEventListener("DOMContentLoaded", function () {
  mainPage.style.display = "none";

  // Handle login form submission
  document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Show the main page after successful login
    if (username === correctUsername && password === correctPassword) {
      loginScreen.style.display = "none"; 
      mainPage.style.display = "block"; 
      document.body.classList.remove("lock-scroll"); 
    } else {
      errorMessage.style.display = "block"; 
      errorMessage.textContent = "Invalid login details. Please try again.";
    }
  });
});

// Function to open the modal
function openModal() {
  modal.style.display = "block";
  reminderInput.value = ""; 
  document.body.classList.add("lock-scroll"); 
}

// Function to close the modal
function closeModal() {
  modal.style.display = "none";
  document.body.classList.remove("lock-scroll"); 
}

// Add reminder button click event
addReminderButton.addEventListener("click", openModal);

// Save reminder button click event
saveReminderBtn.addEventListener("click", () => {
  const reminderText = reminderInput.value.trim();

  if (reminderText) {
    // Save to localStorage
    const reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    reminders.push(reminderText);
    localStorage.setItem("reminders", JSON.stringify(reminders));

    // Update the UI dynamically
    const reminderItem = document.createElement("div");
    reminderItem.textContent = reminderText;
    reminderItem.style.padding = "10px";
    reminderItem.style.marginBottom = "5px";
    reminderItem.style.backgroundColor = "#f9f9f9"; 
    reminderItem.style.borderRadius = "4px"; 
    reminderItem.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";

    remindersContainer.appendChild(reminderItem);

    // Close the modal
    closeModal();
  }
});

// Close modal button click event
closeModalBtn.addEventListener("click", closeModal);

// Close modal on outside click
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});