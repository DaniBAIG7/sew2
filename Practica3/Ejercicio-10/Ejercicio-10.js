
class AccionCalculator {
    
    constructor() {
        this.apikey = "CePeexRfzse_YGsyyRaW";
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
    }

    cargar() {
        this.selectedItem = document.getElementById('seleccion').value;
        this.url = "https://www.quandl.com/api/v3/datasets/WIKI/" + this.selectedItem + ".xml?api_key=" + this.apikey;
    }

    cargarDatos() {
        var averageActions = 0;
        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function (datos) {

                console.log(datos);

                //Presentación del archivo XML en modo texto
                $("h5").text((new XMLSerializer()).serializeToString(datos));

                //Extracción de los datos contenidos en el XML
                let i = 0;
                let totalHigh = 0;
                let totalLow = 0;
                $("quandl-response").attr("dataset").attr("data").each(function() {
                    totalHigh += parseFloat($(this).attr("datum")[2]);
                    totalLow += parseFloat($(this).attr("datum")[3]);
                    i++;
                });

                document.getElementById("valormedio").value = averageActions;
            },
            error: function () {
               alert("Ha habido un error calculando la media de las acciones");
            }
        });
    }
}
var accionCalculator = new AccionCalculator();