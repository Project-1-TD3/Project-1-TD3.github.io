import {fillNotesSection, addClickForExpandCollapseOnArticles, addClickOnTask, addClickEventOnOptionsButton,saveInitialList, initialList, addEditEvents} from "./tools.js";
import createNewToDolist from "./addList.js";

const footerElement = document.querySelector('svg');
footerElement.addEventListener("click", createNewToDolist);

fillNotesSection(initialList);
addClickForExpandCollapseOnArticles();
addClickOnTask();
addClickEventOnOptionsButton();
addEditEvents();
saveInitialList();
