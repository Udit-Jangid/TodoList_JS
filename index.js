let todoListElements = document.querySelector(".todo_list_elem");
let textAdd = document.querySelector(".text_add");
let btnAdd = document.querySelector(".btn_add");
let progressCount = document.querySelector(".progress_count");
let progressBar = document.querySelector(".progress");

const blastConfetti = () => {
  const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

const getTodoListFromLocal = () => {
  return JSON.parse(localStorage.getItem("Todo_List"));
};

const addTodoListLocalStorage = (tasks) => {
  localStorage.setItem("Todo_List", JSON.stringify(tasks));
};
const getCheckedTasksListFromLocal = () => {
  return JSON.parse(localStorage.getItem("CheckedTasks_List"));
};

const addCheckedTasksListLocalStorage = (checkedTasks) => {
  localStorage.setItem("CheckedTasks_List", JSON.stringify(checkedTasks));
};

let tasks = getTodoListFromLocal() || [];
let checkedTasks = getCheckedTasksListFromLocal() || [];

let totalTodos = tasks.length;
let completedTodos = checkedTasks.length;
let progressWidth = (completedTodos / totalTodos) * 100;

progressBar.style.width = `${progressWidth}%`;
console.log(progressWidth);
progressCount.innerText = `${completedTodos} / ${totalTodos}`;
console.log(totalTodos);
console.log(completedTodos);

const addTodoDynamicElement = (curElem) => {
  const divElement = document.createElement("div");
  divElement.classList.add("main_todo_div");
  //   divElement.innerHTML = `<input type="checkbox" class="checkbox">
  //                           <input type="text" class="text_edit" value="${curElem}" readonly>
  //                           <button class="btn_edit"><i class="fa-solid fa-pen"></i></button>
  //                           <button class="btn_remove"><i class="fa-solid fa-trash"></i></button>`;

  const createInputField = document.createElement("input");
  if (checkedTasks.includes(curElem)) {
    createInputField.classList.add("text_edit", "done");
  } else {
    createInputField.classList.add("text_edit");
  }
  // createInputField.classList.add("text_edit");
  createInputField.type = "text";
  createInputField.value = curElem;
  createInputField.setAttribute("readonly", "readonly");

  const createInputField1 = document.createElement("input");
  // if (checkedTasks.includes(curElem)) {
  //   createInputField1.classList.add("text_edit", "done");
  // } else {
  //   createInputField1.classList.add("text_edit");
  // }
  createInputField1.classList.add("text_edit");
  createInputField1.type = "text";
  createInputField1.value = `${curElem}`;
  createInputField1.setAttribute("readonly", "readonly");
  createInputField1.setAttribute("style", "display: none;");

  const createEditButton = document.createElement("button");
  createEditButton.classList.add("btn_edit");
  createEditButton.innerHTML = `<i class="fa-solid fa-pen"></i>`;
  if (checkedTasks.includes(curElem)) {
    createEditButton.style.visibility = "hidden";
  }

  const createDeleteButton = document.createElement("button");
  createDeleteButton.classList.add("btn_remove");
  createDeleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;

  divElement.append(createInputField);
  divElement.append(createInputField1);
  divElement.append(createEditButton);
  divElement.append(createDeleteButton);

  todoListElements.append(divElement);
};

const addTodoList = (e) => {
  e.preventDefault();
  const todoListValue = textAdd.value.trim();
  if (todoListValue === "") {
    textAdd.placeholder = "Please add a task";
  } else if (tasks.includes(todoListValue)) {
    textAdd.placeholder = "Task already exists";
  } else {
    textAdd.placeholder = "Add a task";
  }
  textAdd.value = "";
  if (todoListValue !== "" && !tasks.includes(todoListValue)) {
    tasks.push(todoListValue);
    tasks = [...new Set(tasks)];
    console.log(tasks);
    localStorage.setItem("Todo_List", JSON.stringify(tasks));
    totalTodos = tasks.length;
    progressCount.innerText = `${completedTodos} / ${totalTodos}`;
    progressWidth = (completedTodos / totalTodos) * 100;
    if (completedTodos === totalTodos) {
      blastConfetti();
    }
    progressBar.style.width = `${progressWidth}%`;
    console.log(progressWidth);
    console.log(totalTodos);
    if (tasks.length === 0) {
      document
        .querySelector(".block_todo_list")
        .setAttribute("style", "display: none");
      console.log("EMPTY list");
    } else {
      document
        .querySelector(".block_todo_list")
        .removeAttribute("style", "display: none");
    }
    addTodoDynamicElement(todoListValue);
  }
};

const showTodoList = () => {
  if (tasks.length === 0) {
    document
      .querySelector(".block_todo_list")
      .setAttribute("style", "display: none");
    console.log("EMPTY list");
  } else {
    console.log(tasks);
    tasks.forEach((curElem) => {
      addTodoDynamicElement(curElem);
    });
    if (completedTodos === totalTodos) {
      blastConfetti();
    }
  }
};

showTodoList();

const removeTodoElement = (e) => {
  //   console.log(e.target);
  const todoToRemove = e.target;
  // console.log(todoToRemove.parentElement.classList.contains("main_todo_div"));
  let todoListContent;
  let parentElem;
  if (todoToRemove.parentElement.classList.contains("main_todo_div")) {
    todoListContent =
      todoToRemove.previousElementSibling.previousElementSibling.value;
    parentElem = todoToRemove.parentElement;
    // console.log(todoListContent);
    // console.log(parentElem);
  } else if (todoToRemove.parentElement.classList.contains("btn_remove")) {
    todoListContent =
      todoToRemove.parentElement.previousElementSibling.previousElementSibling
        .value;
    parentElem = todoToRemove.parentElement.parentElement;
    // console.log(todoListContent);
    // console.log(parentElem);
  }

  tasks = tasks.filter((curData) => {
    // console.log(typeof curData);
    // console.log(typeof todoListContent);
    return curData !== todoListContent;
  });
  console.log(tasks);

  addTodoListLocalStorage(tasks);
  parentElem.remove();
  totalTodos = tasks.length;
  checkedTasks = checkedTasks.filter((curData) => {
    // console.log(typeof curData);
    // console.log(typeof todoListContent);
    return curData !== todoListContent;
  });
  completedTodos = checkedTasks.length;
  progressCount.innerText = `${completedTodos} / ${totalTodos}`;
  progressWidth = (completedTodos / totalTodos) * 100;
  if (completedTodos === totalTodos) {
    blastConfetti();
  }
  progressBar.style.width = `${progressWidth}%`;
  console.log(progressWidth);
  addCheckedTasksListLocalStorage(checkedTasks);
  console.log(checkedTasks);
  console.log(totalTodos);
  //   console.log(todoListContent);
  if (tasks.length === 0) {
    document
      .querySelector(".block_todo_list")
      .setAttribute("style", "display: none");
    console.log("EMPTY list");
  }
};

const editTodoElement = (e) => {
  console.log(e.target);
  const todoToEdit = e.target;
  // console.log(todoToEdit.previousElementSibling);
  let todoListInputElem;
  let dataToChange;
  let indexAtChange;
  if (todoToEdit.parentElement.classList.contains("main_todo_div")) {
    todoListInputElem = todoToEdit.previousElementSibling;
    todoListInputElem.previousElementSibling.setAttribute(
      "style",
      "display: none;"
    );
    todoListInputElem.removeAttribute("style", "display: none;");
    console.log(todoListInputElem);
  } else if (todoToEdit.parentElement.classList.contains("btn_edit")) {
    todoListInputElem = todoToEdit.parentElement.previousElementSibling;
    todoListInputElem.previousElementSibling.setAttribute(
      "style",
      "display: none;"
    );
    todoListInputElem.removeAttribute("style", "display: none;");
    console.log(todoListInputElem);
  }
  if (todoListInputElem.hasAttribute("readonly")) {
    todoListInputElem.removeAttribute("readonly");
    todoListInputElem.removeAttribute("style", "cursor: default;");
    todoListInputElem.setAttribute(
      "style",
      "border-bottom: 1px solid #642ffe; pointer-events: none;"
    );

    todoListInputElem.focus();
    // console.log(todoToEdit.tagName);

    if (todoToEdit.parentElement.tagName == "BUTTON") {
      console.log(todoToEdit.tagName);
      todoToEdit.setAttribute("class", "fa-solid fa-check");
    } else if (todoToEdit.tagName == "BUTTON") {
      console.log(todoToEdit.tagName);
      todoToEdit.innerHTML = `<i class="fa-solid fa-check"></i>`;
    }
  } else {
    todoListInputElem.removeAttribute(
      "style",
      "border-bottom: 1px solid #642ffe; pointer-events: none;"
    );
    todoListInputElem.setAttribute("readonly", "readonly");
    todoListInputElem.setAttribute("style", "cursor: default;");
    if (todoToEdit.parentElement.tagName == "BUTTON") {
      console.log(todoToEdit.tagName);
      todoToEdit.setAttribute("class", "fa-solid fa-pen");
    } else if (todoToEdit.tagName == "BUTTON") {
      console.log(todoToEdit.tagName);
      todoToEdit.innerHTML = `<i class="fa-solid fa-pen"></i>`;
    }
    // tasks[indexAtChange] = todoListInputElem.value;
  }
  dataToChange = todoListInputElem.previousElementSibling.value;
  console.log(todoListInputElem.previousElementSibling.value);
  indexAtChange = tasks.indexOf(dataToChange);
  console.log(indexAtChange);
  console.log(tasks);
  console.log(typeof todoListInputElem.previousElementSibling.value);
  console.log(indexAtChange);
  tasks[indexAtChange] = todoListInputElem.value;
  console.log(tasks);
  console.log(todoListInputElem.value);
  todoListInputElem.previousElementSibling.value = todoListInputElem.value;
  addTodoListLocalStorage(tasks);
};

const completedElement = (e) => {
  console.log(e.target);
  const completedTodo = e.target;
  // completedTodo.setAttribute("style", "text-decoration: line-through;");
  completedTodo.classList.toggle("done");
  if (completedTodo.className == "text_edit done") {
    if (
      completedTodo.nextElementSibling.tagName == "BUTTON" &&
      completedTodo.nextElementSibling.classList.contains("btn_edit")
    ) {
      completedTodo.nextElementSibling.style.visibility = "hidden";
    }
    if (
      completedTodo.nextElementSibling.nextElementSibling.tagName == "BUTTON" &&
      completedTodo.nextElementSibling.nextElementSibling.classList.contains(
        "btn_edit"
      )
    ) {
      completedTodo.nextElementSibling.nextElementSibling.style.visibility =
        "hidden";
    }
    checkedTasks.push(completedTodo.value);
    localStorage.setItem("CheckedTasks_List", JSON.stringify(checkedTasks));
    completedTodos = checkedTasks.length;
    progressCount.innerText = `${completedTodos} / ${totalTodos}`;
    progressWidth = (completedTodos / totalTodos) * 100;
    if (completedTodos === totalTodos) {
      blastConfetti();
    }
    progressBar.style.width = `${progressWidth}%`;
    console.log(progressWidth);
    console.log(checkedTasks);

    console.log(10);
  } else {
    if (
      completedTodo.nextElementSibling.tagName == "BUTTON" &&
      completedTodo.nextElementSibling.classList.contains("btn_edit")
    ) {
      completedTodo.nextElementSibling.style.visibility = "visible";
    }
    if (
      completedTodo.nextElementSibling.nextElementSibling.tagName == "BUTTON" &&
      completedTodo.nextElementSibling.nextElementSibling.classList.contains(
        "btn_edit"
      )
    ) {
      completedTodo.nextElementSibling.nextElementSibling.style.visibility =
        "visible";
    }
    checkedTasks = checkedTasks.filter((curData) => {
      // console.log(typeof curData);
      // console.log(typeof todoListContent);
      return curData !== completedTodo.value;
    });
    completedTodos = checkedTasks.length;
    progressCount.innerText = `${completedTodos} / ${totalTodos}`;
    progressWidth = (completedTodos / totalTodos) * 100;
    if (completedTodos === totalTodos) {
      blastConfetti();
    }
    progressBar.style.width = `${progressWidth}%`;
    console.log(progressWidth);
    addCheckedTasksListLocalStorage(checkedTasks);
    console.log(checkedTasks);
    console.log(20);
  }
  // console.log(completedTodo.nextElementSibling);
};

todoListElements.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(e.target);
  if (
    e.target.classList.contains("btn_remove") ||
    e.target.classList.contains("fa-trash")
  ) {
    removeTodoElement(e);
  }
  if (
    e.target.classList.contains("btn_edit") ||
    e.target.classList.contains("fa-pen") ||
    e.target.classList.contains("fa-check")
  ) {
    editTodoElement(e);
  }
  if (
    e.target.classList.contains("text_edit") ||
    e.target.classList.contains("text_edit done")
  ) {
    completedElement(e);
  }
});

btnAdd.addEventListener("click", (e) => {
  addTodoList(e);
});
