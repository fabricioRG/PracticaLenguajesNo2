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