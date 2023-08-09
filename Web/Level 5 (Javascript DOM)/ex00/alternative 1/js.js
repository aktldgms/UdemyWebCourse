let taskList = [
    {"id": 1, "name": "Görev 1", "statu": "pending"},
    {"id": 2, "name": "Görev 2", "statu": "pending"},
    {"id": 3, "name": "Görev 3", "statu": "pending"},
    {"id": 5, "name": "Görev 4", "statu": "pending"},
    {"id": 4, "name": "Görev 5", "statu": "pending"}
];

if (localStorage.getItem ("taskList") !== null) {
    taskList = JSON.parse (localStorage.getItem ("taskList"));
}

const ul = document.querySelector (".list-group");
const addButton = document.querySelector ("#addButton");
const clearButton = document.querySelector ("#clearButton");
let filterSpans = document.querySelector ("#filters").children;
let nameInput = document.querySelector ("#taskName");
let activeFilter = "all";
let editMode = false;
let editedItemID;


displayTasks (activeFilter);

function displayTasks (activeFilter) {
    ul.innerHTML = "";

    if (taskList.length == 0) {
        ul.innerHTML = '<p class="text-center mt-5" style="font-size: 1.5rem; font-weight: 500; color: #ad9cf1;">ADD SOME TASKS TO DO IT ;)</p>';
    }
    else {
        for (var task of taskList) {
            let completed = task.statu == "completed" ? "checked" : "";
            if (activeFilter == "all" || activeFilter == task.statu) {
                let li = `<li class="list-group-item form-check d-flex justify-content-between align-items-center">
                            <form>
                                <input onclick="updateStatu(this)" type="checkbox" id="${task.id}" class="form-check-input ms-1 me-2" ${completed}>
                                <label for="${task.id}" class="form-check-label ${completed}">${task.name}</label>
                            </form>

                            <div class="dropdown-center">
                                <button class="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-dark">
                                    <li><a class="dropdown-item" href="#" onclick="changeMode(${task.id})"><i class="fa-solid fa-pencil"></i> Edit</a></li>
                                    <li><a class="dropdown-item" href="#" onclick="deleteTask(this)"><i class="fa-regular fa-trash-can"></i> Remove</a></li>
                                </ul>
                            </div>
                        </li>`;
                ul.insertAdjacentHTML ("beforeend", li);
            }
        }
    }
    for (let task in taskList) {
        taskList[task].id = parseInt (task);
    }
}

addButton.addEventListener ("click", addTask);
clearButton.addEventListener ("click", clearTasks);

nameInput.addEventListener ("keydown", function (e) {
    if (e.key == "Enter") {
        addTask ();
    }
});

function addTask () {
    let value = nameInput.value;
    if (value == "") {
        alert ("PLEASE WRITE THE TASK NAME!");
    }
    else {
        if (!editMode) {
            taskList.push (
                {"id": taskList.length, "name": value, "statu": "pending"}
            );
            
            displayTasks (activeFilter);
            nameInput.value = "";
            localStorage.setItem ("taskList", JSON.stringify (taskList));
        }
        else {
            taskList[editedItemID].name = value;
            nameInput.value = "";
            localStorage.setItem ("taskList", JSON.stringify (taskList));
            displayTasks (activeFilter);
            editMode = false;
        }
    }
}

function clearTasks () {
    taskList.splice (0, (taskList.length));
    localStorage.setItem ("taskList", JSON.stringify (taskList));
    displayTasks (activeFilter);
}

function updateStatu (checkBox) {
    var label = checkBox.nextElementSibling;
    var statu;

    if (checkBox.checked) {
        label.classList.add ("checked");
        statu = "completed";
    }
    else {
        label.classList.remove ("checked");
        statu = "pending";
    }

    for (var task of taskList) {
        if (task.id == checkBox.id) {
            task.statu = statu;
        }
    }
    localStorage.setItem ("taskList", JSON.stringify (taskList));
    displayTasks (activeFilter);
}

function filters (filterSpan) {
    for (var span of filterSpans) {
        span.classList.remove ("active");
    }
    filterSpan.classList.add ("active");

    if (parseInt (filterSpan.id[6]) == 1) {
        activeFilter = "all";
    }
    else if (parseInt (filterSpan.id[6]) == 2) {
        activeFilter = "pending";
    }
    else if (parseInt (filterSpan.id[6]) == 3) {
        activeFilter = "completed";
    }
    displayTasks (activeFilter);
    localStorage.setItem ("taskList", JSON.stringify (taskList));
}

function deleteTask (deletedTask) {
    if (editMode) {
        alert ("PLEASE EXIT EDIT MODE BEFORE DELETING!");
    }
    else {
        var index = deletedTask.parentElement.parentElement.parentElement.previousElementSibling.children[0].id;
        taskList.splice (index, 1);
        localStorage.setItem ("taskList", JSON.stringify (taskList));
        displayTasks (activeFilter);
    }
}

function changeMode (id) {
    if(editMode && editedItemID == id) {
        editMode = false;
        nameInput.value = "";
    } else {
        editMode = true;
        nameInput.value = taskList[id].name;
        editedItemID = id;
    }
}