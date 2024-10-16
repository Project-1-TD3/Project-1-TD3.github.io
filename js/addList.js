//fonction d'ajout de liste via le bouton plus.
import {fillInnerArticle} from "./tools.js"; 

function createNewToDolist (){
  const newItem = document.createElement("article");
  const toDo =   {
    title : "New list",
    elements : [
          {
        checked : false, 
        name : "New task" 
        }
        
    ]
  }; 
  
  const toDoArticle = fillInnerArticle(toDo);
  newItem.innerHTML = toDoArticle;
  const sectionToDo = document.querySelector("section.notes");
  
  sectionToDo.prepend(newItem);
}

export default createNewToDolist;