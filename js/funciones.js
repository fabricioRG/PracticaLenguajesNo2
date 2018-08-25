var finalTable = "<table>";
var contadorLineas = 0; //Variable utilizada para llevar el conteo global de las lineas del texto

/* Variable creada para leer archivos la cual se activa al seleccionar un archivo desde el boton para
cargar archivo, la cual tiene una funcion que carga el archivo en un div editable */
var openFile = function(event) {
  var input = event.target;
  var reader = new FileReader();
  reader.onload = function(){
    var text = reader.result;
    var node = document.getElementById('divEditable');
    node.innerText = text;
    console.log(reader.result.substring(0, 200));
  };
  reader.readAsText(input.files[0]);
};

/* Funcion que se activa al seleccionar el boton "Cargar Archivo", y la funcion al
inicializarse empieza por recoger el texto, eliminar todos los espacios posibles para
verificar que se tenga al menos un caracter o mas dentro del div, para despues separar la
cadena por cada salto de linea, y enviadolo como parametro a la funcion Analizar */
function analizarTexto(id){
  var textoAnalizar = document.getElementById(id).innerText;
  var newString = textoAnalizar.replace(/\s/g, "");
  if(newString != ""){
    strCadena = textoAnalizar.split("\n");
    for (var i = 0; i < strCadena.length; i++) {
      if(eliminarEspacio(strCadena[i]) != ""){
        var cadena = strCadena[i].split(" ");
        AUTOMATA.analizar(cadena, contadorLineas, cadena.length);
      }
      if(i == (strCadena.length - 1)){
        contadorLineas = 0;
      }
    }
  } else {
    alert("No hay contenido cargado");
  }
}

//Funcion utilizada para verificar que la cadena que se leera no este vacia
function eliminarEspacio(str, i){
  newString = str.replace(/\s/g, '');
  contadorLineas++;
  return newString;
}

//Clase creada para tratar con un pequeño automata
class Automata {

/* Funcion propia de la clase Automata la cual utiliza un ciclo para analizar cada
caracter de la cadena a analizar */
  analizar(cadena, fila, tamaño){
    var contadorColumnas = 1;
    var columnaActual;
    var errores = 0;
    for (var i = 0; i < cadena.length; i++) {
      var token = compararCaracter(cadena[i].split(''));
      if(esNumero(token) == 1){
        columnaActual = (contadorColumnas + token);
        token = "Error";
        errores++;
      } else {
        columnaActual = contadorColumnas;
      }
      alert("\"" + cadena[i] + "\"\n Token: " + token + " | Fila: " + fila + " | Columna: " + (columnaActual));
      contadorColumnas += cadena[i].length;
      contadorColumnas++;
    }
    REPORTE.obtenerTabla(errores);
  }
}

const AUTOMATA = new Automata();

class Reporte{

  obtenerTabla(errores){
    if(errores > 0){
      reporteErrores('subtituloErrores','customers');
    } else {
      alert("No hay errores we :v");
    }
  }

}

const REPORTE = new Reporte();