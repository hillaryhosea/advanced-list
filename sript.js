// const listContainer = document.querySelector('[data-lists]');
// const newListForm = document.querySelector('[data-new-list-form]');
// const newListInput = document.querySelector('[data-new-input]');

// const LOCAL_STORAGE_LIST_KEY = "task.lists"
// const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "selctedListId"
// let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY  )) || [];
// let selctedListId = localStorage.getItem()

// listContainer.addEventListener("click", e =>{
//     if (e.target.tagName.toLowerCase() === "li"){
//         selctedListId = e.target.dataset.listId
//         saveAndRender()
//     }
// })

// newListForm.addEventListener("submit", e => {
//     e.preventDefault();
//     const listName = newListInput.value.trim();
//     if (!listName) return;
//     const newList = createList(listName);
//     lists.push(newList);
//     newListInput.value = "";
//     saveAndRender()
// });

// function createList (name) {
//     return { id: Date.now().toString(), name: name, tasks: [] };
// }

// function saveAndRender (){
//     save()
//     render()
// }

// function save (){
//     localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
//     localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selctedListId)
// }

// function render() {
//     clearElement(listContainer);
//     lists.forEach(list => {
//         const listElement = document.createElement("li");
//         listElement.dataset.listId = list.id;
//         listElement.classList.add("list-name");
//         listElement.innerText = list.name;
//         if(list.id === selctedListId){
//             listElement.classList.add("active-list")
//         }
//         listContainer.appendChild(listElement);
//     });
// }

// function clearElement(element) {
//     while (element.firstChild) {
//         element.removeChild(element.firstChild);
//     }
// }

// render();
// Select relevant HTML elements


const listContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-input]');
const deleteListBtn = document.querySelector('[data-delete-btn]');

const listTitleDisplay = document.querySelector('[data-list-display]')
const ListTitle = document.querySelector('[data-list-title]')
const ListCount = document.querySelector('[data-list-count]')
const taskContainer = document.querySelector('[data-tasks]')
const taskTemplate = document.getElementById ('task-template')

const  newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input]')
const clearCompletedTaskBtn = document.querySelector('[data-clear-complete-task-btn]')

// Local storage keys
const LOCAL_STORAGE_LIST_KEY = "task.lists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "selectedListId";

// Initialize lists from local storage or create an empty array
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY) || "";

// Event listener for clicking on list items
listContainer.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "li") {
        selectedListId = e.target.dataset.listId;
        saveAndRender();
    }
});

taskContainer.addEventListener('click', e => {
     if ( e.target.tagName.toLowerCase() === 'input'){
        const selectedList = lists.find(list => list.id ===  selectedListId)
        const selectedTask = selectedList.tasks.find(task => task.id ===  e.target.id)
        selectedTask.complete = e.target.checked
        save()
        renderTaskCount(selectedList)
     }
})


clearCompletedTaskBtn.addEventListener('click', e => {
    const selectedList = lists.find(list => list.id === selectedListId)
    selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
    saveAndRender()
})

//event listener for deleting the item

deleteListBtn.addEventListener("click", e => {
    lists = lists.filter( list => list.id !== selectedListId)
    selectedListId = null 
    saveAndRender ()
})

// Event listener for form submission
newListForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const listName = newListInput.value.trim();
    if (!listName) return;
    const newList = createList(listName);
    lists.push(newList);
    newListInput.value = "";
    saveAndRender();
});

newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskName = newTaskInput.value.trim();
    if (!taskName) return;
    const newTask = createList(taskName);
    newTaskInput.value = "";
    const selectedList = lists.find(list => list.id === selectedListId)
    selectedList.tasks.push(newTask)
    saveAndRender();
});

// Create a new list object
function createList(name) {
    return { id: Date.now().toString(), name: name, tasks: [] };
}

function createTask(name) {
    return { id: Date.now().toString(), name: name, complete:false };
}

// Save lists and selected list ID to local storage
function saveAndRender() {
    save();
    render();
}

// Save data to local storage
function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

// Render the list items
function render() {
    clearElement(listContainer);
   renderList()

   const selectedList = lists.find(list => list.id === selectedListId)

   if (selectedListId == null){
        listTitleDisplay.style.display = 'none'
   } else{
        listTitleDisplay.style.display = ''
        ListTitle.innerText = selectedList.name
        renderTaskCount(selectedList)
        clearElement(taskContainer)
        renderTasks(selectedList)
   }
}

function renderTasks (selectedList){
 selectedList.tasks.forEach(task => {
    const taskElement = document.importNode(taskTemplate.content, true )
    const checkbox = taskElement.querySelector('input')
    checkbox.id = task.id
    checkbox.checked = task.complete
    const label = taskElement.querySelector('label')
    label.htmlFor = task.id
    label.append(task.name)
    taskContainer.appendChild(taskElement)
 })
}

function renderTaskCount (selectedList) {
     const incompleteTasks = selectedList.tasks.filter(task => !task.complete).length
     const taskString = incompleteTasks === 1 ? "task" :  "tasks"
     ListCount.innerText = `${incompleteTasks} ${taskString} remaining`
}

function renderList () {
    lists.forEach((list) => {
        const listElement = document.createElement("li");
        listElement.dataset.listId = list.id;
        listElement.classList.add("list-name");
        listElement.innerText = list.name;
        if (list.id === selectedListId) {
            listElement.classList.add("active-list");
        }
        listContainer.appendChild(listElement);
    });
}

// Clear child elements of a given element
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

// Initial rendering
render();
