import {fillNotesSection} from "./tools.js";
import initialList from "./todolist.js";
import createNewToDolist from "./addList.js";

const footerElement = document.querySelector('svg');
footerElement.addEventListener("click", createNewToDolist);

fillNotesSection(initialList);

const articleElements = document.querySelectorAll("article h3");
for (const articleElement of articleElements) {
 articleElement.addEventListener("click", (event) => {
       const divElement = event.target.parentElement;
       const articleParentElement = divElement.parentElement;
       articleParentElement.classList.toggle("collapsed");
    })
}
