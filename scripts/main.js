const addGroupField = document.getElementById("addGroupModal--field")
const addGroupButton = document.getElementById("addGroupModal--button")

const defaultAddTaskField = document.getElementById("defaultAddTaskModal--field")
const defaultAddTaskButton = document.getElementById("defaultAddTaskModal--button")

const defaultUncompletedTasksBox = document.getElementById("default-uncompleted-tasks--box")

let todoAppData = {
    defaultuncompletedtasks: []
}
const getStoredTodoAppData = localStorage.getItem("todoAppData")
const parsedTodoAppData = JSON.parse(getStoredTodoAppData)

// displays items from local storage
if(parsedTodoAppData) {
    todoAppData = parsedTodoAppData

    generateDefaultTask(todoAppData.defaultuncompletedtasks)
}

const defTaskItem = document.querySelectorAll(".section--box-item")

// creates group
function createGroup() {
    if(addGroupField.value) {
        console.log(addGroupField.value)
    }

    addGroupField.value = ""
    removeOMs()
}

addGroupButton.addEventListener("click", ()=> {
    createGroup()
})

// generate random string of characters for task id
function generateTaskId(length) {
    let taskId = ""
    let idString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for ( let i = 0; i < length; i++ ) {
        taskId += idString.charAt(Math.floor(Math.random() * idString.length))
   }
   return taskId
}

// set item to local storage
function setItemToLS() {
    localStorage.setItem("todoAppData", JSON.stringify(todoAppData))
}

// adds task to default uncompleted tasks array
function addDefaultTask() {
    if(defaultAddTaskField.value) {
        todoAppData.defaultuncompletedtasks.push({
            name: defaultAddTaskField.value,
            completed: false,
            id: `${generateTaskId(8)}${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 200)}${todoAppData.defaultuncompletedtasks.length}-${generateTaskId(16)}${Math.floor(Math.random() * 1000)}`
        })

        // adds item to local storage
        setItemToLS()
        generateDefaultTask(todoAppData.defaultuncompletedtasks)
    }

    defaultAddTaskField.value = ""
    removeOMs()
}

defaultAddTaskButton.addEventListener("click", ()=> {
    addDefaultTask()
})

// sets task item state
defTaskItem.forEach(item => item.addEventListener("click", (e)=> {

    if(!(item.classList.contains("completed"))) {
        item.classList.add("completed")
    } else if(item.classList.contains("completed")) {
        item.classList.remove("completed")
    }
    
}))

// TODO: work on completed task empty state

// TODO: work on task groups
document.querySelectorAll(".group--item").forEach(grpItm => grpItm.addEventListener("click", ()=> {
    console.log(generateTaskId(32))
}))