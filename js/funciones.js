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
  var texto = document.getElementById(id);
  var strAnalizar = texto.innerText;
  if(strAnalizar != ""){
    alert(strAnalizar);
  } else {
    alert("No hay contenido cargado");
  }
}

