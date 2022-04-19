/* const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card'); */
/* for(let card of cards) {
    card.addEventListener("click", function() {
        /* modalOverlay.classList.add('active'); */
        //pegar o atributo do video de cada video para rodar
        /* const videoId = card.getAttribute("id");
        // redirecionar o card para a pagina que deseja
        window.location.href = `/video?id=${videoId}`;
        //pegar o iframe e colocar os videos conforme os grids
        /* modalOverlay.querySelector("iframe").src= `https://www.youtube.com/embed/${videoId}`; */
/*     });
}; */

/* document.querySelector(".close-modal").addEventListener("click", function() {
    modalOverlay.classList.remove("active");
    //remover o video, colocando o scr vazio
    //assim o video vai parar de rodar quando fechar o modal
    modalOverlay.querySelector("iframe").src ="";
}); */

const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")
//Use Includes Method - to include strings
for (item of menuItems) {
    if(currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}



