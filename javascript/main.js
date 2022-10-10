// defino arrays

const equipos = ["tissue", "stem", "eco"];

const expesCreados = [];

const usuarios = [];



// defino la cantidad inicial de medio de cultivo

let stockMedioCultivoMl = 100;



// armo el constructor de objetos


class Experimento {
    constructor(nombreExp, equipo, duracion, consumoMedioCultivo) {
        this.nombreExp = nombreExp;
        this.equipo = equipo;
        this.duracion = duracion;
        this.consumoMedioCultivo = consumoMedioCultivo;
    }
    restarMedioCultivo() {
        stockMedioCultivoMl -= this.consumoMedioCultivo;
        alert(`Se actualizó el stock del medio de cultivo. Ahora quedan ${stockMedioCultivoMl} ml.`);
        return stockMedioCultivoMl;

    }

}

const crearExperimento = () => {
    let nombreExp = document.getElementById("nombreExp").value;
    let seleccionEquipo = document.getElementById("equipoExp").value;
    let seleccionDuracion = document.getElementById("diasExp").value;
    let seleccionConsumoMedioCultivo = document.getElementById("consumoMedioCultivo").value;

    const experimento = new Experimento(nombreExp, seleccionEquipo, seleccionDuracion, seleccionConsumoMedioCultivo);

    experimento.restarMedioCultivo();

    expesCreados.push(experimento);
    return experimento;
}




if (stockMedioCultivoMl < 10) {
    alert(`Reponer medio de cultivo. Sólo quedan ${stockMedioCultivoMl} ml.`);
}

const botonNuevoExp = document.getElementById("botonNuevoExp");

botonNuevoExp.addEventListener("click", crearExperimento);



//defino un funcion para quitar los experimentos que vayan terminando

const quitarExpes = () => {
    expesCreados.pop();
    return expesCreados;
};


//Armo objeto y array para almacenar usuarios

const listadoUsuarios = [];


class Usuarios {
    constructor(nombre, apellido, nombreUsuario, constrasenia) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.nombreUsuario = nombreUsuario;
        this.constrasenia = constrasenia;
    }
}

const crearUsuario = () => {
    let nombre = document.getElementById("nombreUsuario").value;
    let apellido = document.getElementById("apellidoUsuario").value;
    let nombreUsuario = document.getElementById("usuario").value;
    let constrasenia = document.getElementById("contraseniaUsuario").value;

    const nuevoUsuario = new Usuarios(nombre.toLowerCase(), apellido.toLowerCase(), nombreUsuario.toLowerCase(), constrasenia);

    listadoUsuarios.push(nuevoUsuario);
    return listadoUsuarios;
}


//creo un div con un reactivo extra

let nuevoReactivo = document.getElementById("formRadioDefault");

const mostrarSumarReactivo = () => {

    let divNuevoReactivo = document.createElement("div");

    divNuevoReactivo.classList.add("divNuevoReactivo");

    divNuevoReactivo.innerHTML = `
          <form>
          <input class ="m-2" type="text" placeholder="Reactivo"> 
          <input class ="m-2" type="text" placeholder="Marca y número de lote"> 
          <input class ="m-2" type="text" placeholder="Cantidad a utlizar"> 
          <button  id="botonIncluirReactivo" class ="m-2">Incluir Reactivo</button>
          </form>`;

    document.getElementById("nuevoReactivo").append(divNuevoReactivo);

}

nuevoReactivo.addEventListener("click", mostrarSumarReactivo);

//hago preventDefault en los formularios

let formulario = document.getElementById("formulario");

formulario.addEventListener("click", (e) => {
    e.preventDefault()
});