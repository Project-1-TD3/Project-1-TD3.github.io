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
            <div class= "bloc-options">
            <div class= "dropbtn">
            <img  src="assets/options.png" alt="Bouton options" class="options-button">
            </div>
            <div class="dropdown-content">
            <ul>
            <li class="option" >créer une catégorie</li>
            <li class="option">modifier le contenu</li>
            <li class="option">supprimer la liste</li>
            </ul>
            </div>
            </div>
            </div>
            <div class="dropdown">
  
</div
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
        })
    }
}

// Fonction pour afficher/cacher le menu d'options dans les modèles de to-do
export function addClickEventOnOptionsButton() {
    const optionButtons = document.querySelectorAll(".options-button");
    
    for (const optionButton of optionButtons) {
        optionButton.addEventListener("click", (event) => {
            // Trouver le menu dropdown associé
            const dropdown = event.target.closest(".bloc-options").querySelector(".dropdown-content");
            dropdown.classList.toggle("show");
            
        // Fermer le menu dropdown quand la souris sors de l'élément
        dropdown.addEventListener("mouseleave", () => {
                dropdown.classList.remove("show");
            })
        });
    }}

    // Fonction pour afficher/cacher le menu d'options dans les to-do ajoutées
    export function setClickOnOptions (optionElement)    {
        const optionsElement = optionElement.querySelector(".options-button");
        optionsElement.addEventListener("click", (event) => {
        const dropdown = event.target.closest(".bloc-options").querySelector(".dropdown-content");
        dropdown.classList.toggle("show");
        dropdown.addEventListener("mouseleave", () => {
        dropdown.classList.remove("show");
            })
        })
    }