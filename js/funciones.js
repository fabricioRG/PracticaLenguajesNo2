const ENCABEZADO_TABLA_ERRORES = '<tr id="errores"><th>Cadena</th><th>Columna</th><th>Fila</th></tr>';
const ENCABEZADO_TABLA_TOKENS = '<tr id="tokens"><th>Token</th><th>Lexema</th><th>Columna</th><th>Fila</th></tr>';
const ENCABEZADO_TABLA_RECUENTO = '<tr id="recuento"><th>Lexema</th><th>Cantidad</th>';
const SUBTITULO_ERRORES = '<h2 id="subtituloErrores">Reporte de Errores</h2>';
const SUBTITULO_TOKENS = '<h2 id="subtituloTokens">Reporte de Tokens</h2>';
const SUBTITULO_RECUENTO_LEXEMAS = '<h2 id="subtituloRecuentoTokens">Recuento de Tokens</h2>';
const SUBTITULO_BUSQUEDA_PATRONES = '<h2 id="subtituloB">Busqueda de Patrones</h2>';
const ABRIR_TABLE = '<table id="customers">';
const CERRAR_TABLE = '</table><br><br><br>';
const ABRIR_PARRAFO = '<p id="textoSubrayado" class="parrafo">';
const CERRAR_PARRAFO = '</p>';
var contadorLineas = 0; //Variable utilizada para llevar el conteo global de las lineas del texto
var tableErrores;
var tableTokens;
var tableLexemas;
var errores;
var lexemasFinales;
var textoModificado;
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
  lexemasFinales = [];
  tableErrores = " ";
  tableTokens = " ";
  tableLexemas = " ";
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
    reportes('subtituloReporte', 'tables', 'subtituloRecuento', 'recuentoDeLexemas');
  } else {
    alert("No hay contenido cargado");
  }
}

/*Funcion cuyo proposito es mandar a llamar todos los componentes para generar las tablas o reportes*/
function reportes(id1, id2, id3, id4){
  if(errores > 0){
      document.getElementById(id1).innerHTML = SUBTITULO_ERRORES;
      document.getElementById(id2).innerHTML = ABRIR_TABLE + ENCABEZADO_TABLA_ERRORES + tableErrores + CERRAR_TABLE;
      document.getElementById(id3).innerHTML = " ";
      document.getElementById(id4).innerHTML = " ";
    } else {
      tableLexemas += REPORTE.tablaLexemas(lexemasFinales);
      document.getElementById(id1).innerHTML = SUBTITULO_TOKENS;
      document.getElementById(id2).innerHTML = ABRIR_TABLE + ENCABEZADO_TABLA_TOKENS + tableTokens + CERRAR_TABLE;
      document.getElementById(id3).innerHTML = SUBTITULO_RECUENTO_LEXEMAS;
      document.getElementById(id4).innerHTML = ABRIR_TABLE + ENCABEZADO_TABLA_RECUENTO + tableLexemas + CERRAR_TABLE;
    }
}

//Funcion utilizada para verificar que la cadena que se leera no este vacia
function eliminarEspacio(str){
  newString = str.replace(/\s/g, '');
  contadorLineas++;
  return newString;
}

//Clase creada para tratar con un pequeño automata
class Automata {

/* Funcion propia de la clase Automata la cual utiliza un ciclo para analizar cada
caracter de la fila a analizar */
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
        var cantidad = REPORTE.buscarLexemas(lexemasFinales, cadena[i]);
        if( cantidad == 0){
          lexemasFinales.push(cadena[i] + "=" + 1);
        } else {
          lexemasFinales[REPORTE.posicionLexema(lexemasFinales, cadena[i])] = cadena[i] + "=" + (cantidad + 1);
        }
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

/*Funcion que manda a llamar la funcion compararCadenas del documento JS automata y da como resultado una cadena nueva*/
  analizarTxt(cadena, texto){
      return compararCadenas(cadena, texto);
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

  buscarLexemas(lexemas, lexemaActual){
    return compararLexemas(lexemas, lexemaActual);
  }

  posicionLexema(lexemas, lexemaBuscar){
    return buscarPosicion(lexemas, lexemaBuscar);
  }

  tablaLexemas(lexemas){
    return reporteLexemas(lexemas);
  }
}

const REPORTE = new Reporte();

function buscarTexto(id, id2, id3, id4){
  textoModificado = " ";
  var texto = document.getElementById(id).value;
  var nuevoTexto = texto.replace(/\s/g, '')
  if(nuevoTexto != ""){
  var textoAnalizar = document.getElementById(id2).innerText;
  var newString = textoAnalizar.replace(/\s/g, "");
  if(newString != ""){
    strCadena = textoAnalizar.split("\n");
    for (var i = 0; i < strCadena.length; i++) {
      if((strCadena[i].replace(/\s/g, '')) != ""){
        var cadena = strCadena[i].split(" ");
        textoModificado += AUTOMATA.analizarTxt(cadena, nuevoTexto) + "<br>";
      } else {
        textoModificado += "<br>";
      }
    }
  } else {
    alert("No hay contenido cargado");
  }
    document.getElementById(id3).innerHTML = SUBTITULO_BUSQUEDA_PATRONES; 
    document.getElementById(id4).innerHTML = ABRIR_PARRAFO + textoModificado + CERRAR_TABLE;
  } else {
    alert("No hay texto por buscar");
  }
}