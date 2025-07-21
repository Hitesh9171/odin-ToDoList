
export function getLists() {
    return JSON.parse(localStorage.getItem("lists")) || [];
}

export function saveList(name, color) {
    const lists = getLists();
    lists.push({ name, color });
    localStorage.setItem("lists", JSON.stringify(lists));
}

export function getTaskByDate(dateStr) {
    console.log("get tasks function called");
    const tasks=JSON.parse(localStorage.getItem("tasks")) || {};
    return tasks[dateStr] || [];
}
export function saveTask(dateStr,task) {
    console.log("save task function was called");
    const tasks=JSON.parse(localStorage.getItem("tasks")) || {};
    tasks[dateStr]=tasks[dateStr] || [];
    //check if the task alderady exists
    tasks[dateStr] = tasks[dateStr]?.filter(t => t !== null) || [];
    const exisitingTask= tasks[dateStr].some(t => t.title === task.title);
    if(exisitingTask){
        console.log("Task already exists");
        alert(`Task already exists for this date , please select a new title or update the existing one by clicking on the task ${exisitingTask.title}`);
        return;
    }
    tasks[dateStr].push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
export function updateTask(dateStr,oldtitle,title,description){
    console.log("Update task function called" , dateStr);
    const tasks=JSON.parse(localStorage.getItem("tasks")) || {};
    tasks[dateStr]=tasks[dateStr].map(task => {
        if(task.title === oldtitle){
            return {
                ...task,
                title,
                description
            };
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
export function deleteTask(dateStr, oldtitle, title, description) {
    console.log("Delete task function called");
    const tasks=JSON.parse(localStorage.getItem("tasks")) || {};
    if(!tasks[dateStr]){
        console.log("No Tasks found");
        return;
    }
     tasks[dateStr] = tasks[dateStr].filter(task =>
        !(task && (task.title === oldtitle || task.title === title || task.description === description))
    );

    localStorage.setItem("tasks", JSON.stringify(tasks));
}