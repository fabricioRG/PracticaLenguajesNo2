const encabezadoTabla = "<tr><th>Token</th><th>Lexema</th><th>Fila</th><th>Columna</th></tr>";

function reporteErrores(titulo, tabla){
	document.getElementById(titulo).innerHTML = "Errores";
	document.getElementById(tabla).innerHTML = encabezadoTabla;
}