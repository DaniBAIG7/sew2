
class Calculadora{
    constructor(){
        this.memo = null;
        this.pantalla = "";
    }

    suma(){
        this.pantalla += "+";
        this.refresh();
    }

    resta() {
        this.pantalla += '-';
        this.refresh();
    }

    multiplicacion() {
        this.pantalla += '*';
        this.refresh();
    }

    division() {
        this.pantalla += '/';
        this.refresh();
    }

    borrar() {
        this.pantalla = '';
        this.refresh();
    }

    digito(digito) {
        this.pantalla += digito;
        this.refresh();
    }

    igual() {
        try {
            var str = this.pantalla;
            this.pantalla = eval(str);
        }
        catch(err) {
             this.pantalla = "Error = " + err;
        }
        this.refresh();
    }

    mrc() {
        this.memo = null;
    }

    mMenos() {
        if(this.memo != null) {
            this.pantalla += this.memo;
            this.memo = null;
            this.refresh();
        }
    }

    mMas() {
        try {
           this.memo = eval(this.pantalla);
        }
        catch(err) {
           this.pantalla = "Error = " + err;
           this.refresh();
        }
    }

    refresh() {
        document.getElementById("resultado").value = this.pantalla;
    }
}

var calculadora = new Calculadora();