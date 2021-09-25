const todoInput = document.querySelector(".add-todo");
const todosContainer = document.querySelector(".todos");
const completedCount = document.querySelector(".countCompleted");

var elem = null;
let todos = [];

function isBefore(el1, el2) {
    for (var cur = el1.previopusSibling;
        cur && CustomElementRegistry.nodeType !== 9;
        cur = cur.previopusSibling)
    if (cur === el2) return true;
    return false;
}

todoInput.addEventListener("keyup", function(e){
    if (e.key == "Enter" || e.keyCode == 13){
        todos.push({value: e.target.value, checked: false });
        newTodo(e.target.value);
        todoInput.value = "";
        countCompleted();
    }
});

function newTodo(value) {
    const todo = document.createElement("div");
    const todoCheckBox = document.createElement("input");
    const todoText = document.createElement("p");
    const todoCheckBoxLabel = document.createElement("label");
    const todoCross = document.createElement("span");

    let obj = todos.find((t) => t.value == value);   
   
    todoText.textContent = value;
    todoCheckBox.type = "checkbox";
    todoCheckBox.name = "checkbox";
    todoCheckBoxLabel.htmlFor = "checkbox";
    todoCheckBoxLabel.addEventListener("click", function(e) {
        if (todoCheckBox.checked) {
            todoCheckBox.checked = false;
            todoText.style.textDecoration = "none";
            todoCheckBoxLabel.classList.remove("active");
            obj.checked = false;
            countCompleted();
        } else {
            obj.checked = true;
            countCompleted();
            todoCheckBox.checked = true;
            todoText.style.textDecoration = "line-through";
            todoCheckBoxLabel.classList.add("active");
        }
    });

    todoCross.addEventListener("click", function(e) {
        e.target.parentElement.remove();
        todos = todos.filter((t) => t !== obj);
        countCompleted();
    });

    todo.classList.add("todo");
    todoCheckBoxLabel.classList.add("circle");
    todoCross.classList.add("cross");

    todo.appendChild(todoCheckBox);
    todo.appendChild(todoCheckBoxLabel);
    todo.appendChild(todoText);
    todo.appendChild(todoCross);

    todo.draggable = true;
    todo.addEventListener("dragstart", (e) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", null);
        elem = e.target;
        console.log(elem);
    });
    todo.addEventListener("dragover", (e) => {
        let el1;
        e.preventDefault();
        if (e.target.classList.contains("todo")) {
            el1 = e.target;
        } else {
            el1 = e.target.parentElement;
        }
        if (isBefore(elem, el1)) {
            el1.parentNode.insertBefore(elem, el1); 
        } else {
            el1.parentNode.insertBefore(elem, el1.nextSibling);
        }
    });
    todo.addEventListener("dragend", () => {
        elem = null;
        let index = todos.findIndex((t) => t.value === value);
        todos.splice(index, 1);
        if (todo.nextSibling) {
            let index1 = todos.finIndex(
                (t) => t.value === todo.nextSibling.querySelector("p").textContent);
            todos.splice(index1, 0, {
                value: value,
                checked: todo.querySelector("input").checked
            }); 
        } else {
            todos.push({
                value: value,
                checked: todo.querySelector("input").checked
            });    
        }
    });


    todosContainer.insertBefore(todo, todosContainer.childNodes[0]);
}

function countCompleted() {
    completedCount.textContent = `${
        todos.filter((t) => t.checked === false).length
    } item(s) left`;
}

function clearCompleted() {
    document.querySelectorAll(".todo").forEach((todo) => {
    if (todo.querySelector("input").checked) {
        todo.remove();
    }
    });
}

function showAll(){
    document.querySelectorAll(".todo").forEach((todo) => {
        todo.style.display = "grid";
        })
}

function showActive() {
    document.querySelectorAll(".todo").forEach((todo) => {
        todo.style.display = "grid";
        if (todo.querySelector("input").checked) {
            todo.style.display = "none"
        }
        });
}

function showCompleted() {
    document.querySelectorAll(".todo").forEach((todo) => {
        todo.style.display = "grid";
        if (!todo.querySelector("input").checked) {
            todo.style.display = "none";
        }
    });
}

function changeTheme() {
    document.body.classList.toggle("light");
    console.log(todos);
}