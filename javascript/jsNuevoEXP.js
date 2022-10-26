const equipos = ["Tissue", "Stem cells", "Ecología"];

const listadoReactivosComplementarios = [];


const botonNuevoExp = document.getElementById("botonNuevoExp");
const nuevoReactivos = document.getElementById("formRadioDefault");
let colorElegido = document.getElementById("colorInput");
let fichaExp = document.getElementById("fichaExp");
let fechaInicial = new Date(document.getElementById("fechaInicio").value).getTime();
let fechaFinal = new Date(document.getElementById("fechaFin").value);
let stockMedioCultivoMl = JSON.parse(localStorage.getItem("stock medio cultivo")) || 1000;

stockMedioCultivoMl == 0 &&  actualizarMedioCultivo();






class Experimento {
    constructor(nombreExp, equipo, usuario, descripcion, fechaInicio, fechaFin, consumoMedioCultivo, color, reactivosExtra) {
        this.nombreExp = nombreExp;
        this.equipo = equipo;
        this.usuario = usuario;
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.consumoMedioCultivo = consumoMedioCultivo;
        this.color = color;
        this.reactivosExtra = reactivosExtra;
    }
    restarMedioCultivo() {
        stockMedioCultivoMl = stockMedioCultivoMl - this.consumoMedioCultivo;
        swal(`Se actualizó el stock del medio de cultivo. Ahora quedan ${stockMedioCultivoMl} ml.`);
      
        localStorage.setItem("stock medio cultivo", JSON.stringify(stockMedioCultivoMl))
        return stockMedioCultivoMl;
    }
}

class ReactivosComplementarios {
    constructor(reactivo, marcaYLote, cantidad) {
        this.reactivo = reactivo;
        this.marcaYLote = marcaYLote;
        this.cantidad = cantidad;
    }
}

const crearExperimento = () => {
    let nombreExp = document.getElementById("nombreExp").value;
    let seleccionEquipo = document.getElementById("equipoExp").value;
    let seleccionUsuario = document.getElementById("usuario").value;
    let descripcion = document.getElementById("idDescripcion").value;
    let seleccionInicio = document.getElementById("fechaInicio").value;
    let seleccionFin = document.getElementById("fechaFin").value;
    let seleccionConsumoMedioCultivo = parseFloat(document.getElementById("consumoMedioCultivo").value);
    let seleccionColor = document.getElementById("colorInput").value;
    let seleccionReactivosExtra = listadoReactivosComplementarios;

    const experimento = new Experimento(nombreExp, seleccionEquipo, seleccionUsuario, descripcion, seleccionInicio, seleccionFin, seleccionConsumoMedioCultivo, seleccionColor, seleccionReactivosExtra);
    experimento.restarMedioCultivo();
    arrayExperimentos.push(experimento);
    localStorage.setItem(`${document.getElementById("nombreExp").value}`, JSON.stringify(experimento));
    localStorage.setItem("experimentos", JSON.stringify(arrayExperimentos));

    document.getElementById("divTitulo").innerHTML += nombreExp;
    document.getElementById("divEquipo").innerHTML += seleccionEquipo;
    document.getElementById("divUsuario").innerHTML += seleccionUsuario;
    document.getElementById("divDescripcion").innerHTML += descripcion;
    document.getElementById("divInicio").innerHTML += seleccionInicio;
    document.getElementById("divFinal").innerHTML += seleccionFin;
    document.getElementById("divConsumo").innerHTML += seleccionConsumoMedioCultivo;


    if (stockMedioCultivoMl < 10) {
        swal(`Reponer medio de cultivo. Sólo quedan ${stockMedioCultivoMl} ml.`);
    };

    return experimento;
}

const crearReactivoComplementario = () => {
    let reactivo = document.getElementById("reactivo").value;
    let marcaYLote = document.getElementById("marcaYLote").value;
    let cantidad = parseFloat(document.getElementById("cantidad").value);

    const nuevoReactivo = new ReactivosComplementarios(reactivo, marcaYLote, cantidad);

    listadoReactivosComplementarios.push(nuevoReactivo);

    document.getElementById("divReactivosExtra").innerHTML += `${listadoReactivosComplementarios[0].reactivo}, marca y lote: ${listadoReactivosComplementarios[0].marcaYLote}, volumen ${listadoReactivosComplementarios[0].cantidad} ml`;

    return listadoReactivosComplementarios;
}

// Validacion de formulario y cargar de datos



botonNuevoExp.addEventListener("click", (e) => {
    e.preventDefault();

    if (document.getElementById("nombreExp").value == "") {
        document.getElementById("nombreExp").style.backgroundColor = "#E3F553";
        return
    }
    if (equipos.includes(document.getElementById("equipoExp").value) == false) {
        document.getElementById("equipoExp").style.backgroundColor = "#E3F553";
        return
    }
    function chequeoUsuariosExistentes (){
        arrayUsuarios.forEach(usuario => {
            usuario.nombreUsuario == document.getElementById("usuario").value        
         })
    return
    }
    if(chequeoUsuariosExistentes() == false){
        document.getElementById("usuario").style.backgroundColor = "#E3F553";
        swal("Ese nombre de usuario no está registrado. Corregilo o iniciá sesión primero.")
        return
    }
    if(JSON.parse(sessionStorage.getItem("inicioSesion"))!=1){
        document.getElementById("usuario").style.backgroundColor = "#E3F553";
        swal("El usuario es correcto pero tu sesión no está iniciada. Iniciá sesión en Log In.")
        return
    }
    if (document.getElementById("idDescripcion").value == "") {
        document.getElementById("idDescripcion").style.backgroundColor = "#E3F553";
        return
    }
    if ((document.getElementById("fechaInicio").value <= document.getElementById("fechaFin").value) == false) {
        document.getElementById("divFechas").style.backgroundColor = "#E3F553";
        return;
    }
    if (document.getElementById("consumoMedioCultivo").value > stockMedioCultivoMl) {
        swal(`No hay suficiente medio de cultivo (quedan sólo ${stockMedioCultivoMl}). Ingresá una cantidad menor, o prepará más medio de cultivo.`)
        return
    }
    crearExperimento();
    document.getElementById("fichaExp").classList.add("visible");
});

//creo un div con un reactivo extra

// REVISAR ESTO. TENGO QUE CAMBIAR LA FORMA DE GENERAR LOS BOTONES

const mostrarSumarReactivo = () => {
    let divNuevoReactivo = document.createElement("div");
    divNuevoReactivo.innerHTML = `          
          <input id="reactivo" class ="form-control m-1 border border-dark" type="text" placeholder="Reactivo"> 
          <input id="marcaYLote" class ="form-control m-1 border border-dark" type="text" type="text" placeholder="Marca y número de lote"> 
          <input id="cantidad" class ="form-control m-1 border border-dark" type="text" type="text" placeholder="Cantidad a utlizar"> 
          <button  id="cargarReactivo" class ="m-1 btn btn-dark">Cargar Reactivo</button>
          <button  id="sumarOtroReactivo" class ="m-1 btn btn-dark">Sumar más reactivos</button>
          `;

    document.getElementById("nuevoReactivo").append(divNuevoReactivo);

    const formCargarReactivoComplementario = document.getElementById("cargarReactivo");

    formCargarReactivoComplementario.addEventListener("click", (e) => {
        e.preventDefault();
        crearReactivoComplementario();
    });

    const btnSumarOtroReactivo = document.getElementById("sumarOtroReactivo");

    btnSumarOtroReactivo.addEventListener("click", (e)=>{
        e.preventDefault();
        document.getElementById("checkComplementarios").innerHTML=""
    })

    document.getElementById("reactivo").innerText=""
    document.getElementById("marcaYLote").innerText=""
    document.getElementById("cantidad").innerText=""

};

nuevoReactivos.addEventListener("click", mostrarSumarReactivo);

// doy color al borde del expe creado

colorElegido.addEventListener("input", () => {
    fichaExp.style.borderColor = colorElegido.value
});

