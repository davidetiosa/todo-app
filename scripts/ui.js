const mainDateEl = document.getElementById("htop--grp-date-el")
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

const overlay = document.querySelector(".overlay")
const addGroupBtn = document.getElementById("add-group-btn")
const mainAddTaskBtn = document.getElementById("main-add-task-btn")

const overlayIE = document.querySelectorAll(".overlay--inputModal")

const textArea = document.querySelectorAll("textarea")

// shows current day, date and month
mainDateEl.textContent= `${currentDay}, ${currentDate} ${currentMonth}`

// opens add group modal
function addGM() {
    overlay.classList.add("active")
    overlay.classList.add("grpMod")
}

addGroupBtn.addEventListener("click", ()=> {
    addGM()
})


// opens main add task modal
function mainATM() {
    overlay.classList.add("active")
    overlay.classList.add("tskMod")
}

mainAddTaskBtn.addEventListener("click", ()=> {
    mainATM()
})

// removes overlay and modals
function removeOMs() {
    overlay.classList.remove("active")
    overlay.classList.remove("grpMod")
    overlay.classList.remove("tskMod")
}

overlay.addEventListener("click", ()=> {
    removeOMs()
})

// prevents overlay from closing when inner elements are clicked
overlayIE.forEach(overlayModal => overlayModal.addEventListener("click", (e)=> {
    // e.preventDefault()
    // e.stopPropagation()
    e.stopImmediatePropagation()
    // return false
}))

// auto resize textarea
textArea.forEach(Area => Area.addEventListener("keyup", (e)=> {
    Area.style.height = "auto"
    const taHeight = e.target.scrollHeight + "px"
    Area.style.height = `${taHeight}`
}))

// textarea character count
function gccUpdate(str) {
    const maxLength = document.getElementById("addGroupModal--field").getAttribute("maxlength")
    const talengthCount = maxLength - str.length
    document.querySelector(".charCount").innerHTML = `${talengthCount} characters left`
}
