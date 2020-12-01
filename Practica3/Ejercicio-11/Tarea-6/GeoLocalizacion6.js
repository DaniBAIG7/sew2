
var miMapa = new Object();

function initMap() {
  var centro = { lat: parseFloat(miMapa.latitud), lng: parseFloat(miMapa.longitud) };
  console.log(centro.lat);
  console.log(centro.lng);
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
    this.datos = "";
  }

  mostrarDatos() {
    // this.latitud = document.getElementById('latitud').value;
    // this.longitud = document.getElementById('longitud').value;
    this.latitud = $("#latitud").val();
    this.longitud = $("#longitud").val();
    this.tipo = "&mode=xml";
    this.unidades = "&units=metric";
    this.idioma = "&lang=es";
    this.url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + this.latitud + "&lon=" + this.longitud + this.idioma + "&appid=" + this.apikey;
    miMapa.latitud = this.latitud;
    miMapa.longitud = this.longitud;
    miMapa.initMap();
    this.cargarDatos();
  }

  meterDatos(datos) {
    this.datos = datos;
  }

  cargarDatos() {
    var self = this;

    //fetch(this.url).then(response => response.json()).then(datos => self.datos = datos);

    

    $.ajax({
      dataType: "json",
      url: this.url,
      method: 'GET',
      success: function(datos) {
        self.datos = datos;
        self.paintDatos();
      },
      error: function (xhr, status, error) {
        var err = eval("(" + xhr.responseText + ")");
        alert("No se han cargado los datos correctamente");
      }
    });

    

  }

  paintDatos() {
    if (this.datos == "") {
      $("#datosMeteo").append("<p>No se han cargado los datos correctamente</p>");
    } else {
      console.log(this.datos);
      $("#datosMeteo").append("<p>Latitud: " + this.datos.lat + " grados</p>");
      $("#datosMeteo").append("<p>Longitud: " + this.datos.lon + " grados</p>");
      $("#datosMeteo").append("<p>Temperatura: " + (parseFloat(this.datos.current.temp - 273).toFixed(2)) + " grados Celsius</p>");
      $("#datosMeteo").append("<p>Presión: " + this.datos.current.pressure + " milímetros</p>");
      $("#datosMeteo").append("<p>Humedad: " + this.datos.current.humidity + "%</p>");
      $("#datosMeteo").append("<p>Amanece a las: " + new Date(this.datos.current.sunrise * 1000).toLocaleTimeString() + "</p>");
      $("#datosMeteo").append("<p>Oscurece a las: " + new Date(this.datos.current.sunset * 1000).toLocaleTimeString() + "</p>");
      $("#datosMeteo").append("<p>Dirección del viento: " + this.datos.current.wind_deg + "  grados</p>");
      $("#datosMeteo").append("<p>Velocidad del viento: " + this.datos.current.wind_speed + " metros/segundo</p>");
      $("#datosMeteo").append("<p>Visibilidad: " + this.datos.current.visibility + " metros</p>");
      $("#datosMeteo").append("<img src=http://openweathermap.org/img/wn/" + this.datos.current.weather[0].icon + "@2x.png alt=\"icono del tiempo en localización seleccionada\"/>");
    }
    $("#datosMeteo").show();
  }

  hideData() {
    $("#datosMeteo").hide();
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
