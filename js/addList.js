//fonction d'ajout de liste via le bouton plus.
import {fillInnerArticle, setClickForExpandCollapseOnArticle, setClickOnOptions, setClickOnTask, saveInitialList, initialList, makeNoteEditable, saveNote,} from "./tools.js"; 
import {colorCategories} from "./color-categories.js";

function createNewToDolist (){
    const newItem = document.createElement("article");
    const toDo =   {
      title : "New list",
      category : getRandomColor(),
      elements : [
           {
          checked : false, 
          name : "New task" 
          }      
      ]
   };

   initialList.unshift(toDo);

   newItem.classList.add(toDo.category);
   newItem.classList.add("collapsed");
   const toDoArticle = fillInnerArticle(toDo);
    newItem.innerHTML = toDoArticle;
 
    const sectionToDo = document.querySelector("section.notes");

    sectionToDo.prepend(newItem);
 
    setClickForExpandCollapseOnArticle(newItem);
    setClickOnOptions(newItem);
    setClickOnTask(newItem);
    saveInitialList();
  }

  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colorCategories.length);
    return colorCategories[randomIndex];
}

  export default createNewToDolist;
