var meteoRuta1 = new Object();
meteoRuta1.apikey = "e90eab05f68b96a608bfb818bda27fe7";
meteoRuta1.ciudad = "Cangas del Narcea";
meteoRuta1.unidades = "&units=metric";
meteoRuta1.idioma = "&lang=es";
meteoRuta1.url = "http://api.openweathermap.org/data/2.5/weather?q=" + meteoRuta1.ciudad + meteoRuta1.unidades + meteoRuta1.idioma + "&APPID=" + meteoRuta1.apikey;
meteoRuta1.error = "<h2>¡problemas! No puedo obtener información de <a href='http://openweathermap.org'>OpenWeatherMap</a></h2>";
meteoRuta1.cargarDatos = function () {
    $.ajax({
        dataType: "json",
        url: meteoRuta1.url,
        method: 'GET',
        success: function (data) {
            meteoRuta1.datos = data;
            meteoRuta1.verJSON();
            meteoRuta1.verDatos();
        },
        error: function () {
            $("#cangas_del_narcea").write(meteoRuta1.error);
        }
    });
}
meteoRuta1.verJSON = function () {
    var str = JSON.stringify(meteoRuta1.datos, null, 2);
}
meteoRuta1.verDatos = function () {
    $("#cangas_del_narcea").append("<p>Ciudad: " + meteoRuta1.datos.name + "</p>");
    $("#cangas_del_narcea").append("<p>País: " + meteoRuta1.datos.sys.country + "</p>");
    $("#cangas_del_narcea").append("<p>Latitud: " + meteoRuta1.datos.coord.lat + " grados</p>");
    $("#cangas_del_narcea").append("<p>Longitud: " + meteoRuta1.datos.coord.lon + " grados</p>");
    $("#cangas_del_narcea").append("<p>Temperatura: " + meteoRuta1.datos.main.temp + " grados Celsius</p>");
    $("#cangas_del_narcea").append("<p>Temperatura máxima: " + meteoRuta1.datos.main.temp_max + " grados Celsius</p>");
    $("#cangas_del_narcea").append("<p>Temperatura mínima: " + meteoRuta1.datos.main.temp_min + " grados Celsius</p>");
    $("#cangas_del_narcea").append("<p>Presión: " + meteoRuta1.datos.main.pressure + " milímetros</p>");
    $("#cangas_del_narcea").append("<p>Humedad: " + meteoRuta1.datos.main.humidity + "%</p>");
    $("#cangas_del_narcea").append("<p>Amanece a las: " + new Date(meteoRuta1.datos.sys.sunrise * 1000).toLocaleTimeString() + "</p>");
    $("#cangas_del_narcea").append("<p>Oscurece a las: " + new Date(meteoRuta1.datos.sys.sunset * 1000).toLocaleTimeString() + "</p>");
    $("#cangas_del_narcea").append("<p>Dirección del viento: " + meteoRuta1.datos.wind.deg + "  grados</p>");
    $("#cangas_del_narcea").append("<p>Velocidad del viento: " + meteoRuta1.datos.wind.speed + " metros/segundo</p>");
    $("#cangas_del_narcea").append("<p>Hora de la medida: " + new Date(meteoRuta1.datos.dt * 1000).toLocaleTimeString() + "</p>");
    $("#cangas_del_narcea").append("<p>Fecha de la medida: " + new Date(meteoRuta1.datos.dt * 1000).toLocaleDateString() + "</p>");
    $("#cangas_del_narcea").append("<p>Descripción: " + meteoRuta1.datos.weather[0].description + "</p>");
    $("#cangas_del_narcea").append("<p>Visibilidad: " + meteoRuta1.datos.visibility + " metros</p>");
    $("#cangas_del_narcea").append("<p>Nubosidad: " + meteoRuta1.datos.clouds.all + " %</p>");
    $("#cangas_del_narcea").append("<img src=http://openweathermap.org/img/wn/" + meteoRuta1.datos.weather[0].icon + "@2x.png alt=\"icono del tiempo en Cangas del Narcea\"/>");
}

var meteoRuta2 = new Object();
meteoRuta2.apikey = "e90eab05f68b96a608bfb818bda27fe7";
meteoRuta2.ciudad = "Vegadeo";
meteoRuta2.unidades = "&units=metric";
meteoRuta2.idioma = "&lang=es";
meteoRuta2.url = "http://api.openweathermap.org/data/2.5/weather?q=" + meteoRuta2.ciudad + meteoRuta2.unidades + meteoRuta2.idioma + "&APPID=" + meteoRuta2.apikey;
meteoRuta2.error = "<h2>¡problemas! No puedo obtener información de <a href='http://openweathermap.org'>OpenWeatherMap</a></h2>";
meteoRuta2.cargarDatos = function () {
    $.ajax({
        dataType: "json",
        url: meteoRuta2.url,
        method: 'GET',
        success: function (data) {
            meteoRuta2.datos = data;
            meteoRuta2.verJSON();
            meteoRuta2.verDatos();
        },
        error: function () {
            $("#vegadeo").write(meteoRuta2.error);
        }
    });
}
meteoRuta2.verJSON = function () {
    var str = JSON.stringify(meteoRuta2.datos, null, 2);
}
meteoRuta2.verDatos = function () {
    $("#vegadeo").append("<p>Ciudad: " + meteoRuta2.datos.name + "</p>");
    $("#vegadeo").append("<p>País: " + meteoRuta2.datos.sys.country + "</p>");
    $("#vegadeo").append("<p>Latitud: " + meteoRuta2.datos.coord.lat + " grados</p>");
    $("#vegadeo").append("<p>Longitud: " + meteoRuta2.datos.coord.lon + " grados</p>");
    $("#vegadeo").append("<p>Temperatura: " + meteoRuta2.datos.main.temp + " grados Celsius</p>");
    $("#vegadeo").append("<p>Temperatura máxima: " + meteoRuta2.datos.main.temp_max + " grados Celsius</p>");
    $("#vegadeo").append("<p>Temperatura mínima: " + meteoRuta2.datos.main.temp_min + " grados Celsius</p>");
    $("#vegadeo").append("<p>Presión: " + meteoRuta2.datos.main.pressure + " milímetros</p>");
    $("#vegadeo").append("<p>Humedad: " + meteoRuta2.datos.main.humidity + "%</p>");
    $("#vegadeo").append("<p>Amanece a las: " + new Date(meteoRuta2.datos.sys.sunrise * 1000).toLocaleTimeString() + "</p>");
    $("#vegadeo").append("<p>Oscurece a las: " + new Date(meteoRuta2.datos.sys.sunset * 1000).toLocaleTimeString() + "</p>");
    $("#vegadeo").append("<p>Dirección del viento: " + meteoRuta2.datos.wind.deg + "  grados</p>");
    $("#vegadeo").append("<p>Velocidad del viento: " + meteoRuta2.datos.wind.speed + " metros/segundo</p>");
    $("#vegadeo").append("<p>Hora de la medida: " + new Date(meteoRuta2.datos.dt * 1000).toLocaleTimeString() + "</p>");
    $("#vegadeo").append("<p>Fecha de la medida: " + new Date(meteoRuta2.datos.dt * 1000).toLocaleDateString() + "</p>");
    $("#vegadeo").append("<p>Descripción: " + meteoRuta2.datos.weather[0].description + "</p>");
    $("#vegadeo").append("<p>Visibilidad: " + meteoRuta2.datos.visibility + " metros</p>");
    $("#vegadeo").append("<p>Nubosidad: " + meteoRuta2.datos.clouds.all + " %</p>");
    $("#vegadeo").append("<img src=http://openweathermap.org/img/wn/" + meteoRuta2.datos.weather[0].icon + "@2x.png alt=\"icono del tiempo en Vegadeo\"/>");
}

var meteoRuta3 = new Object();
meteoRuta3.apikey = "e90eab05f68b96a608bfb818bda27fe7";
meteoRuta3.ciudad = "Oviedo";
meteoRuta3.unidades = "&units=metric";
meteoRuta3.idioma = "&lang=es";
meteoRuta3.url = "http://api.openweathermap.org/data/2.5/weather?q=" + meteoRuta3.ciudad + meteoRuta3.unidades + meteoRuta3.idioma + "&APPID=" + meteoRuta3.apikey;
meteoRuta3.error = "<h2>¡problemas! No puedo obtener información de <a href='http://openweathermap.org'>OpenWeatherMap</a></h2>";
meteoRuta3.cargarDatos = function () {
    $.ajax({
        dataType: "json",
        url: meteoRuta3.url,
        method: 'GET',
        success: function (data) {
            meteoRuta3.datos = data;
            meteoRuta3.verJSON();
            meteoRuta3.verDatos();
        },
        error: function () {
            $("#oviedo").write(meteoRuta3.error);
        }
    });
}
meteoRuta3.verJSON = function () {
    var str = JSON.stringify(meteoRuta3.datos, null, 2);
}
meteoRuta3.verDatos = function () {
    $("#oviedo").append("<p>Ciudad: " + meteoRuta3.datos.name + "</p>");
    $("#oviedo").append("<p>País: " + meteoRuta3.datos.sys.country + "</p>");
    $("#oviedo").append("<p>Latitud: " + meteoRuta3.datos.coord.lat + " grados</p>");
    $("#oviedo").append("<p>Longitud: " + meteoRuta3.datos.coord.lon + " grados</p>");
    $("#oviedo").append("<p>Temperatura: " + meteoRuta3.datos.main.temp + " grados Celsius</p>");
    $("#oviedo").append("<p>Temperatura máxima: " + meteoRuta3.datos.main.temp_max + " grados Celsius</p>");
    $("#oviedo").append("<p>Temperatura mínima: " + meteoRuta3.datos.main.temp_min + " grados Celsius</p>");
    $("#oviedo").append("<p>Presión: " + meteoRuta3.datos.main.pressure + " milímetros</p>");
    $("#oviedo").append("<p>Humedad: " + meteoRuta3.datos.main.humidity + "%</p>");
    $("#oviedo").append("<p>Amanece a las: " + new Date(meteoRuta3.datos.sys.sunrise * 1000).toLocaleTimeString() + "</p>");
    $("#oviedo").append("<p>Oscurece a las: " + new Date(meteoRuta3.datos.sys.sunset * 1000).toLocaleTimeString() + "</p>");
    $("#oviedo").append("<p>Dirección del viento: " + meteoRuta3.datos.wind.deg + "  grados</p>");
    $("#oviedo").append("<p>Velocidad del viento: " + meteoRuta3.datos.wind.speed + " metros/segundo</p>");
    $("#oviedo").append("<p>Hora de la medida: " + new Date(meteoRuta3.datos.dt * 1000).toLocaleTimeString() + "</p>");
    $("#oviedo").append("<p>Fecha de la medida: " + new Date(meteoRuta3.datos.dt * 1000).toLocaleDateString() + "</p>");
    $("#oviedo").append("<p>Descripción: " + meteoRuta3.datos.weather[0].description + "</p>");
    $("#oviedo").append("<p>Visibilidad: " + meteoRuta3.datos.visibility + " metros</p>");
    $("#oviedo").append("<p>Nubosidad: " + meteoRuta3.datos.clouds.all + " %</p>");
    $("#oviedo").append("<img src=http://openweathermap.org/img/wn/" + meteoRuta3.datos.weather[0].icon + "@2x.png alt=\"icono del tiempo en Oviedo\"/>");
}