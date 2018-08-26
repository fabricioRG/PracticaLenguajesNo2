const TERMINAL_IDENTIFICADOR = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const TERMINAL_NUMERO = ['0','1','2','3','4','5','6','7','8','9'];
const TERMINAL_PUNTUACION = ['.',',',';',':'];
const TERMINAL_OPERADOR = ['+','-','*','/','%'];
const TERMINAL_AGRUPACION =['(',')','[',']','{','}'];
const TOKEN_SIN_DEFINIR = "Sin definir";
const TOKEN_IDENTIFICADOR = "Identificador";
const TOKEN_NUMERO = "Numero";
const TOKEN_DECIMAL = "Decimal";
const TOKEN_PUNTUACION = "Puntuacion";
const TOKEN_OPERADOR = "Operador";
const TOKEN_AGRUPACION = "Agrupacion";

function compararCaracter(caracter){
	var token = TOKEN_SIN_DEFINIR;
	var tipoToken = 0;
	if(comparar(caracter[0], TERMINAL_IDENTIFICADOR) == 1){
		token = TOKEN_IDENTIFICADOR;
		tipoToken = 1;
	} else if(comparar(caracter[0], TERMINAL_NUMERO) == 1){
		token = TOKEN_NUMERO;
		tipoToken = 2;
	} else if(caracter.length == 1){
		if((comparar(caracter[0], TERMINAL_PUNTUACION) == 1)){
			return TOKEN_PUNTUACION;
		} else if(comparar(caracter[0], TERMINAL_OPERADOR) == 1){
			return TOKEN_OPERADOR;
		} else if(comparar(caracter[0], TERMINAL_AGRUPACION) == 1){
			return TOKEN_AGRUPACION;
		} else {
			return 0;
		}
	} else if(caracter.length > 1){
		return 1;
	} else {
		return 0;
	}
	var punto = 0;
	for (var i = 0; i < caracter.length; i++) {
		if(tipoToken == 0){
			break;
		} else if(tipoToken == 1){
			if((comparar(caracter[i], TERMINAL_IDENTIFICADOR) == 0) && (comparar(caracter[i], TERMINAL_NUMERO) == 0)){
			token = i;
			break;
			}
		} else if(tipoToken == 2){
			var comparacion = esNumero(caracter[i]);
			if(comparacion == 2){
				token = TOKEN_DECIMAL;
				punto++;
				if(punto > 1){
				token = i;
				break;
				}
			} else if(comparacion == 0){
				token = i;
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

function esNumero(ctr){
	var estado = 0;
	for (var i = 0; i < TERMINAL_NUMERO.length; i++) {
		if(ctr == TERMINAL_NUMERO[i]){
			estado = 1;
			break;
		} else if (ctr == TERMINAL_PUNTUACION[0]){
			estado = 2;
			break;
		}
	}
	return estado;
}