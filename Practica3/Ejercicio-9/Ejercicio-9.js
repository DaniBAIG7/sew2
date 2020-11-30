"use strict";
class Meteo {
    constructor(ciudadInput, idDataOutput) {
        this.apikey = "e90eab05f68b96a608bfb818bda27fe7";
        this.ciudad = ciudadInput;
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;
        this.correcto = "Â¡Todo correcto! XML recibido de <a href='http://openweathermap.org/'>OpenWeatherMap</a>"
        this.idDataOutput = idDataOutput;
    }
    cargarDatos() {
        let salida = this.idDataOutput;
        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function (datos) {

                //Presentación del archivo XML en modo texto
                $("h5").text((new XMLSerializer()).serializeToString(datos));

                //Extracción de los datos contenidos en el XML
                var totalNodos = $('*', datos).length; // cuenta los elementos de XML: son los nodos del árbol DOM de XML
                var ciudad = $('city', datos).attr("name");
                var longitud = $('coord', datos).attr("lon");
                var latitud = $('coord', datos).attr("lat");
                var pais = $('country', datos).text();
                var amanecer = $('sun', datos).attr("rise");
                var minutosZonaHoraria = new Date().getTimezoneOffset();
                var amanecerMiliSeg1970 = Date.parse(amanecer);
                amanecerMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                var amanecerLocal = (new Date(amanecerMiliSeg1970)).toLocaleTimeString("es-ES");
                var oscurecer = $('sun', datos).attr("set");
                var oscurecerMiliSeg1970 = Date.parse(oscurecer);
                oscurecerMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                var oscurecerLocal = (new Date(oscurecerMiliSeg1970)).toLocaleTimeString("es-ES");
                var temperatura = $('temperature', datos).attr("value");
                var temperaturaMin = $('temperature', datos).attr("min");
                var temperaturaMax = $('temperature', datos).attr("max");
                var temperaturaUnit = $('temperature', datos).attr("unit");
                var humedad = $('humidity', datos).attr("value");
                var humedadUnit = $('humidity', datos).attr("unit");
                var presion = $('pressure', datos).attr("value");
                var presionUnit = $('pressure', datos).attr("unit");
                var velocidadViento = $('speed', datos).attr("value");
                var nombreViento = $('speed', datos).attr("name");
                var direccionViento = $('direction', datos).attr("value");
                var codigoViento = $('direction', datos).attr("code");
                var nombreDireccionViento = $('direction', datos).attr("name");
                var nubosidad = $('clouds', datos).attr("value");
                var nombreNubosidad = $('clouds', datos).attr("name");
                var visibilidad = $('visibility', datos).attr("value");
                var precipitacionValue = $('precipitation', datos).attr("value");
                var precipitacionMode = $('precipitation', datos).attr("mode");
                var descripcion = $('weather', datos).attr("value");
                var horaMedida = $('lastupdate', datos).attr("value");
                var horaMedidaMiliSeg1970 = Date.parse(horaMedida);
                horaMedidaMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                var horaMedidaLocal = (new Date(horaMedidaMiliSeg1970)).toLocaleTimeString("es-ES");
                var fechaMedidaLocal = (new Date(horaMedidaMiliSeg1970)).toLocaleDateString("es-ES");
                var icon = $('weather', datos).attr("icon");

                var stringDatos = "";
                stringDatos += "<p>Ciudad: " + ciudad + "</p>";
                stringDatos += "<p>Longitud: " + longitud + " grados</p>";
                stringDatos += "<p>Latitud: " + latitud + " grados</p>";
                stringDatos += "<p>Paí­s: " + pais + "</p>";
                stringDatos += "<p>Amanece a las: " + amanecerLocal + "</p>";
                stringDatos += "<p>Oscurece a las: " + oscurecerLocal + "</p>";
                stringDatos += "<p>Temperatura: " + temperatura + " grados Celsius</p>";
                stringDatos += "<p>Temperatura mí­nima: " + temperaturaMin + " grados Celsius</p>";
                stringDatos += "<p>Temperatura máxima: " + temperaturaMax + " grados Celsius</p>";
                stringDatos += "<p>Temperatura (unidades): " + temperaturaUnit + "</p>";
                stringDatos += "<p>Humedad: " + humedad + " " + humedadUnit + "</p>";
                stringDatos += "<p>Presión: " + presion + " " + presionUnit + "</p>";
                stringDatos += "<p>Velocidad del viento: " + velocidadViento + " metros/segundo</p>";
                stringDatos += "<p>Nombre del viento: " + nombreViento + "</p>";
                stringDatos += "<p>Dirección del viento: " + direccionViento + " grados</p>";
                stringDatos += "<p>Código del viento: " + codigoViento + "</p>";
                stringDatos += "<p>Nombre del viento: " + nombreDireccionViento + "</p>";
                stringDatos += "<p>Nubosidad: " + nubosidad + "</p>";
                stringDatos += "<p>Nombre nubosidad: " + nombreNubosidad + "</p>";
                stringDatos += "<p>Visibipdad: " + visibipdad + " metros</p>";
                stringDatos += "<p>Precipitación valor: " + precipitacionValue + "</p>";
                stringDatos += "<p>Precipitación modo: " + precipitacionMode + "</p>";
                stringDatos += "<p>Descripción: " + descripcion + "</p>";
                stringDatos += "<p>Hora de la medida: " + horaMedidaLocal + "</p>";
                stringDatos += "<p>Fecha de la medida: " + fechaMedidaLocal + "</p>";
                stringDatos += "<img src=http://openweathermap.org/img/wn/" + icon + "@2x.png alt=\"icono del tiempo en Cangas del Narcea\"/>"

                $(salida).html(stringDatos);
            },
            error: function () {
                $("h3").html("¡Tenemos problemas! No puedo obtener XML de <a href='http://openweathermap.org'>OpenWeatherMap</a>");
                $("h4").remove();
                $("h5").remove();
                $("p").remove();
            }
        });
    }
    crearElemento(tipoElemento, texto, insertarAntesDe) {
        // Crea un nuevo elemento modificando el árbol DOM
        // El elemnto creado es de 'tipoElemento' con un 'texto' 
        // El elemnto se coloca antes del elemnto 'insertarAntesDe'
        var elemento = document.createElement(tipoElemento);
        elemento.innerHTML = texto;
        $(insertarAntesDe).before(elemento);
    }
    verXML() {
        //Muestra el archivo JSON recibido
        this.crearElemento("h2", "Datos en XML desde <a href='http://openweathermap.org'>OpenWeatherMap</a>", "footer");
        this.crearElemento("h3", this.correcto, "footer"); // Crea un elemento con DOM 
        this.crearElemento("h4", "XML", "footer"); // Crea un elemento con DOM        
        this.crearElemento("h5", "", "footer"); // Crea un elemento con DOM para el string con XML
        this.crearElemento("h4", "Datos", "footer"); // Crea un elemento con DOM 
        this.crearElemento("p", "", "footer"); // Crea un elemento con DOM para los datos obtenidos con XML
        this.cargarDatos();
        $("button").attr("disabled", "disabled");
    }
}
var meteo1 = new Meteo("Oviedo", "#infoOviedo");
var meteo2 = new Meteo("Grado", "#infoGrado");
var meteo3 = new Meteo("Cangas del Narcea", "#infoCangasDelNarcea");
var meteo4 = new Meteo("San Antolín de Ibias", "#infoSanAntolinDeIbias");
var meteo5 = new Meteo("Vegadeo", "#infoVegadeo");

meteo1.verXML();
meteo2.verXML();
meteo3.verXML();
meteo4.verXML();
meteo5.verXML();

/* Ejemplo de XML recibido de http://openweathermap.org
<?xml version="1.0" encoding="UTF-8"?>
<current>
    <city id="3114711" name="Oviedo">
        <coord lon="-5.84" lat="43.36"/>
        <country>ES</country>
        <sun rise="2017-11-19T07:23:01" set="2017-11-19T16:54:35"/>
    </city>
    <temperature value="10" min="10" max="10" unit="metric"/>
    <humidity value="81" unit="%"/>
    <pressure value="1023" unit="hPa"/>
    <wind>
        <speed value="2.6" name="Light breeze"/>
        <gusts/>
        <direction value="160" code="SSE" name="South-southeast"/>
    </wind>
    <clouds value="0" name="clear sky"/>
    <visibility value="10000"/>
    <precipitation mode="no"/>
    <weather number="800" value="cielo claro" icon="01n"/>
    <lastupdate value="2017-11-19T22:30:00"/>
</current>
 */