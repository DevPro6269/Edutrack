// Select all elements with the "gender" class and store in gendo
let gendo = document.querySelectorAll(".gender");

// Select all input elements and store in inputs
let inputs = document.querySelectorAll("input");

// Select the form element and store in form
let form = document.querySelector("form");

// Initialize an empty array to store student data
let arr = [];

// Select the popup button element
const popup = document.querySelector("#popup_btn");

// Define a regular expression pattern for validating email format
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Add an event listener to handle window resizing and apply scrollbar adjustments
window.addEventListener("resize", addVerticalScrollbar);

// Student class to structure student information
class Students {
  constructor(name, contact, id, address, email, gender, classes) {
    this.name = name;
    this.contact = contact;
    this.id = id;
    this.address = address;
    this.email = email;
    this.gender = gender;
    this.class = classes;
  }
}

// Form submission event listener
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission behavior

  // Gather input values
  let name = document.querySelector("#name").value;
  let contact = document.querySelector("#Contact").value;
  let email = document.querySelector("#Email").value;
  let id = document.querySelector("#ID").value;
  let address = document.querySelector("#Address").value;
  let classes = document.querySelector("#class").value;
  let genderElement = document.querySelector("input[type=radio]:checked"); // Get selected gender radio button
  let gender = genderElement ? genderElement.value : ""; // Check if gender is selected

  // Clear previous error messages
  clearErrors();

  // Initialize validity flag
  let valid = true; 

  // Validate name input
  if (name === "") {
    valid = checker("name", "Name:", "cannot be empty") && valid;
  } else if (/\d/.test(name)) {
    valid = checker("name", "Name:", "cannot contain numbers") && valid; 
  }

  // Validate contact input
  if (contact === "") {
    valid = checker("contact", "Contact:", "cannot be empty") && valid;
  } else if (isNaN(contact) || contact.toString().length !== 10) {
    valid = checker("contact", "Contact:", "must be a valid 10-digit number") && valid;
  }

  // Validate ID input
  if (id === "") {
    valid = checker("ID", "ID:", "cannot be empty") && valid;
  } else if (isNaN(id)) {
    valid = checker("ID", "ID:", "must be a valid number") && valid;
  }

  // Validate email input
  if (email === "") {
    valid = checker("email", "Email:", "cannot be empty") && valid;
  } else if (!emailPattern.test(email)) {
    valid = checker("please", "Email:", "enter a valid email") && valid;
  }

  // Validate address input
  if (address === "") {
    valid = checker("address", "Address:", "cannot be empty") && valid;
  }

  // If all validations pass, add student
  if (valid) {
    let user = new Students(name, contact, id, address, email, gender, classes);
    let form_submit_btn = document.querySelector("#form_submit_btn");
    if (form_submit_btn.innerText != "edit") {
      adduser(user); // Add new user
    } else {
      khel(user); // Edit existing user
    }

    removercheckmarks(); // Clear validation icons
    form.reset(); // Reset form fields
    showPopup(); // Show custom popup after submission
    renderstudents(); // Render students in UI
    console.log(arr); // Log the array of students
  }
});

// Event listener for popup button click
popup.addEventListener("click", closePopup);

// Function to clear previous error messages
function clearErrors() {
  const errorMessages = document.querySelectorAll(".error");
  errorMessages.forEach((msg) => msg.remove());
}

// Function to handle field validation errors
function checker(field, innerText, msg) {
  let label = document.querySelectorAll(".loop");
  label.forEach((e) => {
    if (e.innerText === innerText) {
      // Add error message if it doesn't exist
      if (e.childElementCount === 0) {
        let err_msg = document.createElement("span");
        err_msg.innerText = `${field} ${msg}`;
        err_msg.className = "error"; // Assign class for styling
        err_msg.style.color = "red";
        e.append(err_msg);
      }
    }
  });
  return false; // Indicate validation failure
}

// Input validation feedback for each input element
inputs.forEach((e) => {
  e.addEventListener("input", function () {
    const icon = e.nextElementSibling.firstElementChild; // Get validation icon

    // Validation logic for name field
    if (e.id == "name") {
      if (e.value === "" || /\d/.test(e.value)) {
        icon.classList.remove("fa-check");
        icon.classList.add("fa-xmark");
        icon.style.color = "red";
      } else {
        icon.classList.add("fa-check");
        icon.classList.remove("fa-xmark");
        icon.style.color = "green";
      }
    }

    // Validation logic for address field
    if (e.id == "Address") {
      if (e.value === "") {
        icon.classList.remove("fa-check");
        icon.classList.add("fa-xmark");
        icon.style.color = "red";
      } else {
        icon.classList.add("fa-check");
        icon.classList.remove("fa-xmark");
        icon.style.color = "green";
      }
    }

    // Validation logic for email field
    if (e.id == "Email") {
      if (e.value === "" || !emailPattern.test(e.value)) {
        icon.classList.remove("fa-check");
        icon.classList.add("fa-xmark");
        icon.style.color = "red";
      } else {
        icon.classList.add("fa-check");
        icon.classList.remove("fa-xmark");
        icon.style.color = "green";
      }
    }

    // Validation logic for ID field
    if (e.id == "ID") {
      if (e.value === "" || isNaN(e.value)) {
        icon.classList.remove("fa-check");
        icon.classList.add("fa-xmark");
        icon.style.color = "red";
      } else {
        icon.classList.add("fa-check");
        icon.classList.remove("fa-xmark");
        icon.style.color = "green";
      }
    }

    // Validation logic for contact field
    if (e.id == "Contact") {
      if (e.value === "" || isNaN(e.value) || e.value.toString().length != 10) {
        icon.classList.remove("fa-check");
        icon.classList.add("fa-xmark");
        icon.style.color = "red";
      } else {
        icon.classList.add("fa-check");
        icon.classList.remove("fa-xmark");
        icon.style.color = "green";
      }
    }
  });
});

// Add click event listener to each gender selection element
gendo.forEach((e) => {
  e.addEventListener("click", function () {
    // Reset background and border for all gender elements
    gendo.forEach((e) => {
      e.style.backgroundColor = "";
      e.style.border = "";
    });

    // Highlight selected gender with green border and white background
    e.style.border = "2px solid green";
    e.style.backgroundColor = "white";
  });
});

// Function to remove checkmark icons from validated inputs
function removercheckmarks() {
  inputs.forEach((e) => {
    const icon = e.nextElementSibling?.firstElementChild;
    if (icon && icon.classList.contains("fa-check")) {
      icon.classList.remove("fa-check"); // Remove checkmark if it exists
      console.log("Removed checkmark from:", icon);
    } else {
      console.log("No checkmark to remove for:", e);
    }
  });
}

// Function to show the success popup and overlay
function showPopup() {
  document.getElementById("successPopup").style.display = "block";
  document.getElementById("overlay").style.display = "block"; // Display overlay
}

// Function to close the popup and hide overlay
function closePopup() {
  document.getElementById("successPopup").style.display = "none";
  document.getElementById("overlay").style.display = "none"; // Hide overlay
}

// Function to add user data to local storage
function adduser(user) {
  // Step 1: Retrieve existing data from local storage, or initialize an empty array if none
  let existingArr = JSON.parse(localStorage.getItem("myArray")) || [];

  // Step 2: Add new user data to the array
  existingArr.push(user);

  // Step 3: Store the updated array in local storage
  localStorage.setItem("myArray", JSON.stringify(existingArr));
}

// Variable to reference the table body where student data will be added
let studentlist = document.querySelector("#Studentlist");

// Function to delete a student by index
function deleteStudent(index) {
  let studentdata = JSON.parse(localStorage.getItem("myArray"));
  // Filter out the student at the specified index
  let newstudentdata = studentdata.filter((e, val) => val != index);
  localStorage.setItem("myArray", JSON.stringify(newstudentdata));
  renderstudents(); // Re-render the student list
}

// Function to render students from local storage into the student list
function renderstudents() {
  let studentdata = JSON.parse(localStorage.getItem("myArray"));
  // Clear any existing rows
  studentlist.innerHTML = "";

  // Loop through each student and create a row in the table
  for (let student of studentdata) {
    let row = document.createElement("tr");

    // Set row content with student data and action buttons
    row.innerHTML = `
    <td>${studentdata.indexOf(student) + 1}</td>
    <td>${student.name}</td>
    <td>${student.class}</td>
    <td>${student.id}</td>
    <td>${student.gender}</td>
    <td>${student.contact}</td>
    <td>${student.email}</td>
    <td>${student.address}</td>
    <td>  
      <button class="edit" onclick="editStudent(${studentdata.indexOf(student)})">Edit</button>
      <button class="delete" onclick="deleteStudent(${studentdata.indexOf(student)})">Delete</button> 
    </td>
  `;

    // Append the row to the student list
    studentlist.appendChild(row);
    addVerticalScrollbar(); // Adjust scrollbar as needed
  }
}
renderstudents(); // Initial render call

// Variable to track the index of the student being edited
let count;

// Function to enable editing of a student
function editStudent(index) {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Scroll smoothly to the top of the page
  });
  let form_submit_btn = document.querySelector("#form_submit_btn");
  form_submit_btn.innerText = "edit"; // Change button text to "edit"
  count = index; // Store the index for editing
  let studentdata = JSON.parse(localStorage.getItem("myArray"));
  let newstudentdata = studentdata.filter((e, val) => val == index);

  // Populate form fields with selected student data
  document.querySelector("#name").value = newstudentdata[0].name;
  document.querySelector("#Contact").value = newstudentdata[0].contact;
  document.querySelector("#Email").value = newstudentdata[0].email;
  document.querySelector("#ID").value = newstudentdata[0].id;
  document.querySelector("#Address").value = newstudentdata[0].address;
  document.querySelector("#class").value = newstudentdata[0].class;
}

// Function to update student information after editing
function khel(user) {
  let studentdata = JSON.parse(localStorage.getItem("myArray"));
  // Update the selected student object with new values
  studentdata[count].name = user.name;
  studentdata[count].class = user.class;
  studentdata[count].address = user.address;
  studentdata[count].email = user.email;
  studentdata[count].id = user.id;
  studentdata[count].gender = user.gender;
  studentdata[count].contact = user.contact;

  // Store updated data back in local storage
  localStorage.setItem("myArray", JSON.stringify(studentdata));
  renderstudents(); // Re-render the student list

  let form_submit_btn = document.querySelector("#form_submit_btn");
  form_submit_btn.innerText = "add"; // Change button text back to "add"
}

// Function to add a vertical scrollbar when content overflows the container
function addVerticalScrollbar() {
  const container = document.querySelector(".container");

  if (container.scrollHeight > container.clientHeight) {
    // Enable vertical scrollbar if content overflows
    container.style.overflowY = "scroll";
  } else {
    // Disable scrollbar if content fits within the container
    container.style.overflowY = "hidden";
  }
}

// Call the scrollbar function to check content size initially
addVerticalScrollbar();

