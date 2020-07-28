var tablero = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var jugador = 1;

    // ** Asigna las letras para cada jugador, recorre la tabla para ver quien cliquea primero **
    function jugadores(){
    for(var i=0; i<9; i++){
        if(tablero[i] == 1) {
            document.getElementById("pos"+i).innerHTML='<span class="estCruz">X</span>';  
        }
        if(tablero[i] == 2) {
            document.getElementById("pos"+i).innerHTML='<span class="estCirc">O</span>'; }
    }
    }

    //  ** Asigna los turnos, y les agrega o remueve la clase segun a quien le toque ** 
    function posTablero(celda){
    if (tablero[celda]===0) {
    if (jugador==1){
        tablero[celda]=1;
            jugador=2;
                $("ul li:first-of-type").addClass("turno1");
                $("ul li:last-of-type").removeClass("turno2");
    } else {
        tablero[celda]=2;
            jugador=1; 
                $("ul li:last-of-type").addClass("turno2");
                $("ul li:first-of-type").removeClass("turno1");
    }
    } else {
        alert("Oops, prueba de vuelta!");
    } 
    jugadores();


//    ** Define los ganadores depende del caso que toque ** 
var definicion = ganador();
 switch(definicion){
  case 0:
   break;
  case 1:
         $("#resultado").text(Store.load("user1") + " ha ganado!");
         $("ul li:first-of-type").addClass("turno1");
         $("ul li:last-of-type").removeClass("turno2"); 
         $("#tableroT").css("background-color", "#eaeaea");
         $("#tableroT").addClass("Nodisponible"); 
         Store.save("ptsTateti1", Store.load("ptsTateti1") + 50);
   break;
  case 2:
         $("#resultado").text(Store.load("user2") + " ha ganado!");
         $("ul li:first-of-type").removeClass("turno1");
         $("ul li:last-of-type").addClass("turno2");  
         $("#tableroT").css("background-color", "#eaeaea");
         $("#tableroT").addClass("Nodisponible"); 
         Store.save("ptsTateti2", Store.load("ptsTateti2") + 50);
  
   break;
  case 3:
         $("#resultado").text("¡Empate!");
         $("#tableroT").css("background-color", "#fcfcfc");
         $("ul li:first-of-type").removeClass("turno1");
         $("ul li:last-of-type").removeClass("turno2");  
         $("#tableroT").addClass("Nodisponible"); 
   break; 
     }
}

    // ** Define el ganador segun los espacios y combinaciones **
    function ganador(){
    var espacios=0;
    for(var i=0; i<9; i++){
        if(tablero[i] === 0)
            espacios++;
    }

    // Horizontales
    if(tablero[0] == tablero[1] && tablero[1] == tablero[2] && tablero[0] !==0) 
        return tablero[0];
    if(tablero[3] == tablero[4] && tablero[4] == tablero[5] && tablero[3] !==0) 
        return tablero[3];
    if(tablero[6] == tablero[7] && tablero[7] == tablero[8] && tablero[6] !==0) 
        return tablero[6];
        
    //Verticales
    if(tablero[0] == tablero[3] && tablero[3] == tablero[6] && tablero[0] !==0)
    return tablero[0];
    if(tablero[1] == tablero[4] && tablero[4] == tablero[7] && tablero[1] !==0) 
        return tablero[1];
    if(tablero[2] == tablero[5] && tablero[5] == tablero[8] && tablero[2] !==0)
    return tablero[2];
        
    //Diagonales
    if(tablero[0] == tablero[4] && tablero[4] == tablero[8] && tablero[0] !==0) 
        return tablero[0];
    if(tablero[2] == tablero[4] && tablero[4] == tablero[6] && tablero[2] !==0) 
        return tablero[2];

    //Detecta si el caso es 0, o si es 3 el EMPATE	
    if (espacios > 0){
        return 0;
        } else {
            return 3;
    }}

function reset(){
    tablero = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    jugador = 1;
    $("table tr td").html(""); 
    $("#tableroT").css("background-color", "");
    $("#tableroT").addClass("disponible");
    $("#turnoJugador1").removeClass("turno1");
    $("#turnoJugador2").removeClass("turno2");
    $("#resultado").html(" ");  
    cargarDatos();
    }