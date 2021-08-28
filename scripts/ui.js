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

const sectionMain = document.querySelectorAll(".section")
const sectionBox = document.querySelectorAll(".section--box")
const titleDropIcon = document.querySelectorAll(".section--head_dropIcon")

// shows current day, date and month
mainDateEl.textContent= `${currentDay}, ${currentDate} ${currentMonth}`

// stops scrolling on body
stopBodyScroll = () => {
    document.body.style.overflow = 'hidden'
}

// opens add group modal
addGM = () => {
    overlay.classList.add("active")
    overlay.classList.add("grpMod")

    stopBodyScroll()
}

addGroupBtn.addEventListener("click", ()=> {
    addGM()
})


// opens main add task modal
mainATM = () => {
    overlay.classList.add("active")
    overlay.classList.add("tskMod")

    stopBodyScroll()
}

mainAddTaskBtn.addEventListener("click", ()=> {
    mainATM()
})

// removes overlay, modals and their input element values. makes body scrollable
removeOMs = () => {
    overlay.classList.remove("active")
    overlay.classList.remove("grpMod")
    overlay.classList.remove("tskMod")

    document.body.style.overflow = 'visible'
}

overlay.addEventListener("click", ()=> {
    document.getElementById("defaultAddTaskModal--field").value = ""
    document.getElementById("addGroupModal--field").value = ""
    gccUpdate(document.getElementById("addGroupModal--field").value)

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
gccUpdate = (str) => {
    const maxLength = document.getElementById("addGroupModal--field").getAttribute("maxlength")
    const talengthCount = maxLength - str.length
    document.querySelector(".charCount").innerHTML = `${talengthCount} characters left`
}

// generates task item from tasks array
generateDefaultTask = (defTask) => {
    let defaultTaskItems = ""
    for(let i = 0; i < defTask.length; i++) {
        defaultTaskItems += `
            <li class="section--box-item" id="task-${defTask[i].id}">
                <div class="check-icon-box">
                    <div class="check-icon-box--inner"></div>
                </div>
                <p class="section--box-item_value">${defTask[i].name}</p>
            </li>
        `
    }
    defaultUncompletedTasksBox.innerHTML = defaultTaskItems
}

// default completed tasks dropdown trigger
titleDropIcon.forEach(dropIcon => dropIcon.addEventListener("click", ()=> {
    let dIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="eva eva-chevron-down" fill="#3446ee"><g data-name="Layer 2"><g data-name="chevron-down"><rect width="24" height="24" opacity="0"></rect><path d="M12 15.5a1 1 0 0 1-.71-.29l-4-4a1 1 0 1 1 1.42-1.42L12 13.1l3.3-3.18a1 1 0 1 1 1.38 1.44l-4 3.86a1 1 0 0 1-.68.28z"></path></g></g></svg>`
    let uIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="eva eva-chevron-up" fill="#3446ee"><g data-name="Layer 2"><g data-name="chevron-up"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"></rect><path d="M16 14.5a1 1 0 0 1-.71-.29L12 10.9l-3.3 3.18a1 1 0 0 1-1.41 0 1 1 0 0 1 0-1.42l4-3.86a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.42 1 1 0 0 1-.69.28z"></path></g></g></svg>`

    if(dropIcon.firstElementChild.classList.contains("eva-chevron-up")) {
        dropIcon.innerHTML = dIcon
        dropDownOpen()

    } else if(dropIcon.firstElementChild.classList.contains("eva-chevron-down")) {
        dropIcon.innerHTML = uIcon
        dropDownClosed()
    }
}))

// shows defualt completed tasks
dropDownOpen = () => {
    // for(let i = 0; i < sectionBox.length; i++) {
        sectionBox[1].classList.add("drop-closed")
        sectionBox[1].classList.remove("drop-opened")
        setTimeout( () => {
            sectionBox[1].classList.add("d-none")
        }, 200)
    // }
}

// hides defualt completed tasks
dropDownClosed = () => {
    // for(let i = 0; i < sectionBox.length; i++) {
        sectionBox[1].classList.remove("drop-closed")
        sectionBox[1].classList.add("drop-opened")
        setTimeout( () => {
            sectionBox[1].classList.remove("d-none")
        }, 100)
    // }
}

// truncate group title
const gtStr = document.querySelectorAll(".group--item-details_name")
function truncateGroupTitle(str, num){
    if(str.length > num) {
        let subStr = str.substring(0, num)
        return subStr + "..."
    } else {
        return str
    }
}

gtStr.forEach(gStr => {
    gStr.innerText = truncateGroupTitle(gStr.innerText, 38)
});
