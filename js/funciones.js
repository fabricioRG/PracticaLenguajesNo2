const ENCABEZADO_TABLA_ERRORES = "<tr><th>Cadena</th><th>Columna</th><th>Fila</th></tr>";
const ENCABEZADO_TABLA_TOKENS = "<tr><th>Token</th><th>Lexema</th><th>Columna</th><th>Fila</th></tr>";
const SUBTITULO_ERRORES = '<h2 id="subtituloErrores">Reporte de Errores</h2>';
const SUBTITULO_TOKENS = '<h2 id="subtituloTokens">Reporte de Tokens</h2>';
var contadorLineas = 0; //Variable utilizada para llevar el conteo global de las lineas del texto
var tableErrores;
var tableTokens;
var errores;
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
  tableErrores = " ";
  tableTokens = " ";
  var strCadena;
  errores = 0;
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
    reportes('subtituloReporte', 'customers');
  } else {
    alert("No hay contenido cargado");
  }
}

function reportes(id1, id2){
  if(errores > 0){
      document.getElementById(id1).innerHTML = SUBTITULO_ERRORES;
      document.getElementById(id2).innerHTML = ENCABEZADO_TABLA_ERRORES + tableErrores;
    } else {
      document.getElementById(id1).innerHTML = SUBTITULO_TOKENS;
      document.getElementById(id2).innerHTML = ENCABEZADO_TABLA_TOKENS + tableTokens;
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
    var columnaErrores = [];
    var filaErrores = [];
    var cadenaErrores = [];
    var cadenaTokens = [];
    var cadenaLexemas = [];
    var filaTokens = [];
    var columnaTokens = [];
    for (var i = 0; i < cadena.length; i++) {
      var token = compararCaracter(cadena[i].split(''));
      var tokenTemporal = "" + token + "";
      if(esNumero(tokenTemporal.split('')[0]) == 1){
        columnaActual = (contadorColumnas + token);
        columnaErrores.push(columnaActual);
        filaErrores.push(fila);
        cadenaErrores.push(cadena[i]);
        errores++;
      } else {
        columnaActual = contadorColumnas;
        cadenaTokens.push(token);
        cadenaLexemas.push(cadena[i]);
        filaTokens.push(fila);
        columnaTokens.push(columnaActual);
      }
      /*alert("\"" + cadena[i] + "\"\n Token: " + token + " | Fila: " + fila + " | Columna: " + (columnaActual));*/
      contadorColumnas += cadena[i].length;
      contadorColumnas++;
    }
    if(errores > 0){
      tableErrores += REPORTE.tablaErrores(columnaErrores, filaErrores, cadenaErrores);
    } else {
      tableTokens += REPORTE.tablaTokens(cadenaTokens, cadenaLexemas, columnaTokens, filaTokens);
    }
  }
}

const AUTOMATA = new Automata();

class Reporte{

  tablaErrores(columnas, filas, errores){
    return reporteErrores(columnas, filas, errores);
  }
  tablaTokens(tokens, lexemas, columnas, filas){
    return reporteTokens(tokens, lexemas, columnas, filas);
  }
}

const REPORTE = new Reporte();