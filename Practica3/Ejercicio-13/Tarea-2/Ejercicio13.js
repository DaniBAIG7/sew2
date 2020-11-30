
class MapLinker {

    constructor() {
        this.map = null;
    }

    // enlazar() {
    //     this.map = this.initMap();
    //     let archivo = document.getElementById("subirKML").files[0];
    //     let kmlParseado = reader.parsearDocumento(archivo);
    //     this.printPolyLines(kmlParseado);
    // }

    initMap() {
        this.map = new google.maps.Map(document.getElementById("mapa"), {
            zoom: 7,
            center: { lat: 42.346277545456424, lng: -3.6981268205957583 },
            mapTypeId: "terrain",
        });
    }

    printPolyLines(salidaExtraccion) {
        for(let polylineRuta of salidaExtraccion) {
            const polyLine = new google.maps.Polyline({
                path: polylineRuta,
                geodesic: true,
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
            });

            polyLine.setMap(this.map);
        }
    }

}

var parser = new MapLinker();


class GeoJSONReader {

    leer() {
        parser.initMap();
        let archivo = document.getElementById("subirGeoJSON").files[0];
        this.parsearDocumento(archivo);
    }

    parsearDocumento(file) {
       // if(file.type.match(/geojson.*/)) {
            let fileReader = new FileReader();
            fileReader.onload = async (e) => {
            let result = await this.extraerCoordenadas(e.target.result);
            parser.printPolyLines(result);
            }
            fileReader.readAsText(file);
       // } else {
       //     alert("La carfa desde la máquina local debe ser de archivos .geojson");
       // }
        
    }

    async extraerCoordenadas(texto) {
        var geoJsonDoc = JSON.parse(texto);
        console.log(geoJsonDoc);
        let polyLines = [];
        let i = 0;
        for(let polyLineRuta of geoJsonDoc.features) {
            polyLines.push([]);
            for(var coordenada of polyLineRuta.geometry.coordinates) {
                let coordenadaPoly = {
                    lat: coordenada[1],
                    lng: coordenada[0],
                };
                polyLines[i].push(coordenadaPoly);
            }
            i++;
        }

        return polyLines;
    }
}

var reader = new GeoJSONReader();