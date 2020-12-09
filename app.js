const input = document.querySelector("#todo-input");
const btn = document.querySelector("#todo-btn");
const check_icon = document.querySelectorAll(".check-img");
const trash = document.querySelectorAll(".trash-img");
const task_list = document.querySelector(".task-list");

btn.addEventListener("click", () => {
    if (input.value.replace(/ /g, "")) {
        const task = input.value.trim();
        const task_formated = task.charAt(0).toUpperCase() + task.slice(1);
        const li = document.createElement("li");
        li.innerHTML = `<h4 class="task">${task_formated}</h4>
                <img class="check-img" src="./check_icon.svg ">
                <img class="trash-img" src="./trash_icon.svg">`;
        task_list.appendChild(li);
        input.value = "";
    } else {
        alert("Por favor coloque um texto valido");
        input.value = "";
    }
});

task_list.addEventListener('click', () => {
    const task_text = event.target.parentElement.firstChild;
    const li = event.target.parentElement;
    if (event.target.classList.contains('check-img')) {
        if (task_text.classList.contains('compleated')) {
            event.target.classList.remove("checked");
            task_text.classList.remove("compleated");


        } else {
            event.target.classList.add('checked');
            task_text.classList.add("compleated");
        };
    };
});
task_list.addEventListener("click", () => {

    const task = event.target.parentElement.firstChild;
    const li = event.target.parentElement;
    if (event.target.classList.contains("trash-img")) {
        if (event.target.previousElementSibling.classList.contains("checked")) {
            if (task) {
                li.remove();
            }
        } else if (confirm("Are you sure you want to delete this task?")) {
            if (task) {
                li.remove();
            };
        };

    };
});