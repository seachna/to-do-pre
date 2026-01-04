const initialItems = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

let items = [];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    return JSON.parse(savedTasks);
  }
  return initialItems;
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromDOM() {
  const itemsNamesElements = listElement.querySelectorAll(".to-do__item-text");
  const tasks = [];
  itemsNamesElements.forEach(function (element) {
    tasks.push(element.textContent);
  });
  return tasks;
}

function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);

  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = item;

  deleteButton.addEventListener("click", function () {
    clone.remove();
    const updatedItems = getTasksFromDOM();
    saveTasks(updatedItems);
  });

  duplicateButton.addEventListener("click", function () {
    const itemName = textElement.textContent;
    const newItem = createItem(itemName);
    listElement.prepend(newItem);
    const updatedItems = getTasksFromDOM();
    saveTasks(updatedItems);
  });

  editButton.addEventListener("click", function () {
    textElement.setAttribute("contenteditable", "true");
    textElement.focus();
  });

  textElement.addEventListener("blur", function () {
    textElement.setAttribute("contenteditable", "false");
    const updatedItems = getTasksFromDOM();
    saveTasks(updatedItems);
  });

  return clone;
}

items = loadTasks();

items.forEach(function (item) {
  const taskElement = createItem(item);
  listElement.append(taskElement);
});

formElement.addEventListener("submit", function (event) {
  event.preventDefault();

  const newTask = inputElement.value.trim();
  if (!newTask) {
    inputElement.value = "";
    return;
  }

  const taskElement = createItem(newTask);
  listElement.prepend(taskElement);

  items = getTasksFromDOM();
  saveTasks(items);

  inputElement.value = "";
});
