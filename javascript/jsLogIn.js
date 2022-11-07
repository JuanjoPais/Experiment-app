let formUsuario = document.getElementById("botonRegistro");
let errorRegistro = document.getElementById("errorRegistro");
let botonSesion = document.getElementById("botonInicioSesion");
let sesionIniciada = 0;
let existe;
let claveCorrecta;
let claveUsuarioSesion = document.getElementById("constraseniaUsuarioSesion").value;
let contador = 0;
let formInicioSesion = document.getElementById("formInicioSesion");


//defino constructor de usuarios
class Usuarios {
    constructor(nombre, apellido, nombreUsuario, contrasenia) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.nombreUsuario = nombreUsuario;
        this.contrasenia = contrasenia;
    }
}

//armo función para crear un usuario nuevo a partir de los datos ingresados. Luego subo a localStorage
const crearUsuario = () => {
    let nombre = document.getElementById("nombreUsuario").value;
    let apellido = document.getElementById("apellidoUsuario").value;
    let nombreUsuario = document.getElementById("usuario").value;
    let contrasenia = document.getElementById("contraseniaUsuario").value;

    const nuevoUsuario = new Usuarios(nombre, apellido, nombreUsuario, contrasenia);
    arrayUsuarios.push(nuevoUsuario);
    localStorage.setItem(`Usuario ${nuevoUsuario.nombre} ${nuevoUsuario.apellido}`, JSON.stringify(nuevoUsuario))
    localStorage.setItem("usuarios", JSON.stringify(arrayUsuarios))

    return arrayUsuarios;
}

//Hago una validación del formulario para chequear los datos antes de registrar al usuario nuevo
formUsuario.addEventListener("click", (e) => {
    e.preventDefault();
    if (document.getElementById("nombreUsuario").value == "") {
        document.getElementById("nombreUsuario").style.backgroundColor = "#E3F553";
        return
    }
    if (document.getElementById("apellidoUsuario").value == "") {
        document.getElementById("apellidoUsuario").style.backgroundColor = "#E3F553";
        return
    }
    if (document.getElementById("usuario").value == "") {
        document.getElementById("usuario").style.backgroundColor = "#E3F553";
        return
    }
    if (document.getElementById("contraseniaUsuario").value == "") {
        document.getElementById("contraseniaUsuario").style.backgroundColor = "#E3F553";
        return
    }
    crearUsuario()
    swal("Registro exitoso", "Tu registro fue almacenado correctamente", "success");
});



/*defino una función para ver si existe el usuario ingresado en el form de inicio de sesion. Para chequear
 recorro el array de usuarios que está en el localStorage. Si existe, le cambio el valor a la variable "contador" 
 para poder leer luego que la sesión fue iniciada. Luego hago lo mismo con las contraseñas.*/
function validoUsuario() {
    let existe = false;
    for (i = 0; i < arrayUsuarios.length; i++) {
        if (arrayUsuarios[i].nombreUsuario == document.getElementById("nombreUsuarioSesion").value) {
            existe = true;
            contador += 1;
        }
    }
    if (existe == false) {
        swal("Usuario no encontrado", "Revisá el nombre de usuario o registrate antes de iniciar sesión", "error");
        return;
    }
    return existe;
}

function validoContrasenia() {
    let claveCorrecta = false;
    for (i = 0; i < arrayUsuarios.length; i++) {

        if (arrayUsuarios[i].contrasenia == document.getElementById("constraseniaUsuarioSesion").value) {
            claveCorrecta = true;
            contador += 1;
        }
    }
    if (claveCorrecta == false) {
        swal("La contraseña no es correcta", "Revisá la clave o registrate antes de iniciar sesión", "error");
        return
    }
    return claveCorrecta;
}

/*Esta funcion "incluirBtnCerrar" la creo para que me genere un botón para cerrar sesión luego de iniciarla*/

const incluirBtnCerrar = () => {
    if (sessionStorage.getItem("inicioSesion") == 1) {
        let btnCerrarSesion = document.createElement("div");
        btnCerrarSesion.innerHTML = `
                        <button id="btnCerrar" class= "form-control m-3 bd-highlight d-inline-block border border-dark btn btn-dark">Doble click para cerrar sesión</button>`;
        formInicioSesion.append(btnCerrarSesion);
        btnCerrarSesion.setAttribute("id", "sacarBotonCerrar");
    };
}

//En este evento se da el inicio de sesión si el usuario y la clave son correctas. Y luego se llama a la funcion que crea el botón para cerrar sesión.
botonSesion.addEventListener("click", (e) => {
    e.preventDefault();
    validoUsuario();
    validoContrasenia();

    if (contador >= 2) {
        swal("Sesión iniciada!", "Bienvenid@", "success");
        sesionIniciada = 1;
        sessionStorage.setItem("inicioSesion", sesionIniciada)
    }
    incluirBtnCerrar();
});

/* Una vez que está la sesión inciada y existe el botón de cerrar sesión, creo un evento para que la sesión se cierre
y reinicio el valor almacenado en el session.Storage.  */
const cerrarSesion = () => {
    incluirBtnCerrar();
    if (sessionStorage.getItem("inicioSesion") == 1) {
        document.getElementById("btnCerrar").addEventListener("click", (e) => {
            e.preventDefault();
            sesionIniciada = 0;
            sessionStorage.setItem("inicioSesion", sesionIniciada);
            formInicioSesion.removeChild(document.getElementById("sacarBotonCerrar"));
            swal("Cerraste la sesión!", "Hasta la vista, baby", "success");
        })
    }
}
cerrarSesion()