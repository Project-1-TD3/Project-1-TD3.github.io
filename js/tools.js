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
            <img src="assets/options.png" alt="Bouton options" class="options-button">
            </div>
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
