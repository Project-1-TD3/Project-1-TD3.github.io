 import { getIndexFromArticleElement, getListObjectAndIndexOfTaskElement } from "./index-manager.js";

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
            <img src="assets/options.png" alt="Bouton options" class="options-button">
            </div>
            <ul>${fillElements(toDo.elements)}
            </ul>`;
}

function fillElements (elements) {
    let liElementsString = "";
    for( const element of elements) {
        liElementsString += `<li>
                        <img src="${element.checked ? "./assets/checkbox-filled.svg" : "./assets/checkbox-empty.svg"}" alt="checkbox-empty" class="checkbox">
                        <span>${element.name}</span>
                    </li>`
    }
    return liElementsString ;
}
export function setClickOnArticle (articleElement)    {
    const h3TitleElement = articleElement.querySelector("h3");
    h3TitleElement.addEventListener("click", (event) => {
        const divElement = event.target.parentElement;
        const articleParentElement = divElement.parentElement;
        articleParentElement.classList.toggle("collapsed");

        console.log(`article with ${event.target.innerText} is at ${getIndexFromArticleElement(articleParentElement)} in initialList.`);
     })
}

export function addClickEventOnListTitle ()    {
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

export function addClickOnTask() {
    const htmlElements = document.querySelectorAll("article img.checkbox, article span");
    console.log(htmlElements);
    
    for (const htmlElement of htmlElements) {
        htmlElement.addEventListener("click", (event) => {
            const indexObject = getListObjectAndIndexOfTaskElement(event.target);
            indexObject.listObject.elements[indexObject.indexOfTask].checked = !indexObject.listObject.elements[indexObject.indexOfTask].checked;
            const liElement = event.target.parentElement;
            if (liElement !== null) {
                const imgElement = liElement.querySelector("img");
                imgElement.src = indexObject.listObject.elements[indexObject.indexOfTask].checked ? "./assets/checkbox-filled.svg" : "./assets/checkbox-empty.svg";
                const spanElement = liElement.querySelector("span");
                spanElement.classList.toggle("checked");
            }
        })
    }
}
