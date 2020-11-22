
var miMapa = new Object();

function initMap() {
  var centro = { lat: parseFloat(miMapa.latitud), lng: parseFloat(miMapa.longitud) };
  var mapaGeoposicionado = new google.maps.Map(document.getElementById('mapa'), {
    zoom: 8,
    center: centro,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  infoWindow = new google.maps.InfoWindow;
  infoWindow.setPosition(centro);
  infoWindow.setContent('Localización encontrada');
  infoWindow.open(mapaGeoposicionado);
  //mapaGeoposicionado.setCenter(centro);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: Ha fallado la geolocalización' :
    'Error: Su navegador no soporta geolocalización');
  infoWindow.open(mapaGeoposicionado);
}

miMapa.initMap = initMap;

class Meteo {
  constructor(idDataOutput) {
    this.apikey = "e90eab05f68b96a608bfb818bda27fe7";
    this.correcto = "Â¡Todo correcto! XML recibido de <a href='http://openweathermap.org/'>OpenWeatherMap</a>"
    this.idDataOutput = idDataOutput;
    
  }

  asignarDatos() {
    this.latitud = document.getElementById('latitud').value;
    this.longitud = document.getElementById('longitud').value;
    this.tipo = "&mode=xml";
    this.unidades = "&units=metric";
    this.idioma = "&lang=es";
    this.url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + this.latitud + "&lon=" + this.longitud + this.idioma + "&appid=" + this.apikey;
    miMapa.latitud = this.latitud;
    miMapa.longitud = this.longitud;
    miMapa.initMap();
    this.cargarDatos();
  }

  cargarDatos() {
    let salida = this.idDataOutput;
    $.ajax({
      dataType: "xml",
      url: this.url,
      method: 'GET',
      success: function (datos) {

        console.log(datos);
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

        var stringDatos = "<ul><li>Número de elementos del XML: " + totalNodos + "</li>";
        stringDatos += "<li>Ciudad: " + ciudad + "</li>";
        stringDatos += "<li>Longitud: " + longitud + " grados</li>";
        stringDatos += "<li>Latitud: " + latitud + " grados</li>";
        stringDatos += "<li>Paí­s: " + pais + "</li>";
        stringDatos += "<li>Amanece a las: " + amanecerLocal + "</li>";
        stringDatos += "<li>Oscurece a las: " + oscurecerLocal + "</li>";
        stringDatos += "<li>Temperatura: " + temperatura + " grados Celsius</li>";
        stringDatos += "<li>Temperatura mí­nima: " + temperaturaMin + " grados Celsius</li>";
        stringDatos += "<li>Temperatura máxima: " + temperaturaMax + " grados Celsius</li>";
        stringDatos += "<li>Temperatura (unidades): " + temperaturaUnit + "</li>";
        stringDatos += "<li>Humedad: " + humedad + " " + humedadUnit + "</li>";
        stringDatos += "<li>Presión: " + presion + " " + presionUnit + "</li>";
        stringDatos += "<li>Velocidad del viento: " + velocidadViento + " metros/segundo</li>";
        stringDatos += "<li>Nombre del viento: " + nombreViento + "</li>";
        stringDatos += "<li>Dirección del viento: " + direccionViento + " grados</li>";
        stringDatos += "<li>Código del viento: " + codigoViento + "</li>";
        stringDatos += "<li>Nombre del viento: " + nombreDireccionViento + "</li>";
        stringDatos += "<li>Nubosidad: " + nubosidad + "</li>";
        stringDatos += "<li>Nombre nubosidad: " + nombreNubosidad + "</li>";
        stringDatos += "<li>Visibilidad: " + visibilidad + " metros</li>";
        stringDatos += "<li>Precipitación valor: " + precipitacionValue + "</li>";
        stringDatos += "<li>Precipitación modo: " + precipitacionMode + "</li>";
        stringDatos += "<li>Descripción: " + descripcion + "</li>";
        stringDatos += "<li>Hora de la medida: " + horaMedidaLocal + "</li>";
        stringDatos += "<li>Fecha de la medida: " + fechaMedidaLocal + "</li>";
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

var informacionMeteo = new Meteo('datosMeteo');
