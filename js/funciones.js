var miVariable = "Hola";

function textoCargado(id) {
	document.getElementById(id).innerHTML = contenidoArchivo();
}

function contenidoArchivo(){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if (this.readyState==4 && this.status==200) {
			document.getElementById('cargaTexto').innerHTML = this.responseText;
		}
	};
	xhr.open("GET","texto.txt", true);
	xhr.send();
}
	
