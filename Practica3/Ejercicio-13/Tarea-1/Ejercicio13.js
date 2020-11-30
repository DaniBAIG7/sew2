
class MapLinker {

    constructor() {
        this.map = null;
    }

    initMap() {
        this.map = new google.maps.Map(document.getElementById("mapa"), {
            zoom: 7,
            center: { lat: 42.346277545456424, lng: -3.6981268205957583 },
            mapTypeId: "terrain",
        });
    }

    printPolyLines(salidaExtraccion) {
        let coordenadasPolyLine = salidaExtraccion;

        let x = 0;
        let polylinesRutas = [[]];
        polylinesRutas[0].push(coordenadasPolyLine[0]);
        for(let i = 1; i < coordenadasPolyLine.length; i++) {
            if(coordenadasPolyLine[i].name != coordenadasPolyLine[i-1].name){
                x++;
                polylinesRutas.push([]);
            }
            polylinesRutas[x].push(coordenadasPolyLine[i]);
        }

        for(let polylineRuta of polylinesRutas) {
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


class KMLReader {

    leer() {
        parser.initMap();
        let archivo = document.getElementById("subirKML").files[0];
        this.parsearDocumento(archivo);
    }

    parsearDocumento(file) {
       // if(file.type.match(/kml.*/)) {
            let fileReader = new FileReader();
            fileReader.onload = async (e) => {
            let result = await this.extraerCoordenadas(e.target.result);
            parser.printPolyLines(result);
            }
            fileReader.readAsText(file);
       // } else {
       //     alert("La carga desde la máquina local debe ser de archivos .kml");
       // }
        
    }

    async extraerCoordenadas(texto) {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(texto, "text/xml");
        let coordsPlacemarks = [];

        if (xmlDoc.documentElement.nodeName == "kml") {

            for (let item of xmlDoc.getElementsByTagName('Placemark')) {
                let placeMarkName = item.getElementsByTagName('name')[0].childNodes[0].nodeValue.trim();

                let coords = item.getElementsByTagName('LineString')[0].childNodes[5];
                coords = coords.textContent.split('\n');
                coords.pop();
                coords.shift();

                for (let coord of coords) {
                    coord = coord.split(',');
                    coordsPlacemarks.push({ name: placeMarkName, lat: +coord[1], lng: +coord[0], alt: coord[2] });
                }
              }

        } else {
            throw "error while parsing";
        }

        return coordsPlacemarks;

    }
}

var reader = new KMLReader();
