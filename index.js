const inputFieldEl = document.getElementById('input-field')
const addButtonEl = document.getElementById('add-button')
const clearButtonEl = document.getElementById('clear-button')
const shoppingListEl = document.getElementById('shopping-list')

getItemsFromLocalStorage()

let lastId = 0

addButtonEl.addEventListener('click', function () {
    let inputValue = inputFieldEl.value

    if (inputFieldEl.value !== "") {
        lastId++
        localStorage.setItem(lastId, inputValue)
    }

    getItemsFromLocalStorage()
    emptyInput()

    return lastId
})

clearButtonEl.addEventListener('click', function () {
    localStorage.clear()
    getItemsFromLocalStorage()
    return lastId = 0
})

function getItemsFromLocalStorage() {
    clearShoppingListEl()
    let items = Object.entries({ ...localStorage })
    console.log(items)
    for (let i = 0; i < items.length; i++) {
        addItem(items[i])
    }
}

function emptyInput() {
    inputFieldEl.value = ''
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function addItem(item) {
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