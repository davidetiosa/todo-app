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
const completedTaskEl = document.getElementById("completed-tasks")
const checkIconBox = document.getElementsByClassName("checkIconBox")
const taskItem = document.querySelector(".taskItem")
const evaOff = document.getElementsByClassName("eva-radio-button-off")
const checkOn =`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" class="eva eva-radio-button-on" fill="#ffffff6e"><g data-name="Layer 2"><g data-name="radio-button-on"><rect width="24" height="24" opacity="0"></rect><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path><path d="M12 7a5 5 0 1 0 5 5 5 5 0 0 0-5-5z"></path></g></g></svg>`
const checkOff = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" class="eva eva-radio-button-off" fill="#3446ee"><g data-name="Layer 2"><g data-name="radio-button-off"><rect width="24" height="24" opacity="0"></rect><path d="M12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10zm0-18a8 8 0 1 0 8 8 8 8 0 0 0-8-8z"></path></g></g></svg>`
const addLine = "line-through"

let tasksData = []

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

function markComplete() {
    for(let i = 0; i < tasksData.length; i++) {
        checkIconBox[i].childNodes[1].addEventListener("click", (e)=> {
            if(tasksData[i].completed == false) {
                tasksData[i].completed = true
                setItemToLS()
                checkIconBox[i].childNodes[3].remove()
                checkIconBox[i].innerHTML += checkOn
                checkIconBox[i].parentNode.childNodes[3].classList.add("task-complete")
            }
        })

        // move
        if(tasksData[i].completed == true) {
            checkIconBox[i].childNodes[3].remove()
            checkIconBox[i].innerHTML += checkOn
            checkIconBox[i].parentNode.childNodes[3].classList.add("task-complete")
            completedTaskEl.innerHTML += `
                                            <li class="taskItem" id="task-${tasksData[i].id}">
                                                <div class="checkIconBox">
                                                    <div class="boxBg-el"></div>
                                                    ${checkOn}
                                                </div>
                                                <p class="taskValue task-complete">${tasksData[i].name}</p>
                                            </li>
                                        `
        }
    }
}
markComplete()

// checks if tasks is completed
function checkIfCompleted() {
    tasksData.forEach((item, index) => {
        if(item.completed === true) {
            markComplete()
        }
    })
}


// generates task item from tasks array
function generateTask(task) {
    let taskItems = ""
    for(let i = 0; i < task.length; i++) {
        taskItems += `
            <li class="taskItem" id="task-${task[i].id}">
                <div class="checkIconBox">
                    <div class="boxBg-el"></div>
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
        setItemToLS()
        generateTask(tasksData)
        checkIfCompleted()
    }
    eva.replace()
    addTaskField.value = ""
    removeOverlay()
}
//

// set item to local storage
function setItemToLS() {
    localStorage.setItem("tasksData", JSON.stringify(tasksData))
}

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
//

