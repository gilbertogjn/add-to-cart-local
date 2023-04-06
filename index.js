const inputFieldEl = document.getElementById('input-field')
const addButtonEl = document.getElementById('add-button')
const clearButtonEl = document.getElementById('clear-button')
const shoppingListEl = document.getElementById('shopping-list')

getItemsFromLocalStorage()

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
}

clearButtonEl.addEventListener('click', function () {
    localStorage.clear()
    getItemsFromLocalStorage()
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
        localStorage.removeItem(itemID)
        getItemsFromLocalStorage()
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