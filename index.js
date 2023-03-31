const inputFieldEl = document.getElementById('input-field')
const addButtonEl = document.getElementById('add-button')
const clearButtonEl = document.getElementById('clear-button')
const shoppingListEl = document.getElementById('shopping-list')

getItemsFromLocalStorage()

addButtonEl.addEventListener('click', addItemOnLocalStorage)
inputFieldEl.addEventListener('keypress', function handleKeyPress(event) {
    if(event.key === 'Enter') {
        addItemOnLocalStorage()
    }
})


function addItemOnLocalStorage() {
    let inputValue = inputFieldEl.value
    let Id = createGuid()

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
    sortArray(items)
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

function createGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


function sortArray(array) {
    array.sort(function (a, b) {
        const valueA = a[1].toLowerCase()
        const valueB = b[1].toLowerCase()
        if (valueA < valueB) {
            return -1
        }
        if (valueA > valueB) {
            return 1
        }
        return 0
    })
    console.log(array)
    return array
}