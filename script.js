// ============= Theme switcher ==========================
function switchTheme(){
    const themeImage = document.querySelector("#theme");
    themeImage.addEventListener("click", () => {
        if (themeImage.src == "http://127.0.0.1:5500/images/icon-moon.svg") {
            themeImage.src = "http://127.0.0.1:5500/images/icon-sun.svg";
            document.body.setAttribute("data-theme", "dark");
        }
        else {
            themeImage.src = "http://127.0.0.1:5500/images/icon-moon.svg";
            document.body.setAttribute("data-theme", "light");
        }
    })
}

// ================== riscar to-do completado ========================
function lineThrough() {
    const checkbox = document.querySelectorAll(".checkbox");
    checkbox.forEach(
        setCheckboxClickAction
    )
}

function setCheckboxClickAction(checkbox) {
    checkbox.addEventListener("click", () => {
        console.log(checkbox)
        const label = checkbox.nextElementSibling;
        label.classList.toggle("checkbox-checked");
        todos.forEach(element => {
            console.log(element.value)
            if (element.value == label.innerText) {
                checkbox.value = element.checked
                element.checked = !element.checked
            }
        })
        console.log(todos)
        saveToLocalStorage(todos)
    })
}
// ================= Local Storage ====================
function saveToLocalStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos))
}


function getTodosFromLocalStorage() {
    const reference = localStorage.getItem("todos");
    if (reference) {
        return JSON.parse(reference)
    }
    return []
}

// ================ Exibir no HTML ===============
function displayToDosFromLocalStorage() {
}

function addTodoInHTML(todoParams) {
    const toDoList = document.querySelector(".to-do-list");

    function shouldContainCheckedClass(isChecked) {
        if (isChecked) {
            return "checkbox-checked";
        }
        return '';
    }

    function shouldContainCheckedAtribute(isChecked){
        if (isChecked){
            return "checked"
        }
        return '';
    }

    const li = document.createElement('li');
    li.classList.add("item-container")
    toDoList.appendChild(li);

    li.innerHTML =
        `<div class="item">
        <span class="new-checkbox"></span>
        <input type="checkbox" id="checkbox-${numberOfToDos + 1}" class="checkbox" ${shouldContainCheckedAtribute(todoParams.checked)}>
        <label class=${shouldContainCheckedClass(todoParams.checked)}>${todoParams.value}</label>
    </div>
    <img src="images/icon-cross.svg" alt="delete" class="delete" id="delete-todo-${numberOfToDos +1}">`;
    const checkbox = document.querySelector(`#checkbox-${numberOfToDos + 1}`);
    const deleteImage = document.getElementById(`delete-todo-${numberOfToDos + 1}`)

    setCheckboxClickAction(checkbox)
    setNumberOfToDos()
    setDeleteClickAction(deleteImage)
}

// =============== Carregar dados armazenados no local storage =============
function loadStoredTodos() {
    todos = getTodosFromLocalStorage()
    todos.forEach(addTodoInHTML);
    dragAndDrop()
}

// ==================== adicionar novo to-do =========================
let todos = [];
function createNewToDoInput() {
    const newToDoInput = document.querySelector("#new-to-do");
    newToDoInput.addEventListener("keypress", (e) => {
        if (e.key === 'Enter') {
            let value = newToDoInput.value;
            const newTodo = { "value": value, "checked": false }
            todos.push(newTodo)
            addTodoInHTML(newTodo)
            saveToLocalStorage(todos)
            clearInput()

        }
    })
}

// =============== limpar a caixa de adicionar novo to-do ==================
function clearInput() {
    let newToDo = document.querySelector("#new-to-do");
    newToDo.value = ""
}

// ========================= excluir to-do =============================

function setDeleteClickAction(toDoDelete) {
        toDoDelete.addEventListener("click", () => {
             todos.forEach(item => {
                if (item.value == toDoDelete.previousElementSibling.lastElementChild.textContent ) {
                     const index = todos.indexOf(item)
                     todos.splice(index, 1);
                     saveToLocalStorage(todos);
                     toDoDelete.parentElement.remove();
                }
             })
            setNumberOfToDos()
        })
}

// limpar to-do's completados

function clearCompletedToDos() {
    const clear = document.querySelector(".clear-completed");

    clear.addEventListener("click", () => {
        const checked = document.querySelectorAll(".checkbox-checked"); // label
        checked.forEach(element => {
            todos.forEach(item => {
                if (element.textContent == item.value) {
                    const index = todos.indexOf(item);
                    todos.splice(index,1);
                    saveToLocalStorage(todos);
                }
            });
            element.parentNode.parentNode.remove()
            setNumberOfToDos()
        });
    });
}

// =========== exibição: filtros ===============
const completed = document.querySelector("#completed");
const all = document.querySelector("#all");
const active = document.querySelector("#active");

// ========= Completos ================
function getCompletedToDos() {
    completed.addEventListener("click", () => {
        let checked = document.querySelectorAll("li.item-container");
        checked.forEach(element => {
            if (element.classList.contains("display-none")) {
                element.classList.remove("display-none")
            }
        });
        const notChecked = document.querySelectorAll("label:not(.checkbox-checked)");
        notChecked.forEach(element => {
            element.parentNode.parentNode.classList.add("display-none")
        });

        if (all.classList.contains("color-blue")) {
            all.classList.remove("color-blue")
        }

        else if (active.classList.contains("color-blue")) {
            active.classList.remove("color-blue")
        }

        completed.classList.add("color-blue")
    })
}

// =========== Ativos =====================
function getActiveToDos() {
    active.addEventListener("click", () => {
        let checked = document.querySelectorAll(".checkbox-checked")
        checked.forEach(element => {
            element.parentNode.parentNode.classList.add("display-none")
            console.log(element)
        });

        if (all.classList.contains("color-blue")) {
            all.classList.remove("color-blue")
        }
        else if (completed.classList.contains("color-blue")) {
            completed.classList.remove("color-blue")
        }
        active.classList.add("color-blue")
    })
}

// ============== All ==============
function getAllToDos() {
    all.addEventListener("click", () => {
        const item = document.querySelectorAll(".item-container");
        console.log(item)
        item.forEach(element => {
            if (element.classList.contains("display-none")) {
                element.classList.remove("display-none")
            }
        });

        if (completed.classList.contains("color-blue")) {
            completed.classList.remove("color-blue")
        }

        else if (active.classList.contains("color-blue")) {
            active.classList.remove("color-blue")
        }

        all.classList.add("color-blue")
    })
}
// =========== exibir o numero de to-do's ativos =============
let numberOfToDos = 0

function setNumberOfToDos() {
    numberOfToDos = document.querySelectorAll(".item").length;
    const itemsLeft = document.querySelector("#items-left");
    itemsLeft.innerHTML = `${numberOfToDos} items left`;
}

// ============== reordenar lista com drag and drop ===================

function dragAndDrop() {

    let draggables = document.querySelectorAll("li.item-container");
    const dropContainer = document.querySelector(".to-do-list");
    let current = null;


    draggables.forEach(element => {
        element.setAttribute("draggable", "true");

        // ============== Drag Start ==============
        element.addEventListener("dragstart", () => {
            current = element;

            // Adiciona a classe drop nos elementos não arrastados
            draggables.forEach(draggable => {
                if (draggable != current) {
                    console.log("começou a arrastar");
                    draggable.classList.add("drop");
                }
            });
        })


        // ============ Drag Enter =================
        element.addEventListener("dragenter", () => {
            if (element != current) {
                element.classList.add("active")
            }
        })

        // ============ Drag Leave ==========
        element.addEventListener("dragleave", () => {
            element.classList.remove("active");
            console.log("active")
        })

        // =============== Drag End ===========
        element.addEventListener("dragend", () => {
            draggables.forEach(draggable => {
                draggable.classList.remove("drop");
                draggable.classList.remove("active");
            });
        })
        // =========== Drag Over ================
        element.addEventListener("dragover", (e) => {
            e.preventDefault();
            if (element != current) {
                let currentPosition = 0, droppedPosition = 0;
                draggables.forEach((draggable, index) => {
                    if (current == index) {
                        currentPosition = index;
                    }
                })
                if (currentPosition < droppedPosition) {
                    element.parentNode.insertBefore(current, element.nextSibling)
                }
                else {
                    element.parentNode.insertBefore(current, element)
                }
            }
        })
    })

    // ============= Posição do elemento soltado ===============

    function getDragAfterElement(y) {
        const draggableElements = [...dropContainer.querySelectorAll("[draggable='true']:not(.dragging)")]; // Seleciona todos os elementos arrastáveis menos o que estamos arrastando
        console.log(draggableElements);
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            }
            else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element
    }
}


createNewToDoInput()
lineThrough()
setNumberOfToDos()
clearCompletedToDos()
getCompletedToDos()
getActiveToDos()
getAllToDos()
dragAndDrop()
loadStoredTodos()
switchTheme()
