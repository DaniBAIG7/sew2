
class FileManager {

    mostrarArchivos() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            //El navegador soporta el API File
            this.calcularTamañoArchivos();
            let archivos = document.getElementById("subirArchivos").files;
            let nArchivos = archivos.length;
            for (let i = 0; i < nArchivos; i++) {
                this.leerArchivo(archivos[i]);
            }
        }
        else document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");

    }

    calcularTamañoArchivos() {
        var nBytes = 0,
            archivos = document.getElementById("subirArchivos").files,
            nArchivos = archivos.length;
        for (var i = 0; i < nArchivos; i++) {
            nBytes += archivos[i].size;
        }
        var nombresTiposTamaños = "";
        for (var i = 0; i < nArchivos; i++) {
            nombresTiposTamaños += "<p>Archivo[" + i + "] = " + archivos[i].name + " Tamaño: " + archivos[i].size + " bytes " + " Tipo: " + archivos[i].type + "</p>";
        }
    
        document.getElementById("numero").innerHTML = nArchivos;
        document.getElementById("tamaño").innerHTML = nBytes + " bytes";
        document.getElementById("nombres").innerHTML = nombresTiposTamaños;
    }

    leerArchivo(file) {
        var archivo = file;
        let fileText = "<article id=\""+archivo.name+"\"><h2>Archivo: "+archivo.name+"</h2></article>"
        document.getElementById('filesInfo').innerHTML += fileText;
        document.getElementById(archivo.name).innerHTML += "<p>Nombre del archivo: " + archivo.name + "</p>";
        document.getElementById(archivo.name).innerHTML += "<p>Tamaño del archivo: " + archivo.size + "</p>";
        document.getElementById(archivo.name).innerHTML += "<p>Tipo del archivo: " + archivo.type + "</p>";
        document.getElementById(archivo.name).innerHTML += "<p>Fecha del archivo: " + archivo.lastModifiedDate + "</p>";
        
        var tipoTexto = /text.*/;
        var tipoJson = /json.*/;
        var tipoXml = /xml.*/;
        if (archivo.type.match(tipoTexto) || archivo.type.match(tipoJson) || archivo.type.match(tipoXml)) {
            document.getElementById(archivo.name).innerHTML += "<h3>Texto del contenido:</h3>"
            document.getElementById(archivo.name).innerHTML += "<span id=\"contenido" + archivo.name + "\">Contenido del archivo: " + archivo.name + "</span>";
            var lector = new FileReader();
            lector.onload = function (evento) {
                
                document.getElementById("contenido" + archivo.name).innerText = lector.result;
            }
            lector.readAsText(archivo);
        }
        else {
            errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
        }
    
        
    }

}
var fm = new FileManager();