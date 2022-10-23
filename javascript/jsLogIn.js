let formUsuario = document.getElementById("botonRegistro");
let errorRegistro = document.getElementById("errorRegistro");
let botonSesion = document.getElementById("botonInicioSesion");
let sesionIniciada =0;
let existe;
let claveCorrecta;



//let nombreUsuarioSesion = document.getElementById("nombreUsuarioSesion").value;
let claveUsuarioSesion = document.getElementById("constraseniaUsuarioSesion").value;



class Usuarios {
    constructor(nombre, apellido, nombreUsuario, contrasenia) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.nombreUsuario = nombreUsuario;
        this.contrasenia = contrasenia;
    }
}

const crearUsuario = () => {
    let nombre = document.getElementById("nombreUsuario").value;
    let apellido = document.getElementById("apellidoUsuario").value;
    let nombreUsuario = document.getElementById("usuario").value;
    let contrasenia = document.getElementById("contraseniaUsuario").value;

    const nuevoUsuario = new Usuarios(nombre, apellido, nombreUsuario, contrasenia);

    arrayUsuarios.push(nuevoUsuario);

    localStorage.setItem("nuevoUsuario", JSON.stringify(nuevoUsuario))

    localStorage.setItem("usuarios", JSON.stringify(arrayUsuarios))




    return listadoUsuarios;
}

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


//hacer función para inicio de sesion, que tome el ususario y la clave desde el storage. Y que habilite la carga de expnuevo.


let contador=0;

function validoUsuario() {
    let existe = false;
    for (i = 0; i < arrayUsuarios.length; i++) {
        if (arrayUsuarios[i].nombreUsuario == document.getElementById("nombreUsuarioSesion").value) {
            existe = true;
            contador +=1;
        }
    }
    if (existe == false) {
        swal("Usuario no encontrado", "Revisá el nombre de usuario o registrate antes de iniciar sesión", "error");
        return;
    }
    return existe;
}

function validoContrasenia(){
    let claveCorrecta = false;
    for (i = 0; i < arrayUsuarios.length; i++) {

        if (arrayUsuarios[i].contrasenia == document.getElementById("constraseniaUsuarioSesion").value) {
            claveCorrecta = true;
            contador+=1;
        }
    }
    if (claveCorrecta == false) {
        swal("La contraseña no es correcta", "Revisá la clave o registrate antes de iniciar sesión", "error");
        return
    }
    return claveCorrecta;
}

botonSesion.addEventListener("click", (e) => {
    e.preventDefault();
   
    validoUsuario();
    validoContrasenia();
    
        if (contador>=2){
            swal("Sesión iniciada!", "Bienvenid@", "success");
            sesionIniciada= 1;

            sessionStorage.setItem("inicioSesion", sesionIniciada)
        }
});
