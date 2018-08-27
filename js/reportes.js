const ABRIR_FILA = "<tr>";
const CERRAR_FILA = "</tr>";
const ABRIR_CELDA = "<td>";
const CERRAR_CELDA = "</td>";

function reporteErrores(columnas, filas, errores){
	var tabla = " ";
	for (var i = 0; i < errores.length; i++) {
		tabla += ABRIR_FILA+ABRIR_CELDA+errores[i]+CERRAR_CELDA+ABRIR_CELDA+columnas[i]+CERRAR_CELDA+ABRIR_CELDA+filas[i]+CERRAR_CELDA+CERRAR_FILA;
	}
	return tabla;
}

function reporteTokens(tokens, lexemas, columnas, filas){
	var tabla = " ";
	for (var i = 0; i < tokens.length; i++) {
		tabla += ABRIR_FILA+ABRIR_CELDA+tokens[i]+CERRAR_CELDA+ABRIR_CELDA+lexemas[i]+CERRAR_CELDA+ABRIR_CELDA+columnas[i]+CERRAR_CELDA+ABRIR_CELDA+filas[i]+CERRAR_CELDA+CERRAR_FILA;	
	}
	return tabla;
}

function compararLexemas(lexemas, lexemaActual){
	var lexemaTemporal;
	for (var i = 0; i < lexemas.length; i++) {
		lexemaTemporal = lexemas[i].split('=');
		if(lexemaActual == lexemaTemporal[0]){
			return parseInt(lexemaTemporal[1]);
		}
	}
	return 0;
}

function buscarPosicion(lexemas, lexemaBuscar){
	var lexemaTemporal;
	for (var i = 0; i < lexemas.length; i++) {
		lexemaTemporal = lexemas[i].split('=');
		if(lexemaBuscar == lexemaTemporal[0]){
			return i;
		}
	}
}

function reporteLexemas(lexemas){
	var tabla = " ";
	var lexemaTemporal;
	for (var i = 0; i < lexemas.length; i++) {
		lexemaTemporal = lexemas[i].split('=');
		tabla += ABRIR_FILA+ABRIR_CELDA+lexemaTemporal[0]+CERRAR_CELDA+ABRIR_CELDA+lexemaTemporal[1]+CERRAR_CELDA+CERRAR_FILA;
	}
	return tabla;
}