// Guardar usuarios
var Store = {
    load: function (key) {
        return JSON.parse(window.localStorage.getItem(key));
    },
    save: function (key, obj) {
        window.localStorage.setItem(key, JSON.stringify(obj)); //El "stringify" es para cuando lo voy a guardar
    },
    dele: function (key) {
        window.localStorage.removeItem(key);
    },
    kill: function () { // Borra a cero el localStorage de mi aplicación
        window.localStorage.clear();
    },
    search: function (what) { // Devuelve todos los key cuyos valores contengan los que estan buscando
        var matches = [];
        for (var i = 0; i < window.localStorage.length; i++) { // Recorrer todo el localStorage
            var keyName = window.localStorage.key(i); // Guardar el nombre de todos los keys
            var val = window.localStorage.getItem(keyName); // Guarda los valores
            if (val.indexOf(what) !== -1) { // Si el valor de la variable "var" es igual a lo que se esta buscando, se guarda el keyName de ese valor en el array
                matches.push(keyName);
            }
        }
        return matches;
    }
};

// Variables de datos para los jugadores //
var nameP1;
var nickP1;
var photoP1;

var nameP2;
var nickP2;
var photoP2;

//  Registro de jugadores
function guardarDatos() {
    var nameP1 = $("#name1").val();
    var nickP1 = $("#user1").val();

    Store.save("name1", nameP1);
    Store.save("user1", nickP1);
   // Store.save("historialP1", 0);

  //  Store.save("ptsTateti1",tatetipts.ttt_p1);
  //  Store.save("ptsGenerala1",generalapts.generala_p1);
  //  Store.save("ptsBoston1",bostonpts.boston_p1);

    var nameP2 = $("#name2").val();
    var nickP2 = $("#user2").val();

    Store.save("name2", nameP2);
    Store.save("user2", nickP2);
  //  Store.save("historialP2", 0);

  //  Store.save("ptsTateti2",tatetipts.ttt_p2);
  //  Store.save("ptsGenerala2",generalapts.generala_p2);
  //  Store.save("ptsBoston2",bostonpts.boston_p2);
    window.location="home.html";
};

 function cargarDatos() {
     nameP1 = Store.load("name1");
     nickP1 = Store.load("user1");
     photoP1 = Store.load("avatar1");
  //   puntajeP1 = Store.load("historialP1");

     nameP2 = Store.load("name2");
     nickP2 = Store.load("user2");
     photoP2 = Store.load("avatar2");
  //   puntajeP2 = Store.load("historialP2");

     console.log(Store.load("name1"), Store.load("user1"), Store.load("name2"), Store.load("user2"));
 };

// Validación de usuarios 

function validarDatos() {
    if (nameP1 === "" || nickP1 === "" || nameP2 === "" || nickP2 === "" || photoP1 === null || photoP2 === null) {
        alert("Faltan datos por ingresar, registrese nuevamente.");
    } else {
        alert("¡Registro exitoso!");
        window.location = "home.html";
    }
};

// Mostrar datos de los jugadores y puntos
function mostrarDatos(){
    $("#list_nick1").html(Store.load("name1"));
    $("#list_nick1").html(Store.load("user1"));
    $("#list_TTTpts1").html('Tateti: ' + Store.load("ptsTateti1"));
	$("#list_Generalapts1").html('Generala: ' + Store.load("ptsGenerala1"));
	$("#list_Bostonpts1").html('Boston: ' + Store.load("ptsBoston1"));
    photoP1=Store.load("photo1");
    $("#list_photo1").attr("src",photoP1);

    $("#list_nombre2").html(Store.load("name2"));
    $("#list_nick2").html(Store.load("user2"));
    $("#list_TTTpts2").html('Tateti: ' + Store.load("ptsTateti2"));
	$("#list_Generalapts2").html('Generala: ' + Store.load("ptsGenerala2"));
	$("#list_Bostonpts2").html('Boston: ' + Store.load("ptsBoston1"));
    photoP1=Store.load("photo2");
    $("#list_photo2").attr("src",photoP1);

    //Los muestro en el inicio
    $("#player1").html(Store.load("user1"));
    $("#player2").html(Store.load("user2"));

    //Los muestro para la Generala
    $("#player1_generala").html(Store.load("user1"));
    $("#player2_generala").html(Store.load("user2"));
}

// Reseteo del storage
 function resetAllScores() {
    window.localStorage.clear();
 }

// Acceso a la cámara
var pictureSource;
var destinationType;
var smallImage;
var jugador;
var idjugador;

document.addEventListener("deviceready", onDeviceReady, false);
//  No se puede acceder al hardware si el dispositivo no esta listo.
//  El false es para que no propague el evento.

function onDeviceReady() { // Setea el hardware.
    pictureSource = navigator.camera.PictureSourceType; // Indica de donde quiero sacar la foto.
    destinationType = navigator.camera.DestinationType; // Indica de donde quiero guardar la foto.
};

//  Cuando puedo sacar la foto, van a estar coficados como data URL.
function onPhotoDataSuccess(imageData) {
    smallImage = document.getElementById('photo-player-' + idjugador);
    smallImage.style.display = 'block';
    smallImage.src = "data:image/jpeg;base64," + imageData;
    Store.save("avatar" + idjugador, "data:image/jpeg;base64," + imageData);
};

//  Llama cuando quiero sacar la foto.
function capturePhoto() {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 50,
        destinationType: destinationType.DATA_URL
    }); // Los guarda y los codifica como una data URL.
};

// Mensaje por si no pudo sacar la foto.
function onFail(message) {
    alert('Ha ocurrido un error: ' + message);
};

function asignarFoto(a) {
    idjugador = a;
};
