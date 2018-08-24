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

const automata = new Automata();

function analizarTexto(id){
  var texto = document.getElementById(id);
  var strAnalizar = texto.innerText;
  var newString = strAnalizar.replace(/\s/g, "");
  if(newString != ""){
    strCadena = strAnalizar.split("\n");
    for (var i = 0; i < strCadena.length; i++) {
      if(eliminarEspacio(strCadena[i]) != ""){
        var cadena = strCadena[i].split(" ");
        autonoma.analizar(cadena, contadorLineas);
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
