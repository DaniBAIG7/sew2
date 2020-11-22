$(document).ready(function(){
    $("#cambiartitulotxt").hide();
    $("#cambiartitulobtn").hide();
    $("#ocultar").click(function(){
      $("p").hide();
    });
    $("#mostrar").click(function(){
      $("p").show();
    });
    $("#mostrarCambiarTitulo").click(function(){
        $("#cambiartitulotxt").show();
        $("#cambiartitulobtn").show();
    });
    $("#cambiartitulobtn").click(function() {
        let text = $("#cambiartitulotxt").val();
        $("#encabezadoprincipal").text(text);
        $("#cambiartitulotxt").hide();
        $("#cambiartitulobtn").hide();
    });
    $("#añadirentradabtn").click(function() {
        var miTitulo2 = "<h2 id=\"nuevaEntrada\">Nueva entrada creada</h2>";
        var miParrafo = document.createElement("p");
        miParrafo.innerHTML= "Párrafo de la nueva entrada"; // Crea un elemento con DOM
        $("body").append(miTitulo2);
        $("body").append(miParrafo);
    });
    $("#eliminarnuevasentradas").click(function() {
        $("#nuevaEntrada").remove();
    });
    $("#recorrerDOM").click(function() {
        $("*", document.body).each(function() {
        var etiquetaPadre = $(this).parent().get(0).tagName;
        $(this).prepend(document.createTextNode( "Etiqueta padre : <"  + etiquetaPadre + "> elemento : <" + $(this).get(0).tagName +"> valor: "));
        });
    });
    $("#sumarfilas").click(function() {
        $("table tr").each(function() {
            let txt = $(this).text();
            $(this).parent().append(txt);
            $(this).remove();
        })
    });

    $("#sumarcolumnas").click(function() {
        $("table td").each(function() {
            let txt = $(this).text();
            $(this).parent().append(txt);
            $(this).remove();
        })
    });
  });