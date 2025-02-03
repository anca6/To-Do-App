let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

// Event listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation(); // Calling form validation before adding a task
});

// Function to validate the form inputs
let formValidation = () => {
  if (textInput.value === "") {
    msg.innerHTML = "Task cannot be blank"; // Displaying an error message if input is empty
  } else {
    msg.innerHTML = ""; // Clearing the error message if input is valid
    acceptData(); // Calling function to store the task data
    add.setAttribute("data-bs-dismiss", "modal"); // Closing the modal when the submission is successful
    add.click(); // Simulating a button click to close the modal

    // Invoked function to prevent issues with multiple submissions
    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

// Array to store task data
let data = [{}];

// Function to accept and store task data
let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data)); // Storing task data in localStorage
  console.log(data);
  createTasks(); // Calling function to display the tasks
};

// Function to create and display tasks dynamically
let createTasks = () => {
  tasks.innerHTML = ""; // Clearing the task list before creating new tasks
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.text}</span> <!-- Task title -->
          <span class="small text-secondary">${x.date}</span> <!-- Task due date -->
          <p>${x.description}</p> <!-- Task description -->
  
          <span class="options">
            <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
  });

  resetForm(); // Calling function to reset the form inputs
};

// Function to delete a task
let deleteTask = (e) => {
  e.parentElement.parentElement.remove(); // Removing the task from the UI
  data.splice(e.parentElement.parentElement.id, 1); // Removing the task from the data array
  localStorage.setItem("data", JSON.stringify(data)); // Updating localStorage after being deleted
  console.log(data);
};

// Function to edit a task
let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement; // Getting the selected task

  // Filling the form fields with the selected data
  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(e); // Deleting the task so it can be updated
};

// Function to reset the form fields
let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

// Immediately Invoked Function Expression (IIFE) to load stored tasks from localStorage on page load
(() => {
  data = JSON.parse(localStorage.getItem("data")) || []; // Retrieving stored tasks / initializing a new empty array
  console.log(data);
  createTasks(); // Calling function to render tasks on page load
})();
