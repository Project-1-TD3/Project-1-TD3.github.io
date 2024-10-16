import initialList from "./todolist.js";


export function getIndexFromArticleElement(htmlElement) {
    let articleElement;

    if (isTagName(htmlElement, 'article')) {
        articleElement = htmlElement;
    }

    if (isTagName(htmlElement, 'img')) {
        if (hasClass(htmlElement, 'options-button')) {
            articleElement = grandParent(htmlElement);
        }
        else if (hasClass(htmlElement, "checkbox")) {
            articleElement = greatGrandParent(htmlElement);
        }
    }

    if (isTagName(htmlElement, 'span')) {
        articleElement = greatGrandParent(htmlElement);
    }

    if (isTagName(htmlElement, 'h3')) {
        articleElement = grandParent(htmlElement);
    }

    return getChildRank(articleElement);
}

export function getListObjectAndIndexOfTaskElement(htmlElement) {
    let ulElement;

    const liElement = htmlElement.parentElement;
    if (liElement === null) {
        return {
            listObject: undefined,
            indexOfTask: NaN
        };
    }

    if (isTagName(htmlElement, 'span')) {
        ulElement = grandParent(htmlElement);
    }
    else if (isTagName(htmlElement, 'img') && hasClass(htmlElement, "checkbox")) {
        ulElement = grandParent(htmlElement);
    }

    let indexOfList = getIndexFromArticleElement(htmlElement);
    const listObject = initialList[indexOfList]; 

    const indexOfTask = getChildRank(liElement);

    return {
        listObject: listObject,
        indexOfTask: indexOfTask
    };
}

function isTagName(htmlElement, tagName) {
    return htmlElement.tagName.toLowerCase() === tagName.toLowerCase();
}

function hasClass(htmlElement, className) {
    return htmlElement.classList.contains(className);
}

function grandParent(htmlElement) {
    const parentElement = htmlElement.parentElement;
    if (parentElement !== null) {
        return parentElement.parentElement;
    }

    return null;
}

function greatGrandParent(htmlElement) {
    const grandParentElement = grandParent(htmlElement);
    if (grandParentElement !== null) {
        return grandParentElement.parentElement;
    }

    return null;
}

function getChildRank(htmlElement) {
    const parentElement = htmlElement.parentElement;
    if (parentElement === null) {
        return NaN;
    }

    const selector = htmlElement.tagName.toLowerCase();
    const siblingElements = parentElement.querySelectorAll(selector);
    return Array.from(siblingElements).indexOf(htmlElement);
}
