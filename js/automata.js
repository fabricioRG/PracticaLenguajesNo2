class Automata {

constructor(){}

	const TERMINAL_IDENTIFICADOR = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u',
'v','w','x','y','z'];

const TERMINAL_NUMERO = ['0','1','2','3','4','5','6','7','8','9'];

const TERMINAL_PUNTUACION = ['.',',',';',':'];

const TERMINAL_OPERADOR = ['+','-','*','/','%'];

const TERMINAL_AGRUPACION =['(',')','[',']','{','}'];

function analizar(cadena, fila){
	for (var i = 0; i < cadena.length; i++) {
		var caracteres = cadena[i].split('');
		alert(cadena[i] + ": " + compararCaracter(caracteres));
	}
}

function compararCaracter(caracter){
	var token = undefined;
	for (var i = 0; i < caracter.length; i++) {
		if(esIdentificador(caracter[i]) == 1){
			return "Identificador";
		} else {
			return "Indefinido";
		}
	}
}

function esIdentificador(ctr){
	var estado = 0;
	for (var i = 0; i < TERMINAL_IDENTIFICADOR.length; i++) {
		if(ctr == TERMINAL_IDENTIFICADOR[i]){
			estado = 1;
			break;
		}
	}
	return estado;
}

}