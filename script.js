const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

let tasks = [];
let editingIndex = -1;

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task}</span>
      <div class="task-actions">
        <button onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function addOrSaveTask() {
  const value = taskInput.value.trim();

  if (!value) {
    alert('Task cannot be empty.');
    return;
  }

  const duplicate = tasks.some((task, i) => task.toLowerCase() === value.toLowerCase() && i !== editingIndex);
  if (duplicate) {
    alert('Task already exists.');
    return;
  }

  if (editingIndex > -1) {
    tasks[editingIndex] = value;
    addBtn.textContent = 'Add';
    editingIndex = -1;
  } else {
    tasks.push(value);
  }

  taskInput.value = '';
  renderTasks();
}

function editTask(index) {
  taskInput.value = tasks[index];
  editingIndex = index;
  addBtn.textContent = 'Save';
}

function deleteTask(index) {
  const confirmDelete = confirm('Are you sure want to delete the task?');
  if (confirmDelete) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

addBtn.addEventListener('click', addOrSaveTask);
