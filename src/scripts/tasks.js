import plus from "../images/plus.svg";
import { getTaskByDate, saveTask, updateTask, deleteTask } from "../scripts/storage.js";
import { format } from "date-fns";

function loadTasks(dateStr) {
  const panel = document.querySelector(".side-panel");
  const main = document.querySelector(".main-content");
  main.innerHTML = "";

  const mainWrapper = document.createElement("div");
  mainWrapper.classList.add("tasks-wrapper");

  const heading = document.createElement("h2");
  heading.textContent = format(dateStr, 'dd') + " " + format(dateStr, 'MMMM');
  mainWrapper.appendChild(heading);

  const newTaskDiv = document.createElement("div");
  newTaskDiv.classList.add("newTask-div");

  const addIcon = document.createElement("img");
  addIcon.src = plus;

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add New Task";

  newTaskDiv.appendChild(addIcon);
  newTaskDiv.appendChild(addBtn);
  mainWrapper.appendChild(newTaskDiv);

  const taskListWrapper = document.createElement("div");
  taskListWrapper.classList.add("task-list-container");
  mainWrapper.appendChild(taskListWrapper);
  main.appendChild(mainWrapper);

  addBtn.addEventListener("click", () => {
    createPanel(dateStr);
  });

  showTasks(dateStr, taskListWrapper);
}

function createPanel(dateStr) {
  const panel = document.querySelector(".side-panel");
  panel.innerHTML = "";
  panel.classList.add("visible");

  const wrapper = document.createElement("div");

  const heading = document.createElement("h3");
  heading.textContent = "Enter Task Details";
  heading.classList.add("panel-heading");
  wrapper.appendChild(heading);

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.placeholder = "Enter Title";
  titleInput.classList.add("task-title");

  const descriptionInput = document.createElement("textarea");
  descriptionInput.rows = 5;
  descriptionInput.placeholder = "Description";
  descriptionInput.classList.add("task-description");

  wrapper.appendChild(titleInput);
  wrapper.appendChild(descriptionInput);

  const btnWrapper = document.createElement("div");
  btnWrapper.classList.add("task-btn-wrapper");

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.classList.add("delete-taskbtn");

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Add Task";
  saveBtn.classList.add("add-taskbtn");

  cancelBtn.addEventListener("click", () => {
    panel.classList.remove("visible");
    panel.innerHTML = "";
  });

  saveBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (title === "") {
      alert("Please enter a title");
      return;
    }

    saveTask(format(dateStr, "yyyy-MM-dd"), { title, description });
    panel.classList.remove("visible");
    panel.innerHTML = "";

    loadTasks(dateStr);
  });

  btnWrapper.appendChild(cancelBtn);
  btnWrapper.appendChild(saveBtn);
  wrapper.appendChild(btnWrapper);
  panel.appendChild(wrapper);
}

function showTasks(dateStr, container) {
  const panel = document.querySelector(".side-panel");
  const taskList = document.createElement("div");
  taskList.classList.add("task-list");

  const tasks = getTaskByDate(dateStr);
  if (tasks.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No tasks for this date";
    taskList.appendChild(emptyMessage);
  } else {
    tasks.forEach(task => {
      if (!task) return;

      const taskItem = document.createElement("button");
      taskItem.classList.add("task-item");
      taskItem.textContent = task.title;

      taskItem.addEventListener("click", () => {
        loadTaskDetails(dateStr, task.title, task.description);
      });

      taskList.appendChild(taskItem);
    });
  }

  container.appendChild(taskList);
}

function loadTaskDetails(dateStr, title, description) {
  const panel = document.querySelector(".side-panel");
  panel.innerHTML = "";
  panel.classList.add("visible");

  const wrapper = document.createElement("div");

  const heading = document.createElement("h3");
  heading.textContent = "Edit Task Details";
  wrapper.appendChild(heading);

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.value = title;

  const descriptionInput = document.createElement("textarea");
  descriptionInput.rows = 5;
  descriptionInput.value = description;

  wrapper.appendChild(titleInput);
  wrapper.appendChild(descriptionInput);

  const btnWrapper = document.createElement("div");
  btnWrapper.classList.add("update-task-btn-wrapper");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete Task";
  deleteBtn.classList.add("cancel-taskbtn");

  deleteBtn.addEventListener("click", () => {
    deleteTask(dateStr, title, titleInput.value, descriptionInput.value);
    panel.classList.remove("visible");
    panel.innerHTML = "";
    loadTasks(dateStr);
  });

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save Changes";
  saveBtn.classList.add("save-taskbtn");

  saveBtn.addEventListener("click", () => {
    updateTask(dateStr, title, titleInput.value, descriptionInput.value);
    panel.classList.remove("visible");
    panel.innerHTML = "";
    loadTasks(dateStr);
  });

  btnWrapper.appendChild(deleteBtn);
  btnWrapper.appendChild(saveBtn);
  wrapper.appendChild(btnWrapper);
  panel.appendChild(wrapper);
}

export default loadTasks;
