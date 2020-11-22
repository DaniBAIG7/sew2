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

    coma() {
        var text = document.getElementById('resultado');
        text.value += '.';
    }

    pulsa1() {
        var text = document.getElementById('resultado');
        text.value += '1';
    }

    pulsa2() {
        var text = document.getElementById('resultado');
        text.value += '2';
    }
    
    pulsa3() {
        var text = document.getElementById('resultado');
        text.value += '3';
    }
    
    pulsa4() {
        var text = document.getElementById('resultado');
        text.value += '4';
    }

    pulsa5() {
        var text = document.getElementById('resultado');
        text.value += '5';
    }

    pulsa6() {
        var text = document.getElementById('resultado');
        text.value += '6';
    }

    pulsa7() {
        var text = document.getElementById('resultado');
        text.value += '7';
    }

    pulsa8() {
        var text = document.getElementById('resultado');
        text.value += '8';
    }

    pulsa9() {
        var text = document.getElementById('resultado');
        text.value += '9';
    }

    pulsa0() {
        var text = document.getElementById('resultado');
        text.value += '0';
    }

    apilar() {
        var text = document.getElementById('resultado');
        let valorAApilar = parseFloat(text.value);
        pila.apilar(valorAApilar);
        text.value = '';
    }

    clear() {
        pila.clear();
        document.getElementById('resultado').value = '';
    }
}

class CalculadoraRPN extends Calculadora {
    CalculadoraRPN() {
        this.super();
    }

    pi() {
        var text = document.getElementById('resultado');
        text.value += Math.PI.toString();
    }

    shift() {
        if(this.shiftEnabled) {
            this.shiftEnabled = false;
        } else {
            this.shiftEnabled = true;
        }
        
    }

    erase() {
        var valor = document.getElementById("resultado").value;
        document.getElementById("resultado").value = valor.substring(0, valor.length - 1);
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
        var text = document.getElementById('resultado');
        text.value += Math.exp(1);
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
        return document.getElementById('resultado').value;
    }

    removeLastDigit() {
        document.getElementById('resultado').value = '';
    }
}

var calculadora = new CalculadoraRPN();