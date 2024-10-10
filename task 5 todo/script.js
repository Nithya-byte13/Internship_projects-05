function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const timestamp = new Date().toLocaleString();

    // Create a new task item
    const taskItem = {
        text: taskText,
        completed: false,
        dateAdded: timestamp,
        dateCompleted: null,
    };

    displayTask(taskItem);
    taskInput.value = ""; // Clear input field
}

function displayTask(taskItem) {
    const pendingTasks = document.getElementById('pendingTasks');

    // Create list item
    const li = document.createElement('li');
    li.className = "task-item"; // Add a class for styling
    li.innerHTML = `
        <div class="task-details">
            <span class="task-text">${taskItem.text}</span>
            <input type="text" class="edit-input" style="display:none;" placeholder="Edit task" />
            <span class="task-date">${taskItem.dateAdded}</span>
        </div>
        <div class="task-actions">
            <button class="complete-btn" onclick="completeTask(this)">Complete</button>
            <button class="edit-btn" onclick="editTask(this)">Edit</button>
            <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
        </div>
    `;

    // Append to pending tasks
    pendingTasks.appendChild(li);
}


function completeTask(button) {
    const li = button.closest('.task-item');
    const taskText = li.querySelector('.task-text').textContent;

    // Get the date and time of completion
    const timestamp = new Date().toLocaleString();

    // Create completed task item
    const completedTaskItem = {
        text: taskText,
        completed: true,
        dateAdded: li.querySelector('.task-date').textContent,
        dateCompleted: timestamp,
    };

    // Remove from pending tasks
    li.remove();

    // Add to completed tasks
    const completedTasks = document.getElementById('completedTasks');
    const completedLi = document.createElement('li');
    completedLi.classList.add('completed', 'task-item');
    completedLi.innerHTML = `
        <div class="task-details">
            <span class="task-text">${completedTaskItem.text}</span>
            <span class="task-dates">Added: ${completedTaskItem.dateAdded}, Completed: ${completedTaskItem.dateCompleted}</span>
        </div>
        <div class="task-actions">
            <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
        </div>
    `;
    
    completedTasks.appendChild(completedLi);
}

function editTask(button) {
    const li = button.closest('.task-item');
    const taskTextSpan = li.querySelector('.task-text');
    const editInput = li.querySelector('.edit-input');

    if (editInput.style.display === "none") {
        // Show edit input and hide the task text
        editInput.value = taskTextSpan.textContent;
        taskTextSpan.style.display = "none";
        editInput.style.display = "inline";
        button.textContent = "Save"; // Change button to Save
    } else {
        // Save the edited task
        taskTextSpan.textContent = editInput.value;
        taskTextSpan.style.display = "inline";
        editInput.style.display = "none";
        button.textContent = "Edit"; // Change button back to Edit
    }
}


function deleteTask(button) {
    const li = button.closest('.task-item');
    li.remove();
}
