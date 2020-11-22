var mapaDinamicoGoogle = new Object();
function initMap(){
    var skyValley = {lat: 33.89455, lng: -116.35381};
    var mapaSkyValley = new google.maps.Map(document.getElementById('mapa'),{zoom: 8,center:skyValley});
    var marcador = new google.maps.Marker({position:skyValley,map:mapaSkyValley});
}
mapaDinamicoGoogle.initMap = initMap;