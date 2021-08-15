const dateEL = document.getElementById("date-el")
const date = new Date()
const currentDate = date.getDate()
const dayAndMonth = [
    days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesay",
        "Thursday",
        "Friday",
        "Saturday"
    ],
    months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]
]
const currentDay = dayAndMonth[0][date.getDay()]
const currentMonth = dayAndMonth[1][date.getMonth()]
const createNewTaskButton = document.getElementById("newTaskBtn")
const addModal = document.getElementById("addOverlay")
const overlayInnerEl = document.querySelectorAll(".overlayInner-el")
const addTaskField = document.getElementById("addTaskField")
const addTaskBtn = document.getElementById("addTaskBtn")
const taskEl = document.getElementById("tasks")
const checkOn = "on"
const checkOff = "off"
const addLine = "line-through"

let tasksData = []
let taskId = 0

const getStoredTasks = localStorage.getItem("tasksData")
const parsedStoredTasks = JSON.parse(getStoredTasks)

// displays items from local storage
if(parsedStoredTasks) {
    tasksData = parsedStoredTasks
    generateTask(tasksData)
}
//

// shows date
dateEL.textContent = `${currentDay}, ${currentDate} ${currentMonth}`
//

// adds overlay
function addOverlay() {
    addModal.classList.remove("d-none")
    addModal.classList.add("visible")
}
//

// removes overlay
function removeOverlay() {
    addModal.classList.add("d-none")
    addModal.classList.remove("visible")
}
//

// create new task button
createNewTaskButton.addEventListener("click", () => {
    addOverlay()
})
//

// add new task modal
addModal.addEventListener("click", ()=> {
    addTaskField.value = ""
    removeOverlay()
})

// stop overlay from closing when inner div is clicked
overlayInnerEl.forEach(overlay => overlay.addEventListener("click", (e)=> {
    e.preventDefault()
    e.stopPropagation()
    return false
}))

// generates task item from tasks array
function generateTask(task) {
    let taskItems = ""
    for(let i = 0; i < task.length; i++) {
        taskItems += `
            <li class="taskItem" id="task-${task[i].id}">
                <div class="checkIconBox">
                    <i data-eva="radio-button-off" data-eva-fill="#3446ee" data-eva-height="20" data-eva-width="20"></i>
                </div>
                <p class="taskValue">${task[i].name}</p>
            </li>
        `
    }
    // <input type="radio" id="task-${task.indexOf(task[i])}" name="task-${task.indexOf(task[i])}" value="${task[i]}">
    // <label for="task-${task.indexOf(task[i])}">${task[i]}</label>
    taskEl.innerHTML = taskItems
}

// generate random string for task id
function generateTaskId(length) {
    let taskId = ""
    let idString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for ( let i = 0; i < length; i++ ) {
        taskId += idString.charAt(Math.floor(Math.random() * idString.length))
   }
   return taskId
}

// adds task to tasks array
function addTask() {
    if(addTaskField.value) {
        tasksData.push({
            name: addTaskField.value,
            completed: false,
            id: `${generateTaskId(8)}${Math.floor(Math.random() * 1000)}-${generateTaskId(8)}${Math.floor(Math.random() * 200)}${tasksData.length}${Math.floor(Math.random() * 200)}-${generateTaskId(16)}${Math.floor(Math.random() * 1000)}`
        })

        // adds task item to local storage
        localStorage.setItem("tasksData", JSON.stringify(tasksData))
        generateTask(tasksData)
    }
    eva.replace()
    addTaskField.value = ""
    removeOverlay()
}
//

// ccreate a new task object
//

// add new task button
addTaskBtn.addEventListener("click", ()=> {
    addTask()
})
//

// add new task when enter key is pressed
document.addEventListener("keyup", (e)=> {
    if(e.key == "Enter") {
        addTask()
    }
})

