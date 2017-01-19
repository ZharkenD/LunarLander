var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var g = 1.622;
var a = g;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
var fuelInicial=100;
var fuel = fuelInicial;
var hayFuel = true;
var alturaAterrizaje = 70;
var popup = false;
var velCaput = 5;
var caput = false;

//al cargar por completo la página...
window.onload = function(){
	//definición de eventos
	//mostrar menú móvil
    	document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "block";
		stop();
	}
	//ocultar menú móvil
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "none";
		start();
	}
	//encender/apagar el motor al hacer click en la pantalla
	document.ontouchstart = motorOn;
	document.ontouchend = motorOff;
	//encender/apagar al apretar/soltar una tecla
	document.onkeydown = motorOn;
	document.onkeyup = motorOff;
	//Empezar a mover nave
	start();
	
	
	document.getElementById("instructions").onclick = function() {
		if (popup == false){
			document.getElementsByClassName("f")[0].style.display = "block";
			popup = true;
			stop();
		}
	}

	document.getElementById("opciones").onclick = function() {
		if (popup == false){
			document.getElementsByClassName("k")[0].style.display = "block";
			popup = true;
			stop();
		}
	}
	
	document.getElementById("about").onclick = function() {
		if (popup == false){
			document.getElementsByClassName("ab")[0].style.display = "block";
			popup = true;
			stop();
		}
	}
	
	document.getElementById("insContinue").onclick = function() {
		document.getElementsByClassName("f")[0].style.display = "none";
		popup = false;
		start();
	}
	
	document.getElementById("difContinue").onclick = function() {
		document.getElementsByClassName("k")[0].style.display = "none";
		popup = false;
		start();
	}
	
	document.getElementById("aboutContinue").onclick = function() {
		document.getElementsByClassName("ab")[0].style.display = "none";
		popup = false;
		start();
	}
	
	
	document.getElementById("difRestart").onclick = function() {
		document.getElementsByClassName("k")[0].style.display = "none";
		popup = false;
		restart();
		start();
	}
	
	document.getElementById("winContinue").onclick = function() {
		document.getElementsByClassName("win")[0].style.display = "none";
		popup = false;
		restart();
		start();
	}
	
	document.getElementById("caputContinue").onclick = function() {
		document.getElementsByClassName("caput")[0].style.display = "none";
		popup = false;
		restart();
		start();
	}
	
	document.getElementById("Facil").onclick = function() {
		ponerFacil();
		restart();
	}
	
	document.getElementById("Normal").onclick = function(){
		ponerNormal();
		restart();
	}
	
	document.getElementById("Chungo").onclick = function(){
		ponerChungo();
		restart();
	}
	
}

//Definición de funciones
function ponerFacil(){
	fuelInicial = 100;
	velCaput = 5;
	borrarMarcasDif();
	document.getElementById("Facil").style.textDecoration = "underline";
}

function ponerNormal(){
	fuelInicial = 50;
	velCaput = 2.5;
	borrarMarcasDif();
	document.getElementById("Normal").style.textDecoration = "underline";
}

function ponerChungo(){
	fuelInicial = 50;
	velCaput = 1;
	borrarMarcasDif();
	document.getElementById("Chungo").style.textDecoration = "underline";
}

function start(){
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	v +=a*dt;
	document.getElementById("velocidad").innerHTML=v.toFixed(2);
	y +=v*dt;
	document.getElementById("altura").innerHTML=(alturaAterrizaje - y).toFixed(2);
	
	//mover hasta que top sea un 70% de la pantalla
	if (y<70){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else { 
		stop();
		comprovarCaput();
	}
}
function motorOn(){
	if(fuel > 0 && y < alturaAterrizaje && popup == false){
		a=-g;
	if (timerFuel==null)
		timerFuel=setInterval(function(){ actualizarFuel(); }, 10);	
		document.getElementById("naveimg").src = "img/nave2.gif";
	}
}
function motorOff(){
	if(caput == false){
		a=g;
		clearInterval(timerFuel);
		timerFuel=null;
		document.getElementById("naveimg").src = "img/nave.png";
	}else{
		
	}
}
function actualizarFuel(){
	//Aquí hay que cambiar el valor del marcador de Fuel...
	if(hayFuel==true){
		fuel-=0.1;
			if(fuel <= 0){
				hayFuel=false;
				motorOff;
				fuel = 0;
			}
	document.getElementById("fuel").innerHTML=fuel.toFixed(2);	
	}
	
}

function restart(){
	y = 10;
	v = 0;
	fuel = fuelInicial
	document.getElementById("fuel").innerHTML=fuel.toFixed(2);
	document.getElementById("naveimg").src = "img/nave.png";
	clearInterval(timer);
	clearInterval(timerFuel);
	timer = null;
	timerFuel = null;
	caput = false;
	motorOff();
	
}

function comprovarCaput(){
	document.getElementById("altura").innerHTML=0;
	if (v > velCaput){
		caput = true;
		document.getElementById("naveimg").src = "img/blast.gif";
		document.getElementsByClassName("caput")[0].style.display = "block";
			popup = true;
	}else{
		document.getElementsByClassName("win")[0].style.display = "block";
			popup = true;
			stop();
	}
}

function borrarMarcasDif(){
	document.getElementById("Facil").style.textDecoration = "none";
	document.getElementById("Normal").style.textDecoration = "none";
	document.getElementById("Chungo").style.textDecoration = "none";
}
