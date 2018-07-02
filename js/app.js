/*----------------------------------------------------- Varibles Instancia-----------------------------------------*/
var teclas = document.getElementsByClassName('tecla');
var display = document.getElementsByClassName('pantalla');
var calculo = [], ultimoOperador = [];

/*----------------------------------------------------- Asignación de Eventos -------------------------------------*/

// Convertimos teclas a array y lo recorremos para asignar sus eventos
Array.from(teclas).map(function(t){
	// Evento mousedown de las teclas
	t.addEventListener('mousedown', function(){
	  t.style = "padding:2px";
	});

	// Evento mouseup de las teclas
	t.addEventListener('mouseup', function(){
	  t.style = "padding:0px";
	});

	// Evento click de las teclas
	t.addEventListener('click', function(){
	  TeclaClick(t);
	});
});


/*----------------------------------------------------- Funciones ------------------------------------------------*/

// Funciónalidad del Click en las teclas
function TeclaClick(tecla){
	console.log(tecla.alt);

	var dataDisplay = display[0].textContent.trim();

	switch (true) {
		case tecla.alt >= 0:	// Si se presiona un número
			if (dataDisplay.length < 8) {	// Permitir nada mas 8 caracteres
				if (dataDisplay == "0" || dataDisplay == undefined) {
					dataDisplay = tecla.alt;
				}else{
					if (dataDisplay == "-0" && tecla.alt == "0") {	// Si se va a ingresar un número negativo decimal
					}else{
						dataDisplay = dataDisplay + tecla.alt;
						if (tecla.alt == "0" && dataDisplay.length > 0) {
						}else {
							dataDisplay = dataDisplay * 1;
						}
					}
				};
			}

			break;
		case tecla.alt == "On": // Si se presiona el Limpiar
			dataDisplay = "0";
			calculo = [];
			ultimoOperador = [];
			break;
		case tecla.alt == "punto":	// Si se presiona el punto
			if (dataDisplay.indexOf(".") > 0) {
			}
			else{
				dataDisplay = dataDisplay + ".";
			}
			break;
		case tecla.alt == "menos" || tecla.alt == "mas" || tecla.alt == "por" || tecla.alt == "dividido" || tecla.alt == "igual":	// Signo de Operacion
			if (dataDisplay == "0" && tecla.alt == "menos") {	// Se ingresara un número negativo
				dataDisplay = "-";
			}else{	// Se realizara la operacion de resta
				dataDisplay = AlmacenarCalculo(tecla, dataDisplay);
			}
			break;
		case tecla.alt == "signo":	// Cambiar el signo del número en pantalla
			if (dataDisplay >= 0 || dataDisplay < 0) {
				dataDisplay = dataDisplay * -1;
			}

			break;
	}

	display[0].innerHTML = '<span id="display">' + dataDisplay + '</span>';
}

function AlmacenarCalculo(tecla, dataDisplay){
	var posicionArray = calculo.length;
	if (dataDisplay > 0 || dataDisplay < 0) {
		calculo[posicionArray] = dataDisplay;
		posicionArray = posicionArray + 1;

		if (tecla.alt == "igual") {
			dataDisplay = GenerarResultado();
		}else{
			calculo[posicionArray] = tecla.alt;
			dataDisplay = "0";
		}
	}
	else{
		if (posicionArray > 0 && tecla.alt == "igual") {
			dataDisplay = GenerarResultado();
		}
	}
	console.log(calculo);
	return dataDisplay;
}

function GenerarResultado(){
	var resultado = 0;

	if (calculo.length == 1 && ultimoOperador.length == 2 && (display[0].textContent.trim() * 1) >= 0) {
		calculo[1] = ultimoOperador[0];
		calculo[2] = ultimoOperador[1];
	}

	if (calculo.length > 1) {
		resultado = calculo[0] * 1;

		for (var i = 1; i < calculo.length; i++) {
			if (calculo.length > (i + 1)) {
				switch (calculo[i]) {
					case "mas":
						resultado = resultado + (calculo[i + 1] * 1);
						break;
					case "menos":
						resultado = resultado - (calculo[i + 1] * 1);
						break;
					case "por":
						resultado = resultado * (calculo[i + 1] * 1);
						break;
					case "dividido":
						resultado = resultado / (calculo[i + 1] * 1);
						break;
				}
				ultimoOperador[0] = calculo[i];
				ultimoOperador[1]	= calculo[i + 1];
			}
			i = i + 1;
		}
	}else{
		if (calculo.length = 1){
			resultado = calculo[0];
		}
	}

	if (resultado >= 0 || resultado < 0) {
	}else {
		resultado = 0;
	}
	if (resultado.toString().length > 8) {
		resultado = resultado.toString().substring(0,8);
	}

	calculo = [];

	return resultado;
}
