const toggleBtn = document.getElementById("toggleBtn");
let currentTheme = localStorage.getItem("theme") || "light";
document.body.classList.add(currentTheme);

// ✅ Set toggle button position based on current theme
if (currentTheme === "dark") {
  toggleBtn.checked = true;
}

toggleBtn.addEventListener("change", function () {
  if (toggleBtn.checked) {
    document.body.classList.replace("light", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.replace("dark", "light");
    localStorage.setItem("theme", "light");
  }
});


// ✅ To-do functionality
let input = document.getElementById("input");
let button = document.getElementById("button");
let taskList = document.getElementById("task-list");

// 🔹 Get saved tasks from localStorage
let saved = localStorage.getItem("tasks");
let taskArray = saved ? JSON.parse(saved) : [];

// 🔹 Function to show a task on screen
function displayTask(task) {
 let taskItem = document.createElement("p");

let taskText = document.createElement("span");
taskText.innerText = task;
taskText.classList.add("task-text");
taskItem.appendChild(taskText);


  // ❌ Delete button
  let delBtn = document.createElement("button");
  delBtn.innerText = "delete task";
  delBtn.style.marginLeft = "10px";
 

  // ✏️ Edit button
  let editBtn = document.createElement("button");
  editBtn.innerText = "edit task";
  editBtn.style.marginLeft = "10px";
  

  // Delete logic
  delBtn.addEventListener("click", function () {
    taskItem.remove();
    taskArray = taskArray.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(taskArray));
  });

  // Edit logic
  editBtn.addEventListener("click", function () {
    let updatedTask = prompt("Edit your task:", task);

    if (updatedTask && updatedTask.trim() !== "") {
      // Replace old task with new one in array
      let index = taskArray.indexOf(task);
      if (index !== -1) {
        taskArray[index] = updatedTask;
        localStorage.setItem("tasks", JSON.stringify(taskArray));

        // Update UI
        taskItem.innerText = updatedTask;

        // Re-attach buttons after innerText reset
        taskItem.appendChild(editBtn);
        taskItem.appendChild(delBtn);
      }
    }
  });

  // Attach buttons
  taskItem.appendChild(editBtn);
  taskItem.appendChild(delBtn);

  // Add task to list
  taskList.prepend(taskItem);
}

// 🔹 Show all saved tasks on load
taskArray.forEach(displayTask);

// 🔹 Add new task on click
button.addEventListener("click", function () {
  let task = input.value.trim();
  if (task === "") {
    alert("Please enter a task.");
    return;
  }

  // 1. Show on screen
  displayTask(task);

  // 2. Save to array & localStorage
  taskArray.push(task);
  localStorage.setItem("tasks", JSON.stringify(taskArray));

  input.value = "";
});
