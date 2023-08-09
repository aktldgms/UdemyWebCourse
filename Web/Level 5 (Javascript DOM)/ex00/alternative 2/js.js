let task_list = [];

if (localStorage.getItem("task_list") !== null) {
    task_list = JSON.parse(localStorage.getItem("task_list"));
}

const task_input = document.querySelector("#task_input");
const add_task = document.querySelector("#add_button");
const clear_all = document.querySelector("#clear_all");
const filters = document.querySelectorAll(".filters span")
let ul = document.getElementById("ul");
let editID;
let isEditTask = false;


displayTasks(document.querySelector("span.active").id);

function displayTasks(filter){
    ul.innerHTML = "";

    if(task_list.length == 0) {
        ul.innerHTML = '<p class="text-center" style="font-size: 20px; font-weight: 500;">YOUR TASK LIST IS EMPTY. ADD SOME TASKS ;)</p>'
    }else {
        for (let task of task_list) {
            let completed = task.status == "completed" ? "checked" : "";
            if (filter == task.status || filter == "all") {
                let li =    `<li class="list-group-item d-flex justify-content-between align-items-center"> 
                            <div class="task-item-1">
                                <input onclick="updateStatus(this)" type="checkbox" id="${task.id}" class="form-check-input" ${completed}>
                                <label for="${task.id}" class="form-check-label ${completed}"><b>${task.name}</b>: Lorem ipsum dolor sit amet. </label>
                            </div>
                            <div class="task-item-2">
                                <div class="dropdown-center">
                                    <button class="btn btn-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i style="color: blueviolet;" class="fa-solid fa-ellipsis"></i>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a onclick='editTask(${task.id}, "${task.name}")' class="dropdown-item" href="#" style="color: blueviolet;"><i class="fa-solid fa-pen-to-square"></i> Edit</a></li>
                                        <li><a onclick="deleteTask(${task.id})" class="dropdown-item text-danger" href="#"><i class="fa-regular fa-trash-can"></i> Delete</a></li>
                                    </ul>
                                </div>
                            </div>
                            </li>`;
                ul.insertAdjacentHTML("beforeend", li);
            }
        }
    }
}

add_task.addEventListener("click", addTask);
task_input.addEventListener("keypress", function(event){
    if (event.key == "Enter"){
        add_task.click()
    }
});

for(let span of filters) {
    span.addEventListener("click", function() {
        document.querySelector("span.active").classList.remove("active");
        span.classList.add("active");
        displayTasks(span.id);
    })
}

clear_all.addEventListener("click", clearTasks);

function addTask(){
    if(task_input.value == "") {
        alert("Enter a task name!");
    }else {
        if(!isEditTask){
            task_list.push(
                {"id": task_list.length + 1, "name": task_input.value, "status": "pending"}
            );
        }else {
            for (let task of task_list) {
                if (task.id == editID) {
                    task.name = task_input.value;
                }
            }
        }
        isEditTask = false;
        document.querySelector(".editBaslik").classList.remove("baslik-shadow");
        document.body.classList.remove("rgb");
        displayTasks(document.querySelector("span.active").id);
        localStorage.setItem("task_list", JSON.stringify(task_list));
    }

    task_input.value = "";

}

function clearTasks(){
    task_list.splice(0,task_list.length);
    localStorage.setItem("task_list", JSON.stringify(task_list));
    displayTasks();
}

function deleteTask(id) {
    let deletedID;

    for(let i in task_list){
        if(task_list[i].id == id){
            deletedID = i;
        }
    }

    task_list.splice(deletedID, 1);
    displayTasks(document.querySelector("span.active").id);
    localStorage.setItem("task_list", JSON.stringify(task_list));
}

function editTask(taskID, taskName) {
    editID = taskID;
    isEditTask = true;
    task_input.value = taskName;
    task_input.focus();

    document.body.classList.add("rgb");
    document.querySelector(".editBaslik").classList.add("baslik-shadow");
}

function updateStatus(checkb) {
    let label = checkb.nextElementSibling;
    let statu;

    if (checkb.checked) {
        label.classList.add("checked");
        statu = "completed";
    } else {
        label.classList.remove("checked");
        statu = "pending";
    }

    for (let task of task_list) {
        if (task.id == checkb.id) {
            task.status = statu;
        }
    }

    displayTasks(document.querySelector("span.active").id);
    localStorage.setItem("task_list", JSON.stringify(task_list));
}