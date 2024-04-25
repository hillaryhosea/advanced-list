const listContainer = document.querySelector("[data-lists]")
const newListForm = document.querySelector("[data-new-list-form]")
const  newListInput = document.querySelector("[data-new-input]")

 
let lists =[];

newListForm.addEventListener("submit", e=>{
    e.preventDefault()
    const listName = newListInput.Valuealue
    if(listName == null || listName == "") return
    const list = createList(listName)
    newListInput.Value = null
    lists.push(list)
    render()
})

function createList(name){
    return{id: Date.now().toString(), name:name, task:[]}
}

function render (){
    clearElement(listContainer);
    lists.forEach(list =>{
        const listElement = document.createElement("li");
        listElement.dataset.listtId = list.id
        listElement.classList.add("list-name");
        listElement.innerText = list.name
        listContainer.appendChild(listElement)
    });
}

function clearElement (element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
};

render()