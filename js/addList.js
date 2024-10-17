//fonction d'ajout de liste via le bouton plus.
import {fillInnerArticle, setClickOnArticle, setClickOnOptions} from "./tools.js"; 

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
   newItem.classList.add(toDo.category);
   newItem.classList.add("collapsed");
   const toDoArticle = fillInnerArticle(toDo);
    newItem.innerHTML = toDoArticle;
 
    const sectionToDo = document.querySelector("section.notes");

    sectionToDo.prepend(newItem);
 
    setClickOnArticle(newItem);
    setClickOnOptions(newItem);
  }
  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colorCategories.length);
    return colorCategories[randomIndex];
}


  export default createNewToDolist;
