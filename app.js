const input = document.querySelector("#todo-input");
const form = document.querySelector("#form");
const taskList = document.querySelector(".task-list");
const search = document.querySelector("#search");

// Registering Service worker
if (`serviceWorker` in navigator) {
    navigator.serviceWorker
        .register("sw.js")
        .then((registration) => {
            console.log("registered", registration);
        })
        .catch((er) => {
            console.log("error", er);
        });
}

showAllElementsUI();

class Task {
    constructor(task, completed) {
        this.task = task;
        this.completed = completed;
    }
}

//creating task adding element in local storage and in the page
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value.replace(/ /g, "")) {
        const text = input.value.trim();
        const taskFormated = text.charAt(0).toUpperCase() + text.slice(1);
        const task = new Task(taskFormated, false);
        // adding task to the page
        addElement(task.task);
        // adding task to local storage
        addToLocalStorage(task);
        input.value = "";
    } else {
        alert("Please type a valid text");
        input.value = "";
    }
});

// listens to click event in the entire task block
taskList.addEventListener("click", () => {
    let tasks;
    tasks = JSON.parse(localStorage.getItem("tasks"));
    const taskText = event.target.parentElement.firstChild;
    const li = event.target.parentElement;
    const index = getInd(taskText.textContent);
    //if the check button was clicked add or remove completed class
    if (event.target.classList.contains("check-img")) {
        if (taskText.classList.contains("completed")) {
            event.target.classList.remove("checked");
            taskText.classList.remove("completed");
            li.style.backgroundColor = "rgba(255, 255, 255, 0.955)";
            tasks[index].completed = false;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            if (document.getElementById("options").value === "completed") {
                li.parentElement.removeChild(li);
            }
        } else {
            event.target.classList.add("checked");
            taskText.classList.add("completed");
            li.style.backgroundColor = "rgba(239, 239, 239, 0.9)";
            tasks[index].completed = true;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            if (document.getElementById("options").value === "uncompleted") {
                li.parentElement.removeChild(li);
            }
        }
    }

    //if the trash button was clicked delete the task from UI and local storage
    if (event.target.classList.contains("trash-img")) {
        if (event.target.previousElementSibling.classList.contains("checked")) {
            if (taskText) {
                tasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                li.remove();
            }
        } else if (confirm("Are you sure you want to delete this task?")) {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            li.remove();
        }
    }
});

// search for a task
search.addEventListener("keyup", () => {
    const searchText = event.target.value.toLowerCase();
    const li = document.querySelectorAll("li");
    li.forEach((element) => {
        const task = element.firstChild.textContent.toLowerCase();
        if (task.indexOf(searchText) != -1) {
            console.log(task.indexOf(searchText));
            element.style.display = "flex";
        } else {
            element.style.display = "none";
        }
    });
});

// get index(used to get index of a specific task)
function getInd(text) {
    let tasks;
    tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks.length != 0) {
        const index = tasks.findIndex((task) => task.task === text);
        return index;
    }
}

function clearUI() {
    if (taskList.children.length > 0) {
        taskList.innerHTML = "";
    }
}

function showAllElementsUI() {
    clearUI();
    if (localStorage.getItem("tasks") != null) {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.forEach((task) => {
            const li = document.createElement("li");
            if (task.completed === false) {
                li.innerHTML = `<h4 class="task">${task.task}</h4><img class="check-img" src="./img/check_icon.svg"><img class="trash-img" src="./img/trash_icon.svg">`;
            } else {
                li.innerHTML = `<h4 class="task completed">${task.task}</h4><img class="check-img checked" src="./img/check_icon.svg"><img class="trash-img" src="./img/trash_icon.svg">`;
                li.style.backgroundColor = "rgba(239, 239, 239, 0.9)";
            }
            taskList.insertBefore(li, taskList.firstChild);
        });
    }
}

function showCompletedElementsUI() {
    clearUI();
    if (localStorage.getItem("tasks") != null) {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.forEach((task) => {
            if (task.completed === true) {
                const li = document.createElement("li");
                const h4 = document.createElement("h4");
                h4.classList.add("task");
                h4.textContent = task.task;
                const checkBtn = document.createElement("img");
                checkBtn.classList.add("check-img");
                checkBtn.src = "./img/check_icon.svg";
                const trashBtn = document.createElement("img");
                trashBtn.classList.add("trash-img");
                trashBtn.src = "./img/trash_icon.svg";
                h4.classList.add("completed");
                checkBtn.classList.add("checked");
                li.style.backgroundColor = "rgba(239, 239, 239, 0.9)";
                li.appendChild(h4);
                li.appendChild(checkBtn);
                li.appendChild(trashBtn);
                taskList.insertBefore(li, taskList.firstChild);
            }
        });
    }
}

function showUncompletedElementsUI() {
    clearUI();
    if (localStorage.getItem("tasks") != null) {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.forEach((task) => {
            if (task.completed === false) {
                const li = document.createElement("li");
                const h4 = document.createElement("h4");
                h4.classList.add("task");
                h4.textContent = task.task;
                const checkBtn = document.createElement("img");
                checkBtn.classList.add("check-img");
                checkBtn.src = "./img/check_icon.svg";
                const trashBtn = document.createElement("img");
                trashBtn.classList.add("trash-img");
                trashBtn.src = "./img/trash_icon.svg";
                li.appendChild(h4);
                li.appendChild(checkBtn);
                li.appendChild(trashBtn);
                taskList.insertBefore(li, taskList.firstChild);
            }
        });
    }
}

function addElement(text) {
    const li = document.createElement("li");
    const h4 = document.createElement("h4");
    h4.classList.add("task");
    h4.textContent = text;
    const checkBtn = document.createElement("img");
    checkBtn.classList.add("check-img");
    checkBtn.src = "./img/check_icon.svg";
    const trashBtn = document.createElement("img");
    trashBtn.classList.add("trash-img");
    trashBtn.src = "./img/trash_icon.svg";
    li.appendChild(h4);
    li.appendChild(checkBtn);
    li.appendChild(trashBtn);
    taskList.insertBefore(li, taskList.firstChild);
}

function addToLocalStorage(item) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(item);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// get the option from the user
function change() {
    const e = document.getElementById("options").value;
    if (e === "all") {
        showAllElementsUI();
    } else if (e === "completed") {
        showCompletedElementsUI();
    } else if (e === "uncompleted") {
        showUncompletedElementsUI();
    }
}