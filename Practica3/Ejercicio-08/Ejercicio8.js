class Meteo {
    constructor(ciudad, idoutput) {
        this.apikey = "e90eab05f68b96a608bfb818bda27fe7";
        this.ciudad = ciudad;
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + this.unidades + this.idioma + "&APPID=" + this.apikey;
        this.error = "<h2>¡problemas! No puedo obtener información de <a href='http://openweathermap.org'>OpenWeatherMap</a></h2>";
        this.idoutput = idoutput;
        this.datos = null;
    }

    cargarDatos() {
        var self = this;

        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function (data) {
                self.datos = data;
                self.verJSON();
                self.verDatos();
            },
            error: function () {
                $("#" + self.idoutput).write(self.error);
            }
        });
    }
    verJSON() {
        var str = JSON.stringify(this.datos, null, 2);
    }
    
    verDatos() {
        $("#" + this.idoutput).append("<p>Ciudad: " + this.datos.name + "</p>");
        $("#" + this.idoutput).append("<p>País: " + this.datos.sys.country + "</p>");
        $("#" + this.idoutput).append("<p>Latitud: " + this.datos.coord.lat + " grados</p>");
        $("#" + this.idoutput).append("<p>Longitud: " + this.datos.coord.lon + " grados</p>");
        $("#" + this.idoutput).append("<p>Temperatura: " + this.datos.main.temp + " grados Celsius</p>");
        $("#" + this.idoutput).append("<p>Temperatura máxima: " + this.datos.main.temp_max + " grados Celsius</p>");
        $("#" + this.idoutput).append("<p>Temperatura mínima: " + this.datos.main.temp_min + " grados Celsius</p>");
        $("#" + this.idoutput).append("<p>Presión: " + this.datos.main.pressure + " milímetros</p>");
        $("#" + this.idoutput).append("<p>Humedad: " + this.datos.main.humidity + "%</p>");
        $("#" + this.idoutput).append("<p>Amanece a las: " + new Date(this.datos.sys.sunrise * 1000).toLocaleTimeString() + "</p>");
        $("#" + this.idoutput).append("<p>Oscurece a las: " + new Date(this.datos.sys.sunset * 1000).toLocaleTimeString() + "</p>");
        $("#" + this.idoutput).append("<p>Dirección del viento: " + this.datos.wind.deg + "  grados</p>");
        $("#" + this.idoutput).append("<p>Velocidad del viento: " + this.datos.wind.speed + " metros/segundo</p>");
        $("#" + this.idoutput).append("<p>Hora de la medida: " + new Date(this.datos.dt * 1000).toLocaleTimeString() + "</p>");
        $("#" + this.idoutput).append("<p>Fecha de la medida: " + new Date(this.datos.dt * 1000).toLocaleDateString() + "</p>");
        $("#" + this.idoutput).append("<p>Descripción: " + this.datos.weather[0].description + "</p>");
        $("#" + this.idoutput).append("<p>Visibilidad: " + this.datos.visibility + " metros</p>");
        $("#" + this.idoutput).append("<p>Nubosidad: " + this.datos.clouds.all + " %</p>");
        $("#" + this.idoutput).append("<img src=http://openweathermap.org/img/wn/" + this.datos.weather[0].icon + "@2x.png alt=\"icono del tiempo en " + this.ciudad + "\"/>");
    }
}

var meteoRuta1 = new Meteo("Cangas del Narcea", "cangas_del_narcea");
var meteoRuta2 = new Meteo("Vegadeo", "vegadeo");
var meteoRuta3 = new Meteo("Oviedo", "oviedo");