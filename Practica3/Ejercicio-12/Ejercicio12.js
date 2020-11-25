
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
        //Solamente toma un archivo
        //var archivo = document.getElementById("archivoTexto").file;
        var archivo = file;
        nombre.innerText = "Nombre del archivo: " + archivo.name;
        tamaño.innerText = "Tamaño del archivo: " + archivo.size + " bytes";
        tipo.innerText = "Tipo del archivo: " + archivo.type;
        ultima.innerText = "Fecha de la última modificación: " + archivo.lastModifiedDate;
        contenido.innerText = "Contenido del archivo de texto:"
        //Solamente admite archivos de tipo texto
        var tipoTexto = /text.*/;
        var tipoJson = /json.*/;
        var tipoXml = /xml.*/;
        if (archivo.type.match(tipoTexto) || archivo.type.match(tipoJson) || archivo.type.match(tipoXml)) {
            var lector = new FileReader();
            lector.onload = function (evento) {
                //El evento "onload" se lleva a cabo cada vez que se completa con éxito una operación de lectura
                //La propiedad "result" es donde se almacena el contenido del archivo
                //Esta propiedad solamente es válida cuando se termina la operación de lectura
                
                areaVisualizacion.innerText = lector.result;
            }
            lector.readAsText(archivo);
        }
        else {
            errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
        }
    
        
    }

}
var fm = new FileManager();