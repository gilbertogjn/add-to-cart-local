const inputFieldEl = document.getElementById('input-field')
const addButtonEl = document.getElementById('add-button')
const clearBgEl = document.getElementById('bg-clear-popup')
const clearYesEl = document.getElementById('clear-yes')
const clearNoEl = document.getElementById('clear-no')
const clearButtonEl = document.getElementById('clear-button')
const clearPopupEl = document.getElementById('bg-clear-popup')
const shoppingListEl = document.getElementById('shopping-list')
const logoEl = document.getElementById('logo')

document.addEventListener("DOMContentLoaded", function(event) {
    getItemsFromLocalStorage()
})

addButtonEl.addEventListener('click', addItemOnLocalStorage)
inputFieldEl.addEventListener('keypress', function handleKeyPress(event) {
    if (event.key === 'Enter') {
        addItemOnLocalStorage()
    }
})

function addItemOnLocalStorage() {
    let inputValue = inputFieldEl.value
    let id = nextId()

    if (inputFieldEl.value !== "") {
        localStorage.setItem(id, inputValue)
        let itemArray = [id, inputValue]
        addItemEl(itemArray)
    }

    emptyInput()
}

clearButtonEl.addEventListener('click', function() {
    clearPopupEl.classList.add('show')
})

clearYesEl.addEventListener('click', function () {
    localStorage.clear()
    getItemsFromLocalStorage()
    clearPopupEl.classList.add('remove')
    setTimeout(() => {
        clearPopupEl.classList.remove('remove')
        clearPopupEl.classList.remove('show')
    }, 200)
})

clearNoEl.addEventListener('click', function() {
    clearPopupEl.classList.add('remove')
    setTimeout(() => {
        clearPopupEl.classList.remove('remove')
        clearPopupEl.classList.remove('show')
    }, 200)
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
    let id = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement('li')
    newEl.textContent = itemValue

    let list = []
    for(let i = 0; i < shoppingListEl.children.length; i++) {
        list.push(shoppingListEl.children[i].textContent)
    }
    
    console.log('lista ' + list)

    if(list.includes(itemValue) == false) {
        shoppingListEl.append(newEl)
    }

    //Passa o elemento e o id para a função removeItem
    removeItem(newEl, id)
}

function removeItem(itemEl, itemID) {
    itemEl.addEventListener("click", function () {
        localStorage.removeItem(itemID)
        itemEl.classList.add('remove-item')
        setInterval(() => { itemEl.remove() } , 200)
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

inputFieldEl.addEventListener('focus', function () {
    logoEl.classList.add('animate-logo')
})

inputFieldEl.addEventListener('blur', function () {
    logoEl.classList.remove('animate-logo')
})



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