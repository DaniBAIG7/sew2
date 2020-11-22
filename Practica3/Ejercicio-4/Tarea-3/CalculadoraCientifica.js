
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

class CalculadoraCientifica extends Calculadora {
    CalculadoraCientifica() {
        this.super();
    }

    pi() {
        this.pantalla += Math.PI;
        this.refresh();
    }

    parentesisIzq() {
        this.pantalla += '(';
        this.refresh();
    }

    parentesisDer() {
        this.pantalla += ')';
        this.refresh();
    }

    shift() {
        if(this.shiftEnabled) {
            this.shiftEnabled = false;
        } else {
            this.shiftEnabled = true;
        }
        
    }

    erase() {
        var valor = this.pantalla;
        this.pantalla = valor.substring(0, valor.length - 1);
    }

    potenciaX() {
        var lastDigit = this.getLastDigit();
        this.removeLastDigit();
        this.pantalla = "Math.pow(" + lastDigit + ",";
        this.refresh();
    }

    tan() {
        if(this.shiftEnabled) {
            this.pantalla += "Math.atan(";
            this.shiftEnabled = false;
        } else {
            this.pantalla += "Math.tan(";
        }

        this.refresh();
    }

    cos() {
        if(this.shiftEnabled) {
            this.pantalla += "Math.acos(";
            this.shiftEnabled = false;
        } else {
            this.pantalla += "Math.cos(";
        }

        this.refresh();
    }

    sin() {
        if(this.shiftEnabled) {
            this.pantalla += "Math.asin(";
            this.shiftEnabled = false;
        } else {
            this.pantalla += "Math.sin(";
        }

        this.refresh();
    }

    raiz() {
        this.removeLastDigit();
        this.pantalla += "Math.sqrt(";
        this.refresh();
    }

    diezElevadoA() {
        this.pantalla += "Math.pow(10,";
    }

    base_e_log() {
        this.pantalla += "Math.log(";
    }

    exp() {
        this.pantalla += "Math.exp(";
    }

    factorial() {
        
    }

    borrarUltimo() {
        this.removeLastDigit();
    }

    getLastDigit() {
        var valor = this.pantalla;
        if(this.isUniqueDigit(valor)) {
            return valor;
        } else {
            for(var i = valor.length - 1; i >= 0; i--) {
                if(valor.charAt(i) == '+' || valor.charAt(i) == '-' || valor.charAt(i) == '*' || valor.charAt(i) == '/' || i == 0) {
                    var toRet = valor.substring(i+1, valor.length);
                    return toRet;
                }
            }
        }
    }

    isUniqueDigit(valor) {
        for(var i=0; i < valor.length; i++) {
            if(valor.charAt(i) == '+' || valor.charAt(i) == '-' || valor.charAt(i) == '*' || valor.charAt(i) == '/') {
                return false;
            }
        }
        return true;
    }

    removeLastDigit() {
        var valor = this.pantalla;
        if(this.isUniqueDigit(valor)) {
            this.pantalla = "";
        }
        else {
            for(var i = valor.length - 1; i >= 0; i--) {
                if(valor.charAt(i) == '+' || valor.charAt(i) == '-' || valor.charAt(i) == '*' || valor.charAt(i) == '/' || i == 0) {
                    var str = valor.substring(0, i+1);
                    this.pantalla = str;
                    break;
                }
            }
        }

        this.refresh();
    }
}

var calculadora = new CalculadoraCientifica();