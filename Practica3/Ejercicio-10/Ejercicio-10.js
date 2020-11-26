
class AccionCalculator {

    constructor() {
        this.apikey = "CePeexRfzse_YGsyyRaW";
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
    }

    cargar() {
        this.selectedItem = document.getElementById('seleccion').value;
        this.url = "https://www.quandl.com/api/v3/datasets/WIKI/" + this.selectedItem + "/data.json?api_key=" + this.apikey;
    }

    cargarDatos() {
        var averageActions = 0;

        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function (datos) {
                console.log(datos);
                //Presentación del archivo XML en modo texto
                //$("h5").text((new XMLSerializer()).serializeToString(datos));

                //Extracción de los datos contenidos en el XML

                let i = 0;
                let totalHigh = 0;
                let totalLow = 0;

                let firstData = datos.dataset_data;
                let secondData = firstData.data;
                secondData.forEach(function(datum) {
                    totalHigh += datum[2];
                    totalLow += datum[3];
                    i++;
                });

                let avgHigh = totalHigh/i;
                let avgLow = totalLow/i;
                averageActions = (avgHigh + avgLow)/2;

                document.getElementById("valormedio").value = averageActions + "$";
            },
            error: function () {
                alert("Ha habido un error calculando la media de las acciones");
            }
        });
    }
}
var accionCalculator = new AccionCalculator();