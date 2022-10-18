// defino 

const equipos = ["Tissue", "Stem cells", "Ecología"];

const expesCreados = [];
const listadoReactivosComplementarios = [];

let stockMedioCultivoMl = 100;

const botonNuevoExp = document.getElementById("botonNuevoExp");

const nuevoReactivo = document.getElementById("formRadioDefault");

let colorElegido = document.getElementById("colorInput");

let fichaExp = document.getElementById("fichaExp");

let fechaInicial =  new Date (document.getElementById("fechaInicio").value).getTime();

let fechaFinal = new Date (document.getElementById("fechaFin").value);





// armo el constructor de objetos


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
        stockMedioCultivoMl -= this.consumoMedioCultivo;
        alert(`Se actualizó el stock del medio de cultivo. Ahora quedan ${stockMedioCultivoMl} ml.`);
        return stockMedioCultivoMl;
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

    expesCreados.push(experimento);

    if (stockMedioCultivoMl < 10) {
    alert(`Reponer medio de cultivo. Sólo quedan ${stockMedioCultivoMl} ml.`);
    };

    return experimento;
}

class ReactivosComplementarios {
    constructor(reactivo, marcaYLote, cantidad) {
        this.reactivo = reactivo;
        this.marcaYLote = marcaYLote;
        this.cantidad = cantidad;        
    }
}

// Validacion de formulario y cargar de datos

botonNuevoExp.addEventListener("click", (e)=>{
   e.preventDefault();

   //validaciones y carga de formulario

   if (document.getElementById("nombreExp").value == ""){
    document.getElementById("nombreExp").style.backgroundColor = "#A74444";
    return
   }
   if(equipos.includes(document.getElementById("equipoExp").value) == false){
    document.getElementById("equipoExp").style.backgroundColor = "#A74444";
    return
   }

   //validar el usuario viendo si inició sesión

   if (document.getElementById("idDescripcion").value == ""){
    document.getElementById("idDescripcion").style.backgroundColor = "#A74444";
    return
   }

   if ((document.getElementById("fechaInicio").value <= document.getElementById("fechaFin").value) == false){
    document.getElementById("divFechas").style.backgroundColor = "#A74444"   
    return ;
    }
   

   //mandar a storage
   crearExperimento();


});









//creo un div con un reactivo extra



const mostrarSumarReactivo = () => {

    let divNuevoReactivo = document.createElement("div");

   

    divNuevoReactivo.innerHTML = `
          
          <input id="reactivo" class ="m-2" type="text" placeholder="Reactivo"> 
          <input id="marcaYLote" class ="m-2" type="text" placeholder="Marca y número de lote"> 
          <input id="cantidad" class ="m-2" type="text" placeholder="Cantidad a utlizar"> 
          <button  id="botonIncluirReactivo" class ="m-2">Incluir Reactivo</button>
          `;

    document.getElementById("nuevoReactivo").append(divNuevoReactivo);

    const formCargarReactivoComplementario = document.getElementById("botonIncluirReactivo");

    formCargarReactivoComplementario.addEventListener("click", (e)=>{
    e.preventDefault();
    crearReactivoComplementario();
});

}

const crearReactivoComplementario = () => {
    let reactivo = document.getElementById("reactivo").value;
    let marcaYLote = document.getElementById("marcaYLote").value;
    let cantidad = parseFloat(document.getElementById("cantidad").value);
    

    const nuevoReactivo = new ReactivosComplementarios(reactivo.toLowerCase(), marcaYLote.toLowerCase(), cantidad);

    listadoReactivosComplementarios.push(nuevoReactivo);  

    return listadoReactivosComplementarios;
}


nuevoReactivo.addEventListener("click", mostrarSumarReactivo);

// doy color al borde del expe creado

colorElegido.addEventListener("input", ()=>{
    fichaExp.style.borderColor = colorElegido.value
});









