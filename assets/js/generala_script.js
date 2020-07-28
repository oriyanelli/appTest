var cantDados = 5;
var jugador = 1; //  N° del jugador
var tirada = []; // Array donde se guardan los valores de los dados que van saliendo.
var puntajeP1 = 0;
var puntajeP2 = 0;
var cantTiros = 0; //  Cantidad de veces que puede arrojar los dados
var anotoJugada = false;

//  VISUALIZACIÓN DE LOS PUNTAJES
function sumarPuntajes(puntajeJuego) {
    if (jugador == 1) {
        puntajeP1 = puntajeP1 + puntajeJuego;
    } else {
        puntajeP2 = puntajeP2 + puntajeJuego;
    }
    $("table tbody tr:last-of-type td:nth-of-type(1)").html(puntajeP1);
    $("table tbody tr:last-of-type td:nth-of-type(2)").html(puntajeP2);
}

//  HABILITAR BOTONES
function comenzar() {
    tirada = [];
    puntajeP1 = 0;
    puntajeP2 = 0;
    jugador = 1;
    cantTiros = 0;
    deseleccionarDados();
 //   shakeEvent.start();
    cargarDatos();
    /* $(".showWinsP1").html("Partidas ganadas: " + Store.load("historialP1"));
     $(".showWinsP2").html("Partidas ganadas: " + Store.load("historialP2"));*/
    $("#botonReset").attr("disabled", false);
    $("#player2_generala").removeClass("enJuego");
    $("#player1_generala").addClass("enJuego");
    //Recorro toda la tabla
    for (i = 1; i <= 11; i++) {
        for (j = 2; j <= 3; j++) {
            $("table tbody tr:nth-of-type(" + i + ") td:nth-of-type(" + j + ")").empty();
        }
    }

    $("table tbody tr:nth-of-type(12) td:nth-of-type(1)").empty();
    $("table tbody tr:nth-of-type(12) td:nth-of-type(2)").empty();
    $("#botonTirar").attr("disabled", false);
    $("#info").html("Tiro: " + cantTiros);
}

//  CAMBIOS DE TURNO ENTRE JUGADORES
function cambiarTurno() {
    if (!checkWinner()) {
        cantTiros = 0;
        $("#info").html("Tiro: " + cantTiros);
        deseleccionarDados();
   //     shakeEvent.start();
        $("#botonTirar").prop("disabled", false);
        if (jugador === 1) {
            $("#player1_generala").removeClass("enJuego");
            $("#player2_generala").addClass("enJuego");
            jugador = 2;
        } else {
            $("#player2_generala").removeClass("enJuego");
            $("#player1_generala").addClass("enJuego");
            jugador = 1;
        }
        $(".btnPuntaje").prop("disabled", true);
    }
}

function deseleccionarDados() {
    for (var i = 0; i < cantDados; i++) {
        $("#dado" + (i + 1) + " img").attr("src", "images/dados/0.jpg");
        $("#dado" + (i + 1)).removeClass("seleccionado");
    }
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
    //checkJugada();
    // Sumar los cantTiros
    console.log("Cantidad de tiros: " + cantTiros);
    if (cantTiros == 3) {
        $("#botonTirar").prop("disabled", true);
    //    stopShake();
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

//  ANUNCIAR EL GANADOR
function checkWinner() {
    var finished = true;
    //Recorro toda la tabla
    for (i = 1; i <= 11; i++) {
        for (j = 2; j <= 3; j++) {
            if ($("table tbody tr:nth-of-type(" + i + ") td:nth-of-type(" + j + ")").html() == "") {
                finished = false;
            }
        }
    }

    if (finished) {
        if (puntajeP1 > puntajeP2) {
            $("#marcador #info").html("El ganador es " + Store.load("usuario1"));
            $("#botonTirar").attr("disabled", true);
            $("#player1").addClass("enJuego");
            $("#player2").removeClass("enJuego");
        } else if (puntajeP2 > puntajeP1) {
            $("#marcador #info").html("El ganador es " + Store.load("usuario2"));
            $("#botonTirar").attr("disabled", true);
            $("#player1").removeClass("enJuego");
            $("#player2").addClass("enJuego");
          
        } else {
            $("#marcador #info").html("Empate");
            $("#botonTirar").attr("disabled", true);
            $("#player1").removeClass("enJuego");
            $("#player2").removeClass("enJuego");
        }
        return true;
    }
    return false;
}

//  RESETEAR EL JUEGO
function resetGame() {
    if (confirm("¿Desea reiniciar el juego?")) {
        comenzar();
    }
}

function showMessage(message) {
  $("div.message").html(message).fadeIn(300).delay(3000).fadeOut(400);
}

//  JUEGOS DE LOS NUMEROS DEL 1 - 6
function numb(a) {
    var cantidad = 0;
    for (i = 0; i < tirada.length; i++) {
        if (tirada[i] == a) {
            cantidad++;
        }
    }
    if ($("table tbody tr:nth-of-type(" + a + ") td:nth-of-type(" + (jugador + 1) + ")").html() == "") {
        showMessage((a * cantidad).toString() + " al " + a);
        $("table tbody tr:nth-of-type(" + a + ") td:nth-of-type(" + (jugador + 1) + ")").html(a * cantidad);
        sumarPuntajes(a * cantidad);
        cambiarTurno();
    } else {
        showMessage("Jugada no permitida");
    }

}

// ESCALERA
var juegoEscalera = /(12345)|(23456)|(13456)/g;

// FULL
var juegoFull = /(1{3}(2{2}|3{2}|4{2}|5{2}|6{2}))|(1{2}(2{3}|3{3}|4{3}|5{3}|6{3}))|(2{3}(3{2}|4{2}|5{2}|6{2}))|(2{2}(3{3}|4{3}|5{3}|6{3}))|(3{3}(4{2}|5{2}|6{2}))|(3{2}(4{3}|5{3}|6{3}))|(4{3}(5{2}|6{2}))|(4{2}(5{3}|6{3}))|5{3}6{2}|5{2}6{3}/g;

// POKER
var juegoPoker = /1{4}[23456]|1{1}2{4}|1{1}3{4}|1{1}4{4}|1{1}5{4}|1{1}6{4}|2{4}[3456]|2{1}3{4}|2{1}4{4}|2{1}5{4}|2{1}6{4}|3{4}[456]|3{1}4{4}|3{1}5{4}|3{1}6{4}|4{4}[56]|4{1}5{4}|4{1}6{4}|5{4}[6]|5{1}6{4}/g;

//  GENERALA
var juegoGenerala = /1{5}|2{5}|3{5}|4{5}|5{5}|6{5}/g;

//  ANOTAR LAS JUGADAS EN LA TABLA
function anotarJugada(fila, puntaje, puntajeServido) {
    if ($("table tbody tr:nth-of-type(" + fila + ") td:nth-of-type(" + (jugador + 1) + ")").html() == "") {
        if (cantTiros === 1) {
            if (puntajeServido > 0) {
                showMessage($("table tbody tr:nth-of-type(" + fila + ") td:first-of-type button").html().toString() + ((fila == 7 || fila == 10 || fila == 11) ? " servida" : " servido"));
            } else {
                showMessage($("table tbody tr:nth-of-type(" + fila + ") td:first-of-type button").html().toString() + ((fila == 7 || fila == 10 || fila == 11) ? " tachada" : " tachado"));
            }
            $("table tbody tr:nth-of-type(" + fila + ") td:nth-of-type(" + (jugador + 1) + ")").html(puntajeServido);
            sumarPuntajes(puntajeServido);
            cambiarTurno();
        } else {
            $("table tbody tr:nth-of-type(" + fila + ") td:nth-of-type(" + (jugador + 1) + ")").html(puntaje);
            if (puntaje > 0) {
                showMessage($("table tbody tr:nth-of-type(" + fila + ") td:first-of-type button").html().toString());
            } else {
                showMessage($("table tbody tr:nth-of-type(" + fila + ") td:first-of-type button").html().toString() + ((fila == 7 || fila == 10 || fila == 11) ? " tachada" : " tachado"));
            }
            sumarPuntajes(puntaje);
            cambiarTurno();
        }
    } else {
        showMessage("Jugada no permitida");
    }
}

//  COMPROBACION DE COINCIDENCIAS EN LOS JUEGOS
function juego(jugada) {
    switch (jugada) {
        case "1":
            numb(1);
            break;
        case "2":
            numb(2);
            break;
        case "3":
            numb(3);
            break;
        case "4":
            numb(4);
            break;
        case "5":
            numb(5);
            break;
        case "6":
            numb(6);
            break;
        case "escalera":
            if (hizoJuego(juegoEscalera)) {
                anotarJugada(7, 20, 25);
            } else {
                anotarJugada(7, 0, 0);
            }
            break;
        case "full":
            if (hizoJuego(juegoFull)) {
                anotarJugada(8, 30, 35);
            } else {
                anotarJugada(8, 0, 0);
            }
            break;
        case "poker":
            if (hizoJuego(juegoPoker)) {
                anotarJugada(9, 40, 45);
            } else {
                anotarJugada(9, 0, 0);
            }
            break;
        case "generala":
            if (hizoJuego(juegoGenerala)) {
                anotarJugada(10, 50, 55);
            } else {
         //Me fijo si ya tacho la doble generala, si no es asi, la tacho primero
                if ($("table tbody tr:nth-of-type(" + 11 + ") td:nth-of-type(" + (jugador + 1) + ")").html() == "") {
                    anotarJugada(11, 0, 0);
                } else {
                    anotarJugada(10, 0, 0);
                }
            }
            break;
        case "dobleGenerala":
            if (hizoJuego(juegoGenerala) && $("table tbody tr:nth-of-type(" + 10 + ") td:nth-of-type(" + (jugador + 1) + ")").html() != "") {
                anotarJugada(11, 100, 100);
            } else {
                anotarJugada(11, 0, 0);
            }
            break;
    }
}

//  ORDENA LA TIRADA DE DADOS DE MENOR A MAYOR PARA LUEGO COMPROBAR SI HAY JUEGO
function hizoJuego(juego) {
    var tiradaOrdenada = tirada.slice();
    tiradaOrdenada.sort(function (a, b) {
        return a - b;
    });
    if (tiradaOrdenada.join("").match(juego) != null) {
        return true;
    }
    return false;
}

// MENU DE PUNTAJES DESPLEGABLE TABLA PUNTAJES
 $(document).ready(function () {
     $("#tablaPuntajes").addClass("noDisp");
    $("#puntajesGenerala").click(function () {
         $("#tablaPuntajes").toggle();
    });
});

// var shakeEvent = new Shake({
//     threshold: 10
// });
// // start listening to device motion
// //        shakeEvent.start();

// window.addEventListener('shake', function () {
//     tirarDados();
// }, false);

// function stopShake() {
//     shakeEvent.stop();
// }

