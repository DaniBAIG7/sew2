class LectorImagen {

    constructor() {
        this.canvas = null;
        this.context = null;
        this.src = "";
        this.imageMaxHeight = 500;
        this.imageMaxWidth = 800;
    }

    presetting() {
        $("#canvas").hide();
        $("#carga").hide();
        $("#filtros").hide();
    }

    cargarImagenPrevisualizacion() {
        this.presetting();
        this.canvas = document.getElementById("canvas");
        this.context = canvas.getContext("2d");
        var input = document.getElementById("subirArchivos");

        var reader = new FileReader();
        var self = this;
        reader.onload = function (e) {
            
            let imagen = new Image();
            imagen.id = "previsualizacion";
            if (imagen.width > self.imageMaxWidth) {
                let divisorW = imagen.width / self.imageMaxWidth;
                imagen.width = imagen.width / divisorW;
            }
            if (imagen.height > self.imageMaxHeight) {
                let divisorH = imagen.height / self.imageMaxHeight;
                imagen.height = imagen.height / divisorH;
            }
            $("#previsualizacionSeccion").append(imagen);
            document.getElementById("previsualizacion").setAttribute("src", e.target.result);
            document.getElementById("previsualizacion").setAttribute("onload", "lector.permitirPantallaCompleta()");
        };

        if (input.files[0].type.match('image.*')) {
            reader.readAsDataURL(input.files[0]);
            $("#carga").show();
        } else {
            alert("La página solo admite carga de archivos de imagen");
        }

    }

    cargarEnCanvas() {
        var img = document.getElementById("previsualizacion");
        this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        img.setAttribute("src", "");
        img.setAttribute("alt", "");
        $("#previsualizacion").remove();
        $("#carga").hide();
        $("#canvas").show();
        $("#filtros").show();
    }

    getCanvasImageData() {
        return this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }

    setCanvasImageData(imageData) {
        this.context.putImageData(imageData, 0, 0);
    }

    permitirPantallaCompleta() {
        var self = this;
        var imagen = document.getElementById("canvas");
        imagen.addEventListener("dblclick", function (e) {
            self.aPantallaCompleta(this);
        }, false);
    }

    aPantallaCompleta(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

}

var lector = new LectorImagen();

class Editor {

    aplicarFiltroPreset() {
        let selectedItem = document.getElementById('seleccion').value;
        if (selectedItem == "Sepia") {
            this.filtroSepia();
        } else if (selectedItem == "Invert") {
            this.filtroInvertido();
        } else if (selectedItem == "Cont") {
            this.filtroContraste();
        } else if (selectedItem == "ByN") {
            this.filtroBlancoYNegro();
        }
    }

    // aplicarFiltroCustom() {
    //     let imageData = lector.getCanvasImageData(),
    //         pixels = imageData.data,
    //         numPixels = imageData.width * imageData.height;

    //     for (let i = 0; i < numPixels; i++) {
    //         let r = pixels[i * 4];
    //         let g = pixels[i * 4 + 1];
    //         let b = pixels[i * 4 + 2];

    //         let rMutation = document.getElementById("r").value;
    //         let gMutation = document.getElementById("g").value;
    //         let bMutation = document.getElementById("b").value;

    //         pixels[i * 4] = 255 - r;
    //         pixels[i * 4 + 1] = 255 - g;
    //         pixels[i * 4 + 2] = 255 - b;

    //         pixels[i * 4] = (r * rMutation) + (g * gMutation) + (b * bMutation);
    //         pixels[i * 4 + 1] = (r * rMutation) + (g * gMutation) + (b * bMutation);
    //         pixels[i * 4 + 2] = (r * rMutation) + (g * gMutation) + (b * bMutation);
    //     }
    //     lector.setCanvasImageData(imageData);
    // }

    filtroSepia() {
        let imageData = lector.getCanvasImageData(),
            pixels = imageData.data,
            numPixels = imageData.width * imageData.height;

        for (let i = 0; i < numPixels; i++) {
            let r = pixels[i * 4];
            let g = pixels[i * 4 + 1];
            let b = pixels[i * 4 + 2];

            pixels[i * 4] = 255 - r;
            pixels[i * 4 + 1] = 255 - g;
            pixels[i * 4 + 2] = 255 - b;

            pixels[i * 4] = (r * .393) + (g * .769) + (b * .189);
            pixels[i * 4 + 1] = (r * .349) + (g * .686) + (b * .168);
            pixels[i * 4 + 2] = (r * .272) + (g * .534) + (b * .131);
        }
        lector.setCanvasImageData(imageData);
    }

    filtroContraste() {
        let contrast = 100;
        let imageData = lector.getCanvasImageData(),
            pixels = imageData.data,
            numPixels = imageData.width * imageData.height,
            factor;

        contrast || (contrast = 100); // Default value

        factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

        for (let i = 0; i < numPixels; i++) {
            let r = pixels[i * 4];
            let g = pixels[i * 4 + 1];
            let b = pixels[i * 4 + 2];

            pixels[i * 4] = factor * (r - 128) + 128;
            pixels[i * 4 + 1] = factor * (g - 128) + 128;
            pixels[i * 4 + 2] = factor * (b - 128) + 128;
        }

        lector.setCanvasImageData(imageData);
    }

    filtroInvertido() {
        let imageData = lector.getCanvasImageData(),
            pixels = imageData.data,
            numPixels = imageData.width * imageData.height;

        for (let i = 0; i < numPixels; i++) {
            let r = pixels[i * 4];
            let g = pixels[i * 4 + 1];
            let b = pixels[i * 4 + 2];

            pixels[i * 4] = 255 - r;
            pixels[i * 4 + 1] = 255 - g;
            pixels[i * 4 + 2] = 255 - b;
        }

        lector.setCanvasImageData(imageData);
    }

    filtroBlancoYNegro() {
        let imageData = lector.getCanvasImageData(),
            pixels = imageData.data,
            numPixels = imageData.width * imageData.height;

        for (let i = 0; i < numPixels; i++) {
            let r = pixels[i * 4];
            let g = pixels[i * 4 + 1];
            let b = pixels[i * 4 + 2];

            let grey = (r + g + b) / 3;

            pixels[i * 4] = grey;
            pixels[i * 4 + 1] = grey;
            pixels[i * 4 + 2] = grey;
        }

        lector.setCanvasImageData(imageData);
    }
}

var editor = new Editor();