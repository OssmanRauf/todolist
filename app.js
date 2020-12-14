const input = document.querySelector("#todo-input");
const form = document.querySelector("#form");
const task_list = document.querySelector(".task-list");
const search = document.querySelector('#search');

function Task(task, compleated) {
    this.task = task;
    this.compleated = compleated;
};

adding_elements_ui();

form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (input.value.replace(/ /g, "")) {
        const text = input.value.trim();
        const task_formated = text.charAt(0).toUpperCase() + text.slice(1);
        const task = new Task(task_formated, false);
        add_element(task.task)
        add_localStorage(task);
        input.value = "";
    } else {
        alert("Please type a valid text");
        input.value = "";
    };
});



task_list.addEventListener('click', () => {
    let tasks;
    tasks = JSON.parse(localStorage.getItem("tasks"));
    const task_text = event.target.parentElement.firstChild;
    const li = event.target.parentElement;
    const index = get_index(task_text.textContent);
    if (event.target.classList.contains("check-img")) {
        if (task_text.classList.contains("compleated")) {
            event.target.classList.remove("checked");
            task_text.classList.remove("compleated");
            li.style.backgroundColor = "rgba(255, 255, 255, 0.955)";
            tasks[index].compleated = false;
            localStorage.setItem("tasks", JSON.stringify(tasks));
        } else {
            event.target.classList.add("checked");
            task_text.classList.add("compleated");
            li.style.backgroundColor = "rgba(239, 239, 239, 0.9)";
            tasks[index].compleated = true;
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }
    if (event.target.classList.contains("trash-img")) {
        if (event.target.previousElementSibling.classList.contains("checked")) {
            if (task_text) {
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



search.addEventListener('keyup', () => {
    const search_text = event.target.value.toLowerCase();
    const li = document.querySelectorAll('li');
    li.forEach(element => {
        const task = element.firstChild.textContent.toLowerCase();
        if (task.indexOf(search_text) != -1) {
            console.log(task.indexOf(search_text));
            element.style.display = "flex";
        } else {
            element.style.display = 'none';
        };
    });
});
















function get_index(text) {
    let tasks;
    tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks.length != 0) {
        const index = tasks.findIndex(task => task.task === text);
        return index

    };
};


function adding_elements_ui() {
    if (localStorage.getItem("tasks") != null) {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.forEach((task) => {
            const li = document.createElement("li");
            const h4 = document.createElement("h4");
            h4.classList.add("task");
            h4.textContent = task.task;
            const check_btn = document.createElement("img");
            check_btn.classList.add("check-img");
            check_btn.src = "./check_icon.svg";
            const trash_btn = document.createElement("img");
            trash_btn.classList.add("trash-img");
            trash_btn.src = "./trash_icon.svg";
            if (task.compleated === true) {
                h4.classList.add('compleated')
                check_btn.classList.add("checked");
                li.style.backgroundColor = "rgba(239, 239, 239, 0.9)";
            };
            li.appendChild(h4);
            li.appendChild(check_btn);
            li.appendChild(trash_btn);
            task_list.insertBefore(li, task_list.firstChild);

        })
    }
};

function add_element(text) {
    const li = document.createElement("li");
    const h4 = document.createElement("h4");
    h4.classList.add("task");
    h4.textContent = text;
    const check_btn = document.createElement("img");
    check_btn.classList.add("check-img");
    check_btn.src = "./check_icon.svg";
    const trash_btn = document.createElement("img");
    trash_btn.classList.add("trash-img");
    trash_btn.src = "./trash_icon.svg";
    li.appendChild(h4);
    li.appendChild(check_btn);
    li.appendChild(trash_btn);
    task_list.insertBefore(li, task_list.firstChild);

};


function add_localStorage(item) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    };
    tasks.push(item)
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // adding_element_ui(item.task);
};