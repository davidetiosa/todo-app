const addGroupField = document.getElementById("addGroupModal--field")
const addGroupButton = document.getElementById("addGroupModal--button")

const defaultAddTaskField = document.getElementById("defaultAddTaskModal--field")
const defaultAddTaskButton = document.getElementById("defaultAddTaskModal--button")

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

// creates default task
function createDefaultTask() {
    if(defaultAddTaskField.value) {
        console.log(defaultAddTaskField.value)
    }

    defaultAddTaskField.value = ""
    removeOMs()
}

defaultAddTaskButton.addEventListener("click", ()=> {
    createDefaultTask()
})

// document.addEventListener("keyup", (e)=> {
//     if(e.key == "Enter") {
//         createGroup()
//     }
// })

