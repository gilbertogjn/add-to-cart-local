const inputFieldEl = document.getElementById('input-field')
const addButtonEl = document.getElementById('add-button')
const clearButtonEl = document.getElementById('clear-button')
const shoppingListEl = document.getElementById('shopping-list')
const logoEl = document.getElementById('logo')

getItemsFromLocalStorage()
animateLogo()

addButtonEl.addEventListener('click', addItemOnLocalStorage)
inputFieldEl.addEventListener('keypress', function handleKeyPress(event) {
    if (event.key === 'Enter') {
        addItemOnLocalStorage()
    }
})

function addItemOnLocalStorage() {
    let inputValue = inputFieldEl.value
    let Id = nextId()

    if (inputFieldEl.value !== "") {
        localStorage.setItem(Id, inputValue)
    }

    getItemsFromLocalStorage()
    emptyInput()
    animateLogo()
}

clearButtonEl.addEventListener('click', function () {
    localStorage.clear()
    getItemsFromLocalStorage()
    animateLogo()
})

function getItemsFromLocalStorage() {
    clearShoppingListEl()
    let items = Object.entries({ ...localStorage })
    console.log(items)
    for (let i = 0; i < items.length; i++) {
        addItemEl(items[i])
    }
}

function emptyInput() {
    inputFieldEl.value = ''
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function addItemEl(item) {
    const itemID = item[0]
    const itemValue = item[1]

    let newEl = document.createElement('li')
    newEl.textContent = itemValue
    shoppingListEl.append(newEl)
    removeItem(newEl, itemID)
}

function removeItem(itemEl, itemID) {
    itemEl.addEventListener("click", function () {
        if (localStorage.length == 1) {
            localStorage.removeItem(itemID)
            getItemsFromLocalStorage()
            animateLogo()
        } else {
            localStorage.removeItem(itemID)
            getItemsFromLocalStorage()
        }
    })
}

let lastId = 0

function nextId() {
    lastId++
    return lastId
}

window.onload = function () {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/service-worker.js")
    }
}

function animateLogo() {
    let items = Object.entries({ ...localStorage })
    if (items.length != 0) {
        logoEl.classList.add('animate-logo')
    } else {
        logoEl.classList.remove('animate-logo')
    }
}

/*
//Install PWA Prompt
let deferredPrompt
let setupButton

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    console.log("beforeinstallprompt fired")
    if (setupButton == undefined) {
        setupButton = document.getElementById("install-button")
    }
    setupButton.style.display = "inline"
    setupButton.disabled = false
})

function installApp() {
    deferredPrompt.prompt()
    setupButton.disabled = true
    deferredPrompt.userChoice
        .then((choiceResult) => {
            if(choiceResult.outcome === 'accepted') {
                console.log('PWA setup accepted')
                setupButton.style.display = 'none'
            } else {
                console.log('PWA setup rejected')
            }
            deferredPrompt = null
        })
}
*/