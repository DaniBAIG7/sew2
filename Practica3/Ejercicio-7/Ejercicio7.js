
class ButtonBehaviours {

    constructor() {
        this.lastEntrada = 0;
    }

    hideTitleManagement() {
        $("#cambiartitulotxt").hide();
        $("#cambiartitulobtn").hide();
    }

    clickOcultarParrafos() {
        $("p").hide();
    }

    clickMostrarParrafos() {
        $("p").show();
    }

    clickMostrarCambiarTitulo() {
        $("#cambiartitulotxt").show();
        $("#cambiartitulobtn").show();
    }

    clickCambiarTitulo() {
        let text = $("#cambiartitulotxt").val();
        $("#encabezadoprincipal").text(text);
        $("#cambiartitulotxt").hide();
        $("#cambiartitulobtn").hide();
        $("#numeroFilas").hide();
        $("#numeroColumnas").hide();
    }

    clickAñadirEntrada() {
        this.lastEntrada++;
        var miTitulo2 = "<article id=\"nuevaEntrada" + this.lastEntrada.toString() + "\"><h2>Nueva entrada creada</h2></article>";
        var miParrafo = document.createElement("p");
        miParrafo.innerHTML= "Párrafo de la nueva entrada"; // Crea un elemento con DOM
        $("body").append(miTitulo2);
        $("#nuevaEntrada" + this.lastEntrada.toString()).append(miParrafo);
    }

    clickEliminarNuevasEntradas() {
        if(this.lastEntrada > 0) {
            $("#nuevaEntrada" + this.lastEntrada.toString()).remove();
            this.lastEntrada--;
        }
        
    }

    clickRecorrerDOM() {
        $("*", document.body).each(function() {
            var etiquetaPadre = $(this).parent().get(0).tagName;
            $(this).prepend(document.createTextNode( "Etiqueta padre : <"  + etiquetaPadre + "> elemento : <" + $(this).get(0).tagName +"> valor: "));
        });
    }

    clickSumarFilas() {
        let i = 0;
        $("table tr").each(function() {
            i++;
        })
        $("#numeroFilas").show();
        document.getElementById("numeroFilas").value = i;
    }

    clickSumarColumnas() {
        let i = 0;
        $("table td").each(function() {
            i++;
        })
        $("#numeroColumnas").show();
        document.getElementById("numeroColumnas").value = i;
    }
}

var commandManager = new ButtonBehaviours();

// $(document).ready(function(){
    
    
//     $("#recorrerDOM").click(function() {
//         $("*", document.body).each(function() {
//         var etiquetaPadre = $(this).parent().get(0).tagName;
//         $(this).prepend(document.createTextNode( "Etiqueta padre : <"  + etiquetaPadre + "> elemento : <" + $(this).get(0).tagName +"> valor: "));
//         });
//     });
//     $("#sumarfilas").click(function() {
//         let i = 0;
//         $("table tr").each(function() {
//             i++;
//         })
//         $()
//     });

//     $("#sumarcolumnas").click(function() {
//         $("table td").each(function() {
//             let txt = $(this).text();
//             $(this).parent().append(txt);
//             $(this).remove();
//         })
//     });
//   });