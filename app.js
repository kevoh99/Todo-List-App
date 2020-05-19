// Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)

// Functions
function addTodo (event) {
  // Prevent form from submitting
  event.preventDefault()

  // Add Todo to localStorage
  saveLocalTodos(todoInput.value)

  // Todo DIV
  const todoDiv = document.createElement('div')
  todoDiv.classList.add('todo')

  // Create li
  const newTodo = document.createElement('li')
  newTodo.classList.add('todo-item')
  newTodo.innerText = todoInput.value // Here is an opportunity to check for empty input
  todoDiv.appendChild(newTodo)

  // Checkmark button (for completed todo)
  const completedButton = document.createElement('button')
  completedButton.classList.add('complete-btn')
  completedButton.innerHTML = '<i class="fas fa-check"></i>'
  todoDiv.appendChild(completedButton)

  // Trash button
  const trashButton = document.createElement('button')
  trashButton.classList.add('trash-btn')
  trashButton.innerHTML = '<i class="fas fa-trash"></i>'
  todoDiv.appendChild(trashButton)

  // Append div to unordered list
  todoList.appendChild(todoDiv)

  // Clear Todo Input value, and thus clear the input field
  todoInput.value = ''
}

function deleteCheck (e) {
  const item = e.target

  // Delete TODO
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement

    // Transition
    todo.classList.add('fall')

    // Remove from localStorage
    removeLocalTodos(todo)

    // Remove from todo list items after completion of transition
    todo.addEventListener('transitionend', function () {
      todo.remove()
    })
  }

  // Mark TODO as completed
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement
    todo.classList.toggle('completed')

    // Add or remove the list item from todosComplete array in localStorage
    let todosComplete
    if (window.localStorage.getItem('todosComplete') === null) {
      todosComplete = []
    } else {
      todosComplete = JSON.parse(window.localStorage.getItem('todosComplete'))
    }

    // Check what the effect of toggle above was
    if (todo.classList.contains('completed')) {
      // Push to todoscomplete array
      todosComplete.push(todo.childNodes[0].innerText)

      // Push the array values to localStorage
      window.localStorage.setItem('todosComplete', JSON.stringify(todosComplete))
    } else {
      // If it doesn't contain .completed class (due to toggle effect), splice it out
      todosComplete.splice((todosComplete.indexOf(todo.childNodes[0].innerText)), 1)

      // Push the array values to localStorage
      window.localStorage.setItem('todosComplete', JSON.stringify(todosComplete))
    }
  }
}

function filterTodo (e) {
  const todos = todoList.childNodes
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex' // What we have in css. could as well be "block"
        break
      case 'completed':
        if (todo.classList.contains('completed')) { // .indexOf can be used in the place of .contains as well
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break
    }
  })
}

function saveLocalTodos (todo) {
  let todos

  // Check if you already have todos
  if (window.localStorage.getItem('todos') === null) {
    todos = []
  } else {
    // Copy items in localstorage into todos array
    todos = JSON.parse(window.localStorage.getItem('todos'))
  }

  todos.push(todo) //  Add the input button value to the array
  console.log(todos)

  // Push the array values to localStorage
  window.localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos () {
  // Check if you already have todos
  let todos

  console.log(window.localStorage.getItem('todos'))

  if (window.localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(window.localStorage.getItem('todos'))
  }

  todos.forEach(function (todo) {
    // Todo DIV
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    // Create li
    const newTodo = document.createElement('li')
    newTodo.classList.add('todo-item')
    newTodo.innerText = todo
    todoDiv.appendChild(newTodo)

    // Check mark button (for completed todo)
    const completedButton = document.createElement('button')
    completedButton.classList.add('complete-btn')
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    todoDiv.appendChild(completedButton)

    // Trash button
    const trashButton = document.createElement('button')
    trashButton.classList.add('trash-btn')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    todoDiv.appendChild(trashButton)

    // Append div to unordered list
    todoList.appendChild(todoDiv)
  })
}

function removeLocalTodos (todo) {
  // Check if you already have todos in localStorage
  let todos

  console.log(window.localStorage.getItem('todos'))
  if (window.localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(window.localStorage.getItem('todos'))
  }

  console.log(todo.children[0].innerText)
  const todoIndex = todo.children[0].innerText
  todos.splice(todos.indexOf(todoIndex), 1)

  // Push back to localStorage
  window.localStorage.setItem('todos', JSON.stringify(todos))
}
