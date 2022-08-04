//array that holds todo list items
let listItems = [];


//Function will create a new list item based on whatever the input value
//was entered in the text input
function addItem (text) {
    const todo = {
        text,              //whatever user types in
        checked: false,   //boolean which lets us know if a task been marked complete
        id: Date.now(),    //unique identifier for item
    };
//it is then pushed onto the listItems array
    listItems.push(todo);
    renderTodo(todo);
}


function checkDone(key) {
    //findIndex is an array method that returns position of an element in array
    const index = listItems.findIndex(item => item.id === Number(key));
    //locates the todo item in the listItems array and set its checked property
    //to opposite. 'true' will become 'false'
    listItems[index].checked = !listItems[index].checked;
    renderTodo(listItems[index]);
}

function deleteTodo(key) {
    //find todo object in the listItems array
    const index = listItems.findIndex(item => item.id === Number(key));
    //create a new object with properties of the current list item
    //delete property set to true
    const todo = {
        deleted: true,
        ...listItems[index]
    };

    //remove the list item from the array by filtering it out
    listItems = listItems.filter(item => item.id !== Number(key));
    renderTodo(todo);
}

//edits list item
function editTodo(key) {
    //find todo object in the listItems array
    const index = listItems.findIndex(item => item.id === Number(key)); 
}


//selects form element
const form = document.querySelector('.js-form');
const addGoal = document.getElementById('addBtn');
//adds a submit event listener
    function selectForm(event) {

    //prevent page refresh on form submission
    event.preventDefault();
    //select the text input
    const input = document.querySelector('.js-todo-input');
    //gets value of the input and removes whitespace beginning/end of string
    //we then save that to new variable -> text
    const text = input.value.trim();
    //checks whether 2 operands are not equal, returning true or false (boolean)
    //if input value is not equal to blank, add user input
    if (text !== '') {
        addItem(text);
        input.value = '';    //value of text input is cleared by setting it to empty
        input.focus();       //focused so user can add many items to list witout focusing the input
    }

};

addGoal.addEventListener('click', selectForm, false);
form.addEventListener('submit', selectForm, false);


function renderTodo(todo) {
    //saves local storage items, convert listItems array to JSON string
    localStorage.setItem('listItemsRef', JSON.stringify(listItems));
    //selects the first element with a class of 'js-to'list'
    const list = document.querySelector('.js-todo-list');
    //selects current todo (refer to top) list item in DOM
    const item = document.querySelector(`[data-key='${todo.id}']`);

    //refer to function deleteTodo(key)
    if (todo.deleted) {
        //remove item from DOM
        item.remove();
        return
    }

    //use the ternary operator to check if 'todo.checked' is true
    //if true, assigns 'done' to checkMarked. if not, assigns empty string
    const checkMarked = todo.checked ? 'done' : '';
    //creates list 'li' item and assigns it to 'goal'
    const goal = document.createElement('li');
    //sets the class attribute
    goal.setAttribute('class', `todo-item ${checkMarked}`);
    //sets the data-key attribute to the id of the todo
    goal.setAttribute('data-key', todo.id);
    //sets the contents of the list item 'li'
    goal.innerHTML = `
    <input id="${todo.id}" type="checkbox" />
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="edit-todo js-edit-todo"><i class="fa-solid fa-pencil"></i></button>
    <button class="delete-todo js-delete-todo">X</button>
    `;

    //if item already exists in the DOM
    if (item) {
        //replace it
        list.replaceChild(goal, item);
    }else {
        //otherwise if it doesnt (new list items) add at the end of the list
    list.append(goal);
    }
}



    //selects entire list
    const list = document.querySelector('.js-todo-list');
    //adds click event listener to the list and its children
    list.addEventListener('click', event => {
        if (event.target.classList.contains('js-tick')) {
            const itemKey = event.target.parentElement.dataset.key;
            checkDone(itemKey);
        }

        //add this 'if block
        if (event.target.classList.contains('js-delete-todo')) {
            const itemKey = event.target.parentElement.dataset.key;
            deleteTodo(itemKey);
        }
        //user clicks on edit button, the 'contenteditable' is toggled true/false on the span
        //that sits right before the button
            //matches method -> tests whether the element would be selected by specified css selector
        if (event.target.matches('.edit-todo') && event.target !== event.currentTarget) {
            const text = event.target.previousElementSibling;  //returns element immediately prior, EX -> input span
            text.toggleAttribute('contenteditable');
            if (text.contenteditable) {
                text.focus();
            }
        }
    })
  

/*
document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('listItemsRef');
    if (ref) {
        listItems = JSON.parse(ref);
        listItems.forEach(t => {
            renderTodo(t);
        });
    }
});*/