import {fillNotesSection, addClickEventOnListTitle, addClickEventOnOptionsButton} from "./tools.js";
import initialList from "./todolist.js";
import createNewToDolist from "./addList.js";

const footerElement = document.querySelector('svg');
footerElement.addEventListener("click", createNewToDolist);


fillNotesSection(initialList);

addClickEventOnListTitle();

addClickEventOnOptionsButton();