

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
    //mandar a storage
    return listadoUsuarios;
}

formUsuario.addEventListener("click", (e)=>{
    e.preventDefault()
    crearUsuario()

});

//hacer función para inicio de sesion, que tome el ususario y la clave desde el storage. Y que habilite la carga de expnuevo.


