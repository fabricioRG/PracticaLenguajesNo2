var contadorLineas = 0;

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


function analizarTexto(id){
  var textoDivEditable = document.getElementById(id);
  var textoAnalizar = textoDivEditable.innerText;
  var newString = textoAnalizar.replace(/\s/g, "");
  if(newString != ""){
    strCadena = textoAnalizar.split("\n");
    for (var i = 0; i < strCadena.length; i++) {
      if(eliminarEspacio(strCadena[i]) != ""){
        var cadena = strCadena[i].split(" ");
        AUTOMATA.analizar(cadena, contadorLineas);
        /*alert(contadorLineas + ". " + strCadena[i]);*/
      }
      if(i == (strCadena.length - 1)){
        contadorLineas = 0;
      }
    }
  } else {
    alert("No hay contenido cargado");
  }
}

function eliminarEspacio(str, i){
  newString = str.replace(/\s/g, '');
  contadorLineas++;
  return newString;
}

class Automata {

  analizar(cadena, fila){
    for (var i = 0; i < cadena.length; i++) {
      var caracteres = cadena[i].split('');
      alert("\"" + cadena[i] + "\"\n Token: " + compararCaracter(caracteres) + " | Fila: " + fila + " | Columna: " + (i + 1));
    }
  }
}

const AUTOMATA = new Automata();

