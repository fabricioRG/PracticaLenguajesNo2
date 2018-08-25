const TERMINAL_IDENTIFICADOR = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

const TERMINAL_NUMERO = ['0','1','2','3','4','5','6','7','8','9'];

const TERMINAL_PUNTUACION = ['.',',',';',':'];

const TERMINAL_OPERADOR = ['+','-','*','/','%'];

const TERMINAL_AGRUPACION =['(',')','[',']','{','}'];

function compararCaracter(caracter){
	var token = "Sin definnir";
	var tipoToken = 0;
	if(esIdentificador(caracter[0]) == 1){
		token = "Identificador";
		tipoToken = 1;
	} else if(esNumero(caracter[0]) == 1){
		token = "Numero";
		tipoToken = 2;
	} else if(caracter.length == 1){
		if((esSignoPuntuacion(caracter[0]) == 1)){
			return "Puntuacion";
		} else if(esOperador(caracter[0]) == 1){
			return "Operador";
		} else if(esAgrupacion(caracter[0]) == 1){
			return "Agrupacion";
		}
	} else {
		return token;
	}
	for (var i = 0; i < caracter.length; i++) {
		if(tipoToken == 0){
			break;
		} else if(tipoToken == 1){
			if((esIdentificador(caracter[i]) == 0) && (esNumero(caracter[i]) == 0)){
			token = "No Identificador";
			break;
			}
		} else if(tipoToken == 2){
			if(esNumero(caracter[i]) == 0){
				token = "No Numero";
				break;
			}
		}
	}
	return token;
}

function comparar(ctr, TERMINAL){
	var estado = 0;
	for (var i = 0; i < TERMINAL.length; i++) {
		if(ctr == TERMINAL[i]){
			estado = 1;
			break;
		}
	}
	return estado;
}

function esIdentificador(ctr){
	var estadoId = 0;
	for (var i = 0; i < TERMINAL_IDENTIFICADOR.length; i++) {
		if(ctr == TERMINAL_IDENTIFICADOR[i]){
			estadoId = 1;
			break;
		}
	}
	return estadoId;
}

function esNumero(ctr){
	var estadoNo = 0;
	for (var i = 0; i < TERMINAL_NUMERO.length; i++) {
		if(ctr == TERMINAL_NUMERO[i]){
			estadoNo = 1;
			break;
		}
	}
	return estadoNo;
}

function esSignoPuntuacion(ctr){
	var estadoPu = 0;
	for (var i = 0; i < TERMINAL_PUNTUACION.length; i++) {
		if(ctr == TERMINAL_PUNTUACION[i]){
			estadoPu = 1;
			break;
		}
	}
	return estadoPu;
}

function esOperador(ctr){
	var estadoOp = 0;
	for (var i = 0; i < TERMINAL_OPERADOR.length; i++) {
		if(ctr == TERMINAL_OPERADOR[i]){
			estadoOp = 1;
			break;
		}
	}
	return estadoOp;
}

function esAgrupacion(ctr){
	var estadoAg = 0;
	for (var i = 0; i < TERMINAL_AGRUPACION.length; i++) {
		if(ctr == TERMINAL_AGRUPACION[i]){
			estadoAg = 1;
			break;
		}
	}
	return estadoAg;
}