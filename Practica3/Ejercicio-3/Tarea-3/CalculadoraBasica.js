
class Calculadora{
    constructor(){
        this.memo = null;
    }

    suma(){
        var text = document.getElementById('resultado');
        text.value += "+";
    }

    resta() {
        var text = document.getElementById('resultado');
        text.value += '-';
    }

    multiplicacion() {
        var text = document.getElementById('resultado');
        text.value += '*';
    }

    division() {
        var text = document.getElementById('resultado');
        text.value += '/';
    }

    coma() {
        var text = document.getElementById('resultado');
        text.value += '.';
    }

    clear() {
        document.getElementById('resultado').value = '';
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

    resolver() {
        try {
            var str = document.getElementById('resultado').value;
            document.getElementById("resultado").value = eval(str);
        }
        catch(err) {
             document.getElementById("resultado").value = "Error = " + err;
        }
    }
    
    mrc() {
        this.memo = null;
    }

    mMenos() {
        if(this.memo != null) {
            document.getElementById('resultado').value += this.memo;
            this.memo = null;
        }
    }

    mMas() {
        try {
           this.memo = eval(document.getElementById('resultado').value);
        }
        catch(err) {
           document.getElementById("resultado").value = "Error = " + err;
        }
    }
}

var calculadora = new Calculadora();