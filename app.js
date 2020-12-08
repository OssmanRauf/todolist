const input = document.querySelector("#todo-input");
const btn = document.querySelector("#todo-btn");
const check_icon = document.querySelectorAll(".check-img");
const trash = document.querySelectorAll(".trash-img");
const task_list = document.querySelector(".task-list");

btn.addEventListener("click", () => {
    if (input.value.replace(/ /g, "")) {
        const task = input.value.trim();
        const li = document.createElement("li");
        li.innerHTML = `<h4 class="task">${task}</h4>
                <img class="check-img" src="./check_icon.svg ">
                <img class="trash-img" src="./trash_icon.svg">`;
        task_list.appendChild(li);
        input.value = "";
    } else {
        alert("Por favor coloque um valor certo");
        input.value = "";
    }
});

task_list.addEventListener('click', () => {;
    const task = event.target.parentElement.firstChild;
    if (task.classList.contains('compleated')) {
        event.target.classList.remove("checked");
        task.classList.remove("compleated");
    } else {
        event.target.classList.add('checked');
        task.classList.add("compleated");
    }

})

// function task_done() {
//     const check_icon = document.querySelectorAll('.task').this;
//     // if (check_icon.classList.contains("checked")) {
//     //     check_icon.classList.remove("checked");
//     //     check_icon.previousElementSibling.classList.remove("compleated");
//     // } else {
//     //     check_icon.classList.add("checked");
//     //     check_icon.previousElementSibling.classList.add("compleated");
//     // };
//     const h = document.querySelectorAll(".task");
//     console.log(this.siblings('.task').text());

// }
// task_list.addEventListener('click', (element) => {
//     const task = element.parentElement.previousSibling;
//     if (element.classList.contains("checked")) {
//         task.classList.remove("compleated");
//         element.classList.remove("checked");
//     } else {
//         task.classList.add("compleated");
//         element.classList.add("checked");
//     }
// });
// function click() {
//     if (input.value.replace(/ /g, "")) {
//         const task = input.value.trim();
//         const formated_task = task.replace(task.charAt(0).toUpperCase());
//         const li = document.createElement("li");
//         console.log(task);
//         li.innerHTML = `<h4 class="task">${formated_task}</h4><span><img class="check-img" src="./check_icon.svg" ><img class="trash-img" src="./trash_icon.svg"></span>`;
//         task_list.appendChild(li);
//         input.value = "";
//     } else {
//         alert("Por favor coloque um valor certo");
//         input.value = "";
//     }
//     // return (check = document.querySelectorAll(".check-img"));

// };

// check.forEach(element => {
//     element.addEventListener('click', () => {
//         const task = element.parentElement.previousSibling;
//         if (element.classList.contains('checked')) {
//             task.classList.remove("compleated");
//             element.classList.remove('checked');

//         } else {
//             task.classList.add('compleated');
//             element.classList.add("checked");
//         };
//     });
// });