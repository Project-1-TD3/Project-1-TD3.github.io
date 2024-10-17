import {fillNotesSection, addClickEventOnListTitle, addClickOnTask, addClickEventOnOptionsButton} from "./tools.js";
import initialList from "./todolist.js";
import createNewToDolist from "./addList.js";

const footerElement = document.querySelector('svg');
footerElement.addEventListener("click", createNewToDolist);


fillNotesSection(initialList);
addClickEventOnListTitle();
addClickOnTask();
addClickEventOnOptionsButton();
