import { getIndexFromArticleElement, getListObjectAndIndexOfTaskElement, greatGrandParent, grandParent } from "./index-manager.js";
import { getToDoLists } from "./todolist.js";

 export function fillNotesSection (toDoList) {
    let html="";
    toDoList.map((element) => {
        html += fillArticle(element);
    })
    const sectionElement = document.querySelector("section.notes");
    sectionElement.innerHTML = html
}

export function fillArticle(toDo) {
    return `<article class="collapsed ${toDo.category}">
                ${fillInnerArticle(toDo)}
            </article>`;
}

export function fillInnerArticle(toDo) {
    return `<div class="header-element">
                <h3>${toDo.title}</h3>
                <div class= "bloc-options">
                    <div class= "dropbtn">
                        <img  src="assets/options.png" alt="Bouton options" class="options-button">
                    </div>
                    <div class="dropdown-content">
                        <ul>
                            <li class="option">créer une catégorie</li>
                            <li class="option">modifier le contenu</li>
                            <li class="option">supprimer la liste</li>
                            <li class="option">ajouter une tâche</li>
                        </ul>
                    </div>
                </div>
            </div>
            <ul>${fillElements(toDo.elements)}
            </ul>`;
}

function fillElements (elements) {
    let liElementsString = "";
    for( const element of elements) {
        liElementsString += `<li>
                        <img src="${element.checked ? "./assets/checkbox-filled.svg" : "./assets/checkbox-empty.svg"}" alt="checkbox-empty" class="checkbox">
                        <span${element.checked ? " class=\"checked\"" : ""}>${element.name}</span>
                    </li>`
    }
    return liElementsString ;
}

/**
 * sets click event on article tag for expand or collapse a list.
 * @param {*} articleElement the HTML element of the list
 */
export function setClickForExpandCollapseOnArticle (articleElement)    {
    const h3TitleElement = articleElement.querySelector("h3");
    h3TitleElement.addEventListener("click", (event) => {
        const divElement = event.target.parentElement;
        const articleParentElement = divElement.parentElement;
        articleParentElement.classList.toggle("collapsed");

        console.log(`article with ${event.target.innerText} is at ${getIndexFromArticleElement(articleParentElement)} in initialList.`);
     })
}

/**
 * add click events on articles tag for expand or collapse lists.
 */
export function addClickForExpandCollapseOnArticles ()    {
    const articleElements = document.querySelectorAll("article h3");
    console.log(articleElements);
    
    for (const articleElement of articleElements) {
     articleElement.addEventListener("click", (event) => {
           const divElement = event.target.parentElement;
           const articleParentElement = divElement.parentElement;
           articleParentElement.classList.toggle("collapsed");

           console.log(`article with ${event.target.innerText} is at ${getIndexFromArticleElement(articleParentElement)} in initialList.`);
        })
    }
}

// Fonction pour afficher/cacher le menu d'options dans les modèles de to-do
export function addClickEventOnOptionsButton() {
    const optionButtons = document.querySelectorAll(".options-button");
    
    for (const optionButton of optionButtons) {
        optionButton.addEventListener("click", (event) => {
            // Trouver le menu dropdown associé
            const dropdown = event.target.closest(".bloc-options").querySelector(".dropdown-content");
            dropdown.classList.toggle("show");
            
        // Fermer le menu dropdown quand la souris sors de l'élément
        dropdown.addEventListener("mouseleave", () => {
                dropdown.classList.remove("show");
        })
    });
}}

// Fonction pour afficher/cacher le menu d'options dans les to-do ajoutées
export function setClickOnOptions (optionElement)    {
    const optionsElement = optionElement.querySelector(".options-button");
    optionsElement.addEventListener("click", (event) => {
        const dropdown = event.target.closest(".bloc-options").querySelector(".dropdown-content");
        dropdown.classList.toggle("show");
        dropdown.addEventListener("mouseleave", () => {
            dropdown.classList.remove("show");
        });
    });
}

/**
 * Sets click event on task elements in the list for check/uncheck tasks.
 * @param {*} articleElement 
 */
export function setClickOnTask(articleElement) {
    const htmlElements = articleElement.querySelectorAll("img.checkbox");
    console.log(htmlElements);

    for (const htmlElement of htmlElements) {
        addClickEventOnTask(htmlElement);
    }
}

/**
 * add click events on task elements in the list for check/uncheck tasks.
 */
export function addClickOnTask() {
    const htmlElements = document.querySelectorAll("article img.checkbox");
    console.log(htmlElements);
    
    for (const htmlElement of htmlElements) {
        addClickEventOnTask(htmlElement);
    }
}

//test justine : modifier le contenu

function handleTaskKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        const greatGrandParentElement = greatGrandParent(event.target);
        if (greatGrandParentElement.classList.contains('editing')) {
            event.preventDefault();
            saveNote(greatGrandParentElement);
        }
    }
}

function handleTitleKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        const grandParentElement = grandParent(event.target);
        if (grandParentElement.classList.contains('editing')) {
            event.preventDefault();
            saveNote(grandParentElement);
        }
    }
}

export function makeNoteEditable(articleElement) {
    const title = articleElement.querySelector('h3');
    const tasks = articleElement.querySelectorAll('li span');

    title.contentEditable = true;
    title.addEventListener("keydown", handleTitleKeydown);

    tasks.forEach(task => {
        task.contentEditable = true;
        task.addEventListener("keydown", handleTaskKeydown);
    });

    articleElement.classList.add('editing');
}

export function saveNote(articleElement) {
    const title = articleElement.querySelector('h3');
    const tasks = articleElement.querySelectorAll('li span');

    title.contentEditable = false;
    title.removeEventListener("keydown", handleTitleKeydown);
    tasks.forEach(task => {
        task.contentEditable = false;
        task.removeEventListener("keydown", handleTaskKeydown);
    });
  

    articleElement.classList.remove('editing');

    const index = getIndexFromArticleElement(articleElement);
    const listObject = initialList[index];
    listObject.title = title.textContent;
    listObject.elements = Array.from(tasks).map((task, i) => ({
        checked: listObject.elements[i].checked,
        name: task.textContent
    }));

    saveInitialList(initialList);
}

export function addEditEvents() {
    const modifyContentMenuElement = document.querySelector(".dropdown-content .option:nth-child(2)");
    
    modifyContentMenuElement.addEventListener("click", (event) => {
        if (!event.target.closest('.options-button')) {
            const greatGrandParentElement = greatGrandParent(event.target);
            const articleElement = grandParent(greatGrandParentElement);
            makeNoteEditable(articleElement);
        }
    });
}


/**
 * Stores list of todo lists under navigator.
 */
export function saveInitialList() {
    window.localStorage.setItem("to-do-lists", JSON.stringify(initialList));
}

function addClickEventOnTask(htmlElement) {
    htmlElement.addEventListener("click", (event) => {
        const liElement = event.target.parentElement;
        if (liElement !== null) {
            const indexObject = getListObjectAndIndexOfTaskElement(event.target);

            indexObject.listObject.elements[indexObject.indexOfTask].checked = !indexObject.listObject.elements[indexObject.indexOfTask].checked;
            const imgElement = liElement.querySelector("img");
            imgElement.src = indexObject.listObject.elements[indexObject.indexOfTask].checked ? "./assets/checkbox-filled.svg" : "./assets/checkbox-empty.svg";
            const spanElement = liElement.querySelector("span");
            spanElement.classList.toggle("checked");

            saveInitialList();
        }
    })
}

/**
 * THe list of todo lists.
 */
export let initialList = getToDoLists();

export function setClickOnDeleteOption(articleElement)  {
const deleteOption = articleElement.querySelector(".dropdown-content .option:nth-child(3)");
    deleteOption.addEventListener("click", (event) => {
        if (confirm("Voulez-vous vraiment supprimer cette liste ?")) {
            const article = event.target.closest('article');
            article.remove();
        }
    });
}

//Fonction pour supprimer une liste avec le bouton d'option.
export function addClickEventOnDeleteOption() {
    // Sélectionner toutes les options "supprimer la liste" (3ème option dans chaque menu)
    const deleteListOptions = document.querySelectorAll(".dropdown-content .option:nth-child(3)");
        for(const deleteOption of deleteListOptions)    {
        deleteOption.addEventListener("click", (event) => {
            const articleElement = event.target.closest('article');
                if (confirm("Voulez-vous vraiment supprimer cette liste ?")) {
                    articleElement.remove();
                    }
                })
        };
    };

export function setNewTask(articleElement) {
    addTaskOption.addEventListener("click", (event) => {
        const articleElement = event.target.closest('article');
        const taskList = articleElement.querySelector('ul:nth-child(2)');
        const taskName = "New task"
            const newTask = articleElement.createElement("li");
            newTask.innerHTML = `
                <img src="./assets/checkbox-empty.svg" alt="checkbox-empty" class="checkbox">
                <span>${taskName}</span>
            `;
            taskList.prepend(newTask);

            const listIndex = getIndexFromArticleElement(articleElement);
            initialList[listIndex].elements.unshift({
                name: taskName,
                checked: false
            });
            
            const checkbox = newTask.querySelector("img.checkbox");
            addClickEventOnTask(checkbox);
            
            saveInitialList();
    });
}

//Ajouter de nouveaux éléments tasks
export function addNewTask() {
    const addTaskOptions = document.querySelectorAll(".dropdown-content .option:nth-child(4)"); 
    for(const addTaskOption of addTaskOptions) {
        addTaskOption.addEventListener("click", (event) => {
            const articleElement = event.target.closest('article');
            const taskList = articleElement.querySelector('ul:nth-child(2)');
            const taskName = "New task"
                const newTask = document.createElement("li");
                newTask.innerHTML = `
                    <img src="./assets/checkbox-empty.svg" alt="checkbox-empty" class="checkbox">
                    <span>${taskName}</span>
                `;
                taskList.prepend(newTask);

                const listIndex = getIndexFromArticleElement(articleElement);
                initialList[listIndex].elements.unshift({
                    name: taskName,
                    checked: false
                });
                
                const checkbox = newTask.querySelector("img.checkbox");
                addClickEventOnTask(checkbox);
                
                saveInitialList();
        });
    }}