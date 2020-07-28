//Modal login usuarios
var modal = document.getElementById('id01');

//Permite abrir el modal para el registro de jugadores.
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

 //Redirecciono el botón de Jugar a la página de juegos.
function homeButton(target) {
    location.href='home.html';
};
  
 //Redirecciono el botón de Registro al form.

function registro(){
    location.href="login.html";
}