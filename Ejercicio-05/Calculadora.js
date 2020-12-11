class PilaLIFO { 
    constructor (nombre){ 
        this.nombre = nombre;
        this.pila = new Array();
    }
    apilar(valor){
        this.pila.push(valor);
        pila.mostrar();
    }
    desapilar(){
        let element = (this.pila.pop());
        pila.mostrar();
        return element;
    }
    length() {
        return this.pila.length;
    }
    mostrar() {
        let stringPila = "";
        for(let i = 0; i < this.length(); i++) {
            stringPila += this.pila[i] + "\n";
        }
        document.getElementById('pila').value = stringPila;
    }

    clear() {
        for(let i = 0; i < this.length(); i++) {
            this.pila = new Array();
        }
        this.mostrar();
    }
}
var pila = new PilaLIFO("Pila LIFO");
class Calculadora{
    constructor(){
        this.memo = null;
        this.pantalla = "";
    }

    suma(){
        if(pila.length() > 1) {
            let ultimoDigito = pila.desapilar();
            let penultimoDigito = pila.desapilar();
            pila.apilar(penultimoDigito + ultimoDigito);
        }
    }

    resta() {
        if(pila.length() > 1) {
            let ultimoDigito = pila.desapilar();
            let penultimoDigito = pila.desapilar();
            pila.apilar(penultimoDigito - ultimoDigito);
        }
    }

    multiplicacion() {
        if(pila.length() > 1) {
            let ultimoDigito = pila.desapilar();
            let penultimoDigito = pila.desapilar();
            pila.apilar(penultimoDigito * ultimoDigito);
        }
    }

    division() {
        if(pila.length() > 1) {
            let ultimoDigito = pila.desapilar();
            let penultimoDigito = pila.desapilar();
            pila.apilar(penultimoDigito / ultimoDigito);
        }
    }

    digito(digito) {
        this.pantalla += digito;
        this.refresh();
    }

    apilar() {
        var text = this.pantalla;
        let valorAApilar = parseFloat(text.value);
        pila.apilar(valorAApilar);
        this.pantalla = "";
        this.refresh();
    }

    borrar() {
        pila.clear();
        this.pantalla = "";
        this.refresh();
    }

    refresh() {
        document.getElementById("resultado").value = this.pantalla;
    }
}

class CalculadoraRPN extends Calculadora {
    CalculadoraRPN() {
        this.super();
    }

    pi() {
        var text = this.pantalla;
        text.value += Math.PI.toString();
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
        this.refresh();
    }

    potenciaX() {
        if(pila.length() > 1) {
            let ultimoDigito = pila.desapilar();
            let penultimoDigito = pila.desapilar();
            pila.apilar(penultimoDigito**ultimoDigito);
        }
    }

    tan() {
        if(pila.length() > 0) {
            let ultimoDigito = pila.desapilar();
            if(this.shiftEnabled) {
                pila.apilar(Math.atan(ultimoDigito));
            } else {
                
                pila.apilar(Math.tan(ultimoDigito));
            }
        }
    }

    cos() {
        if(pila.length() > 0) {
            let ultimoDigito = pila.desapilar();
            if(this.shiftEnabled) {
                pila.apilar(Math.acos(ultimoDigito));
                
            } else {
                pila.apilar(Math.cos(ultimoDigito));
            }
        }
    }

    sin() {
        if(pila.length() > 0) {
            let ultimoDigito = pila.desapilar();
            if(this.shiftEnabled) {
                pila.apilar(Math.asin(ultimoDigito));
            } else {
                pila.apilar(Math.sin(ultimoDigito));
            }
        }
    }

    raiz() {
        if(pila.length() > 0) {
            let ultimoDigito = pila.desapilar();
            pila.apilar(Math.sqrt(ultimoDigito));
        }
    }

    diezElevadoA() {
        if(pila.length() > 0) {
            let ultimoDigito = pila.desapilar();
            pila.apilar(Math.sqrt(ultimoDigito));
        }
    }

    base_e_log() {
        if(pila.length() > 0) {
            let ultimoDigito = pila.desapilar();
            pila.apilar(Math.log(ultimoDigito));
        }
    }

    exp() {
        if(pila.length() > 0) {
            let ultimoDigito = pila.desapilar();
            pila.apilar(Math.exp(ultimoDigito));
        }
    }

    e() {
        var text = this.pantalla;
        text.value += Math.exp(1);
        this.refresh();
    }
    
    base_10_log() {
        if(pila.length() > 0) {
            let ultimoDigito = pila.desapilar();
            pila.apilar(Math.log10(ultimoDigito));
        }
    }

    factorial() {
        if(pila.length() > 0) {
            let ultimoDigito = pila.desapilar();
            pila.apilar(this.fact(ultimoDigito));
        }
    }

    fact(num) {
        if(num == 0){
            return 1;
        }
        else
            return num * this.fact(num-1);
    }

    clearUltimo() {
        this.removeLastDigit();
    }

    getLastDigit() {
        return this.pantalla;
    }

    removeLastDigit() {
        this.pantalla = '';
        refresh();
    }
}

var calculadora = new CalculadoraRPN();