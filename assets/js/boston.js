var cantDados = 3;
var jugador = 1; 
var tirada = []; // Array donde se guardan los valores de los dados que van saliendo.
var puntajeP1 = 0;
var puntajeP2 = 0;
var cantTiros = 0; //  Cantidad de veces que puede arrojar los dados
var anotoJugada = false;

var cualtirada = 3;
var turno = 0;
var actualsuma = 0;
var puntaje = {
    p1 : 0,
    p2 : 0
}
var finish = 0;

//  HABILITAR BOTONES
function comenzar() {
    tirada = [];
    puntajeP1 = 0;
    puntajeP2 = 0;
    jugador = 1;
    cantTiros = 0;
    deseleccionarDados();
    cargarDatos();
    $("#botonReset").attr("disabled", false);
    $("#player2").removeClass("enJuego");
    $("#player1").addClass("enJuego");
    $("#botonTirar").attr("disabled", false);
    $("#info").html(" "); 
    $("#resultado").html(" ");
    $("#puntajeJ1").html(" ");
    $("#puntajeJ2").html(" ");
}

//  TIRAR DADOS Y ASIGNAR LAS IMAGENES
function tirarDados() {
    for (var i = 0; i < cantDados; i++) {
        if (!$("#dado" + (i + 1)).hasClass("seleccionado")) {
            var numero = (Math.floor(Math.random() * 6) + 1);
            tirada[i] = numero;
            $("#dado" + (i + 1) + " img").attr("src", "images/dados/" + numero + ".jpg").html(numero);
        }
    }
    $(".btnPuntaje").prop("disabled", false);
    cantTiros++;
  //  console.log("Cantidad de tiros: " + cantTiros);
    if (cantTiros == 4) {
        $("#botonTirar").prop("disabled", true);
        cambiarTurno();
    }
    $("#info").html("Tiro: " + cantTiros);
};

//  SELECCION DE LOS DADOS
function dados(a) {
    if ($("#dado" + a + " img").attr("src") != "images/dados/0.jpg") {
        if ($("#dado" + a).hasClass("seleccionado")) {
            $("#dado" + a).removeClass("seleccionado");
        } else {
            $("#dado" + a).addClass("seleccionado");
        }
    }
};

function deseleccionarDados() {
    for (var i = 0; i < cantDados; i++) {
        $("#dado" + (i + 1) + " img").attr("src", "images/dados/0.jpg");
        $("#dado" + (i + 1)).removeClass("seleccionado");
    }
}

function cambiarTurno() {
    if (finish == 0) {
        cantTiros = 0;
        $("#info").html("Tiro: " + cantTiros);
        deseleccionarDados();
        $("#botonTirar").prop("disabled", false);
        if (jugador === 1) {
            $("#player1").removeClass("enJuego");
            $("#player2").addClass("enJuego");
            jugador = 2;
        } else {
            $("#player2").removeClass("enJuego");
            $("#player1").addClass("enJuego");
            jugador = 1;
        }
        $(".btnPuntaje").prop("disabled", true);
        anotarJugada();
    }
}

function anotarJugada(){
        valor = 0
        for (var i = 0; i < 3; i++) {
           valor = valor + tirada[i];
        }
        if(jugador == 1){
            puntajeP1 = puntajeP1 + valor;
           // $("table tbody tr:last-of-type td:nth-of-type(1)").html(puntajeP1); 
           $("#puntajeJ1").html(puntajeP1); 
        } else {
            puntajeP2 = puntajeP2 + valor;
           // $("table tbody tr:last-of-type td:nth-of-type(2)").html(puntajeP2);  
           $("#puntajeJ2").html(puntajeP2);           
        }
        quienGana();
}

function quienGana(){
    if (puntajeP1 >= 100) {
        $("#resultado").text(nickP1 + " ha ganado!");
        Store.save("ptsBoston1", Store.load("ptsBoston1") + 100);
        $("#botonTirar").attr("disabled", true);
        finish = 1;
    }
    else if (puntajeP2 >= 100) {
        $("#resultado").text(nickP2 + " ha ganado!");
        Store.save("ptsBoston2", Store.load("ptsBoston2") + 100);
        $("#botonTirar").attr("disabled", true);
        finish = 1;
    }
}

function playRoll (jugador){
        
        while (finish == 0){
            rolls = [];//dados en el tiro 
            for (var i = 0; i < tirada; i++) //tirar los 3 tiros se guardan en rolls y cuantos dados tira segun los tiros
                    {
                        rolls.push(Math.floor(Math.random() * 6) + 1);
                   //     document.write(rolls[i] +"<br>");
                        quienGana();
                    }
                    
                    var mayor = 0
                    for (var i = 0; i < rolls.length; i++) //ver cual de los 3 dentro de rolls es el mayor
                    {
                        if (rolls[i] > mayor)
                        {
                            mayor = rolls[i];
                           // document.write("el mayor es " + mayor +"<br>");
                        }    
                    }
                    puntaje[jugador] = puntaje[jugador] + mayor; //sumar el mayor al puntaje del jugador
                  //  document.write("puntaje de " + jugador + "es: " + puntaje[jugador] +"<br>");
                    if (tirada <= 0 ){ //chequea si ya termino el turno y resetea
                        tirada = 3;
                        if (jugador == 'p1') playRoll('p2');
                        else playRoll('p1')
                    }
                    else {
                        tirada--;
                        playRoll(jugador);
                    }
                    
                
                }
}

function resetGame() {
    if (confirm("¿Desea reiniciar el juego?")) {
        comenzar();
        $("#player1").removeClass("enJuego");

    }
}