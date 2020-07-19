//Login usuarios
var modal = document.getElementById('id01');

//Permite abrir el modal para el registro de jugadores
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

 //Redirecciono el botón de Jugar a la página de juegos.
function homeButton(target) {
    location.href='home.html';
};
  

//---------- Guardado de datos del formulario ---------- //

function registrar(){
    location.href="formulario.html";
}

function go(){
    if(localStorage.getItem("usuario1")==null){
        console.log("usuario1:null");
        $("#formulario").css("display","block");
        localStorage.clear();
        
    }
    
    else{
        console.log("usuario1 y usuario2: distinto de null");
        document.getElementById("usuario1").value=localStorage.getItem("usuario1");
        document.getElementById("apodo1").value=localStorage.getItem("apodo1");
        document.getElementById("foto1").value=localStorage.getItem("foto1");

        document.getElementById("usuario2").value=localStorage.getItem("usuario2");
        document.getElementById("apodo2").value=localStorage.getItem("apodo2");
        document.getElementById("foto2").value=localStorage.getItem("foto2");
        
        $("#formulario").css("display","block");
        $("#formulario2").css("display","none");
    }
}

function validaryguardar(jugador){

    var usuario;
    var apodo;
    var foto;
    var puntaje;

    if (jugador == 1){
        if(document.getElementById("usuario1").value == ""){
            alert ("Complete el Usuario");
        }
        else if (document.getElementById("apodo1").value == ""){
            alert ("Complete el Apodo");
        }

        else{
            usuario=document.getElementById("usuario1").value;
            apodo=document.getElementById("apodo1").value;
            foto=document.getElementById("foto1").src;
            puntaje=localStorage.getItem("puntajeglobal1");

            localStorage.setItem("usuario1", usuario);
            localStorage.setItem("apodo1", apodo);
            localStorage.setItem("foto1", foto);
            if(puntaje==null){

                localStorage.setItem("puntajeglobal1", 0);
                console.log("puntajeglobal1: " + puntaje);
            }
            
            $("#formulario").css("display","none");
            $("#formulario2").css("display","block");
        }
    }

    else{

        if(document.getElementById("usuario2").value == ""){
            alert ("Complete el Usuario");
        }

        else if (document.getElementById("apodo2").value == ""){
            alert ("Complete el Apodo");
        }

        else{
            usuario=document.getElementById("usuario2").value;
            apodo=document.getElementById("apodo2").value;
            foto=document.getElementById("foto2").src;
            puntaje=localStorage.getItem("puntajeglobal2");

            localStorage.setItem("usuario2", usuario);
            localStorage.setItem("apodo2", apodo);
            localStorage.setItem("foto2", foto);
           

            location.href="menu.html";
        }   

    }

}


// ---------- Mostrar resultados en el menu ---------- //

var mostrarapodo1=localStorage.getItem("apodo1");
var mostrarapodo2=localStorage.getItem("apodo2");

var puntajeGlobal1= localStorage.getItem("puntajeGlobal1");
var puntajeGlobal2= localStorage.getItem("puntajeGlobal2");

    function go(){
        
        console.log("puntaje total1:" + puntajeGlobal1);
        $("#local1").html(mostrarapodo1 + ": " + puntajeGlobal1 + " ♫");

        console.log("puntaje total2:" + puntajeGlobal2);
        $("#local2").html(mostrarapodo2 + ": " + puntajeGlobal2 + " ♫");
        

        if(puntajeGlobal1 ===null){
            $("#local1").html(mostrarapodo1 + ": "+ "0" + " ♫");
                }
                else{
                    $("#local1").html(mostrarapodo1 + ": " + puntajeGlobal1 + " ♫");
                }

                if(puntajeGlobal2 ===null){
                    $("#local2").html(mostrarapodo2 + ": "+ "0" + " ♫");
                        }
                        else{
                            $("#local2").html(mostrarapodo2 + ": " + puntajeGlobal2 + " ♫");
                        }

}

   




