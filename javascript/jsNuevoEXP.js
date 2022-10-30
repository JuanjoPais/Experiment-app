const equipos = ["Tissue", "Stem cells", "Ecología"];

const listadoReactivosComplementarios = [];


const botonNuevoExp = document.getElementById("botonNuevoExp");

let colorElegido = document.getElementById("colorInput");
let fichaExp = document.getElementById("fichaExp");
let fechaInicial = new Date(document.getElementById("fechaInicio").value).getTime();
let fechaFinal = new Date(document.getElementById("fechaFin").value);
let stockMedioCultivoMl = JSON.parse(localStorage.getItem("stock medio cultivo")) || 1000;

stockMedioCultivoMl == 0 &&  actualizarMedioCultivo();

let cantidadReactivos = document.getElementById("cantidadReactivos");
let btnDesplegarReactivos = document.getElementById("desplegarReactivos");
let matcheoUsuario = 0;





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
        for (let i=0; i<arrayUsuarios.length; i++){
            if(arrayUsuarios[i].nombreUsuario == document.getElementById("usuario").value){
                matcheoUsuario++
            }            
        }            
        return matcheoUsuario;    
    }
    chequeoUsuariosExistentes();

    if(matcheoUsuario==0){
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

const mostrarSumarYCargarReactivos = () => {
    for (let i=0; i<cantidadReactivos.value; i++){
    let divNuevoReactivo = document.createElement("div");
    divNuevoReactivo.innerHTML = `          
          <input id="reactivo${i}" class ="form-control m-1 border border-dark" type="text" placeholder="Reactivo"> 
          <input id="marcaYLote${i}" class ="form-control m-1 border border-dark" type="text" type="text" placeholder="Marca y número de lote"> 
          <input id="cantidad${i}" class ="form-control m-1 border border-dark" type="number" min="0" placeholder="Cantidad a utlizar"> 
          <button  id="cargarReactivo${i}" class ="m-1 btn btn-dark">Cargar Reactivo</button>         
          `;

    document.getElementById("nuevoReactivo").append(divNuevoReactivo);

    const formCargarReactivoComplementario = document.getElementById(`cargarReactivo${i}`);

    formCargarReactivoComplementario.addEventListener("click", (e) => {
        e.preventDefault();
        let reactivo = document.getElementById(`reactivo${i}`).value;
        let marcaYLote = document.getElementById(`marcaYLote${i}`).value;
        let cantidad = parseFloat(document.getElementById(`cantidad${i}`).value);
    
        const nuevoReactivo = new ReactivosComplementarios(reactivo, marcaYLote, cantidad);
    
        listadoReactivosComplementarios.push(nuevoReactivo);
    
        document.getElementById("divReactivosExtra").innerHTML += `${listadoReactivosComplementarios[i].reactivo}, marca y lote: ${listadoReactivosComplementarios[i].marcaYLote}, volumen ${listadoReactivosComplementarios[i].cantidad} ml.<br>`;
       
        return listadoReactivosComplementarios;;
    })};
    

};

btnDesplegarReactivos.addEventListener("click", (e)=>{
    e.preventDefault();
    mostrarSumarYCargarReactivos()});

// doy color al borde del expe creado

colorElegido.addEventListener("input", () => {
    fichaExp.style.borderColor = colorElegido.value
});

