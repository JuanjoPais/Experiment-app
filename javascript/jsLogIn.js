const listadoUsuarios = [];

let formUsuario = document.getElementById("botonNuevoUsuario");


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
    let constrasenia = document.getElementById("constraseniaUsuario").value;

    const nuevoUsuario = new Usuarios(nombre.toLowerCase(), apellido.toLowerCase(), nombreUsuario.toLowerCase(), constrasenia.toLowerCase());

    listadoUsuarios.push(nuevoUsuario);
    return listadoUsuarios;
}

formUsuario.addEventListener("click", (e)=>{
    e.preventDefault()
    crearUsuario()
});


