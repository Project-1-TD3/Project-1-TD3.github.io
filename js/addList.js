//fonction d'ajout de liste via le bouton plus.
import {fillArticle} from "./tools.js"; 

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
   let toDoArticle = fillArticle(toDo);
   toDoArticle = toDoArticle.replace("<article>","");
   toDoArticle = toDoArticle.replace("</article>","");


   

    newItem.innerHTML = toDoArticle;
 
    const sectionToDo = document.querySelector("section.notes");

    sectionToDo.prepend(newItem);
 
 
  }
  export default createNewToDolist;