const footerElement = document.querySelector('footer>svg');
footerElement.addEventListener("click", (event) => {

   // todo cet evenement sert a creer nouvelle liste quand tu clique dessus

});

  const articleElements = document.querySelectorAll("article h3");
  for (const articleElement of articleElements) {
   articleElement.addEventListener("click", (event) => {
         const divElement = event.target.parentElement;
         const articleParentElement = divElement.parentElement;
         articleParentElement.classList.toggle("collapsed");
      })
  }