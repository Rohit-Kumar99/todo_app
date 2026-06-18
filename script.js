const todo_task = document.querySelector("#input-todo");
const add_todoBtn = document.querySelector("#add_btn");
const container = document.querySelector(".todo-task-container");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//========= Render Tasks Function============
function renderTask(taskData){
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    taskElement.innerHTML = `
        <div class="left">
            <h4 class="todo_task">${taskData.text}</h4>
        </div>

        <div class="todo-date">
            <span class="material-icons-sharp">timelapse</span>
            <h4 class="task-time">${taskData.time}</h4>
        </div>

        <div class="options">
            <span class="material-icons-sharp edit-btn">edit</span>
            <span class="material-icons-sharp delete-btn">delete</span>
        </div>
    `;

    container.appendChild(taskElement);

    const deleteBtn = taskElement.querySelector(".delete-btn");
    const editBtn = taskElement.querySelector(".edit-btn");
    const textElement = taskElement.querySelector(".todo_task");

    deleteBtn.addEventListener("click", () => {
        tasks = tasks.filter(t => t.id !== taskData.id);
        saveTasks();
        taskElement.remove();
    });

    editBtn.addEventListener("click", () => {
        todo_task.focus();
        todo_task.value = textElement.innerText;
        add_todoBtn.innerText = "Update";

        edit.status = true;
        edit.element = taskData;
    });
}
let edit = {
    status: false,
    element: null
};

function addTodo() {

    if (todo_task.value.trim() === "") return;

    const currentTime = new Date().toLocaleTimeString();

    // UPDATE MODE
    if (edit.status) {
        
        const taskToUpdate = tasks.find(t => t.id === edit.element.id);
        taskToUpdate.text = todo_task.value;

        saveTasks();
        reloadUI();

        edit.status = false;
        todo_task.value = "";
        add_todoBtn.innerText = "Add";
        return;
    }

    const newTask = {
        id: Date.now(),
        text: todo_task.value,
        time: currentTime
    };

    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);

    todo_task.value = "";
}

todo_task.addEventListener("keyup",(e)=>{
    if (e.key == "Enter"){
       addTodo();
    }
})

add_todoBtn.addEventListener("click", function(){
        addTodo();
});

function reloadUI(){
    container.innerHTML = "";
    tasks.forEach(renderTask);
}

reloadUI();

