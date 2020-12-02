class Parrafo {
    constructor() {
        document.write("<p> Curso actual: ");
        document.write(informacion.curso);
        document.write("</p>");
        document.write("<p> Alumno: ");
        document.write(informacion.alumno);
        document.write("</p>");
        document.write("<p> e-mail: ");
        document.write(informacion.email);
        document.write("</p>");
    }

}
var parrafo = new Parrafo();
