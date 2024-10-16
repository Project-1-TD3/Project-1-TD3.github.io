import {fillNotesSection, addClickForExpandCollapseOnArticles, addClickOnTask,
       addClickEventOnOptionsButton, addClickEventOnDeleteOption, addNewTask, deleteTask,
       saveInitialList, initialList, addEditEvents, keyDownInput} from "./tools.js";
import createNewToDolist from "./addList.js";

const footerElement = document.querySelector('svg');
footerElement.addEventListener("click", createNewToDolist);

fillNotesSection(initialList);
addClickForExpandCollapseOnArticles();
addClickOnTask();
addClickEventOnOptionsButton();
addEditEvents();
saveInitialList();
addClickEventOnDeleteOption();
addNewTask();
deleteTask();
keyDownInput();