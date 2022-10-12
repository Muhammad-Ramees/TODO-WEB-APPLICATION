//Selecting Elements
// document.addEventListener('load', () => {
//     
// })
window.onload = function () {
    getTodo();
    console.log("logged in");
    getCompletedTasks();
    getTrashList();
};
let TodoInput = document.querySelector('.to-inp');

let TodoButton = document.querySelector('.to-btn');

let TodoList = document.querySelector('.todo-list');

let ComList = document.querySelector('.todo-completed-list')

let btnComplete = document.querySelector('.btn-complete')

let moveToTrash = document.querySelector('.trash-list')

//Adding event listener
TodoButton.addEventListener('click', addTo);



//Add function
function addTo(e) {
    // Create Todo list div
    const todoDiv = document.createElement('div');

    //stop refreshing
    e.preventDefault();



    //Todo li  div
    todoDiv.classList.add('todo')

    // Create Todo Li
    const toLi = document.createElement('li');
    toLi.classList.add('todoItems');

    toLi.innerHTML = TodoInput.value;

    //Appending 
    todoDiv.appendChild(toLi)
    TodoList.appendChild(todoDiv)

    //pass to local storage
    todoStorage(TodoInput.value)

    //Complete Button
    const completeBtn = document.createElement('button')
    e.preventDefault();
    completeBtn.classList.add('btn-complete')
    completeBtn.innerText = "com"
    todoDiv.appendChild(completeBtn)
    TodoList.appendChild(todoDiv)

    //Trash Button

    const trashBtn = document.createElement('button')
    trashBtn.classList.add('deleteBtn')
    trashBtn.innerText = "del"
    todoDiv.appendChild(trashBtn)
    TodoList.appendChild(todoDiv)
}

//Add to storage
function todoStorage(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [todo]
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
        todos.push(todo);
    }

    localStorage.setItem('todos', JSON.stringify(todos))



}

//get data from storage
function getTodo() {
    console.log("Entered to get task======================");
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo) {
        // Create Todo list div

        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')


        // Create Todo li
        const toLi = document.createElement('li');
        toLi.classList.add('todoItems')
        toLi.innerText = todo

        //Appending  
        todoDiv.appendChild(toLi)
        TodoList.appendChild(todoDiv)

        //Complete Button
        const completeBtn = document.createElement('button')
        completeBtn.classList.add('btn-complete')
        completeBtn.innerText = "com"
        completeBtn.onclick = (e) => getCompletedTask(e);
        todoDiv.appendChild(completeBtn)
        TodoList.appendChild(todoDiv)

        //Trash
        const trashBtn = document.createElement('button')
        trashBtn.classList.add('move-to-btn')
        trashBtn.innerText = "del"
        trashBtn.onclick = (e) => taskMoveTo(e);
        todoDiv.appendChild(trashBtn)
        TodoList.appendChild(todoDiv)
    })


}
//Move to trash from task box
function taskMoveTo(e) {
    const item = e.target

    if (item.classList[0] === 'move-to-btn') {
        const Todo = item.parentElement
        let todoValue = Todo.firstElementChild
        todoValue = todoValue.innerText

        console.log(todoValue);
        key = 2;
        moveToTrashBox(todoValue, key)
        Todo.remove()

    }
}

//moving from task section to completed task
function getCompletedTask(e) {
    const item = e.target

    if (item.classList[0] === 'btn-complete') {
        const Todo = item.parentElement
        let todoValue = Todo.firstElementChild
        todoValue = todoValue.innerText


        completedTask(todoValue)
        Todo.remove()

    }


}

//get completed tasks when load page
function getCompletedTasks() {

    console.log("Entered to completed  task======================");


    let comTodos;

    comTodos = JSON.parse(localStorage.getItem('todosCompleted'));


    comTodos.forEach(function (comTodo) {
        // Create Todo list div

        const comtodoDiv = document.createElement('div')
        comtodoDiv.classList.add('com-todo')


        // Create Todo li
        const comtoLi = document.createElement('li');
        comtoLi.classList.add('comtodoItems')
        comtoLi.innerText = comTodo

        //Appending  
        comtodoDiv.appendChild(comtoLi)
        ComList.appendChild(comtodoDiv)



        //Move to trash
        const moveBtn = document.createElement('button')
        moveBtn.classList.add('moveToTrashBtn')
        moveBtn.innerText = "del"
        moveBtn.onclick = (e) => comMoveTo(e);
        comtodoDiv.appendChild(moveBtn)
        ComList.appendChild(comtodoDiv)
    })
}

function completedTask(value) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    let todoCompleted = todos

    todos = todos.filter(function (str) { return str !== value; });
    todoValue = todoCompleted.filter(function (str) { return str == value });
    console.log(todos);
    console.log(todoValue);
    if (localStorage.getItem('todosCompleted') === null) {
        todoCompleted = todoValue
    } else {
        todoCompleted = JSON.parse(localStorage.getItem('todosCompleted'));
        todoCompleted = todoCompleted.concat(todoValue)
    }


    localStorage.setItem('todos', JSON.stringify(todos))
    localStorage.setItem('todosCompleted', JSON.stringify(todoCompleted))

}
//Move to trash todo item
function comMoveTo(e) {
    const item = e.target

    if (item.classList[0] === 'moveToTrashBtn') {
        const Todo = item.parentElement
        let todoValue = Todo.firstElementChild
        todoValue = todoValue.innerText

        console.log(todoValue);
        let key = 1;

        moveToTrashBox(todoValue, key)
        Todo.remove()

    }

}

function moveToTrashBox(value, key) {
    let todoCompleted;
    let todoTrash;
    if (key == 1) {
        if (localStorage.getItem('todosCompleted') === null) {
            todoCompleted = []
        } else {
            todoCompleted = JSON.parse(localStorage.getItem('todosCompleted'));
        }
    } else if (key == 2) {
        if (localStorage.getItem('todos') === null) {
            todos = []
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
    }
    if (key == 1) {
        todoTrash = todoCompleted
        todoCompleted = todoCompleted.filter(function (str) { return str !== value; });
        todoValue = todoTrash.filter(function (str) { return str == value });
        console.log(todoCompleted);
        console.log(todoValue);
        if (localStorage.getItem('todosTrash') === null) {
            todoTrash = todoValue
        } else {
            todoTrash = JSON.parse(localStorage.getItem('todosTrash'));
            todoTrash = todoTrash.concat(todoValue)
        }


        localStorage.setItem('todosCompleted', JSON.stringify(todoCompleted))
        localStorage.setItem('todosTrash', JSON.stringify(todoTrash))

    } else if (key == 2) {
        todoTrash = todos
        todos = todos.filter(function (str) { return str !== value; });
        todoValue = todoTrash.filter(function (str) { return str == value });
        console.log(todos);
        console.log(todoValue);
        if (localStorage.getItem('todosTrash') === null) {
            todoTrash = todoValue
        } else {
            todoTrash = JSON.parse(localStorage.getItem('todosTrash'));
            todoTrash = todoTrash.concat(todoValue)
        }


        localStorage.setItem('todos', JSON.stringify(todos))
        localStorage.setItem('todosTrash', JSON.stringify(todoTrash))


    }


}

function getTrashList() {
    console.log("Entered to TRash  task======================");


    let trashTodos;

    trashTodos = JSON.parse(localStorage.getItem('todosTrash'));


    trashTodos.forEach(function (trashTodos) {
        // Create Todo list div

        const trashtodoDiv = document.createElement('div')
        trashtodoDiv.classList.add('trash-todo')


        // Create Todo li
        const trashtoLi = document.createElement('li');
        trashtoLi.classList.add('trashtodoItems')
        trashtoLi.innerText = trashTodos

        //Appending  
        trashtodoDiv.appendChild(trashtoLi)
        moveToTrash.appendChild(trashtodoDiv)



        //Move to trash
        const moveBtn = document.createElement('button')
        moveBtn.classList.add('deleteBtn')
        moveBtn.innerText = "del"
        moveBtn.onclick = (e) => del(e);
        trashtodoDiv.appendChild(moveBtn)
        moveToTrash.appendChild(trashtodoDiv)
    })
}


//delete todo item
function del(e) {
    const item = e.target

    if (item.classList[0] === 'deleteBtn') {
        const Todo = item.parentElement
        let todoValue = Todo.firstElementChild
        todoValue = todoValue.innerText

        console.log(todoValue);

        removeLocal(todoValue)
        Todo.remove()

    }

}

function removeLocal(value) {
    let todos;
    if (localStorage.getItem('todosTrash') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todosTrash'));
    }
    console.log(todos);

    todos = todos.filter(function (str) { return str !== value; });
    console.log(todos);
    localStorage.setItem('todosTrash', JSON.stringify(todos))
}