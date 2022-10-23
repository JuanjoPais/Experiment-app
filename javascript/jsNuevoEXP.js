// defino 

const equipos = ["Tissue", "Stem cells", "Ecología"];

const expesCreados = [];
const listadoReactivosComplementarios = [];

let stockMedioCultivoMl = 1000;

const botonNuevoExp = document.getElementById("botonNuevoExp");

const nuevoReactivos = document.getElementById("formRadioDefault");

let colorElegido = document.getElementById("colorInput");

let fichaExp = document.getElementById("fichaExp");


let fechaInicial =  new Date (document.getElementById("fechaInicio").value).getTime();

let fechaFinal = new Date (document.getElementById("fechaFin").value);


//let stockActualizado = localStorage.setItem("stock medio cultivo", JSON.stringify(stockMedioCultivoMl)); 



let stock = JSON.parse(localStorage.getItem("stock medio cultivo"));


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
      stock = stock - this.consumoMedioCultivo; 
      
      
      swal(`Se actualizó el stock del medio de cultivo. Ahora quedan ${stock} ml.`);

        localStorage.setItem("stock medio cultivo", JSON.stringify(stock))

        return stock;
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

    expesCreados.push(experimento);

    if (stock < 10) {
        swal(`Reponer medio de cultivo. Sólo quedan ${stock} ml.`);
    };
    
    localStorage.setItem(`${document.getElementById("nombreExp").value}`, JSON.stringify(experimento));

    

    document.getElementById("divTitulo").innerHTML+= nombreExp;
    document.getElementById("divEquipo").innerHTML+= seleccionEquipo;
    document.getElementById("divUsuario").innerHTML+= seleccionUsuario;
    document.getElementById("divDescripcion").innerHTML+= descripcion;
    document.getElementById("divInicio").innerHTML+= seleccionInicio;
    document.getElementById("divFinal").innerHTML+= seleccionFin;
    document.getElementById("divConsumo").innerHTML+= seleccionConsumoMedioCultivo;

    

    return experimento;
}

const crearReactivoComplementario = () => {
    let reactivo = document.getElementById("reactivo").value;
    let marcaYLote = document.getElementById("marcaYLote").value;
    let cantidad = parseFloat(document.getElementById("cantidad").value);
    

    const nuevoReactivo = new ReactivosComplementarios(reactivo, marcaYLote, cantidad);

    listadoReactivosComplementarios.push(nuevoReactivo);  

    document.getElementById("divReactivosExtra").innerHTML+= `${listadoReactivosComplementarios[0].reactivo}, marca y lote: ${listadoReactivosComplementarios[0].marcaYLote}, volumen ${listadoReactivosComplementarios[0].cantidad} ml`;


    return listadoReactivosComplementarios;
}



// Validacion de formulario y cargar de datos

botonNuevoExp.addEventListener("click", (e)=>{
   e.preventDefault();

   //validaciones y carga de formulario

   if (document.getElementById("nombreExp").value == ""){
    document.getElementById("nombreExp").style.backgroundColor = "#E3F553";
    return
   }
   if(equipos.includes(document.getElementById("equipoExp").value) == false){
    document.getElementById("equipoExp").style.backgroundColor = "#E3F553";
    return
   }

   

   //validar el usuario viendo si inició sesión

   if (document.getElementById("idDescripcion").value == ""){
    document.getElementById("idDescripcion").style.backgroundColor = "#E3F553";
    return
   }

   if ((document.getElementById("fechaInicio").value <= document.getElementById("fechaFin").value) == false){
    document.getElementById("divFechas").style.backgroundColor = "#E3F553";   
    return ;
    }      
      
   

    if (document.getElementById("consumoMedioCultivo").value > stock){
        swal("No hay suficiente medio de cultivo. Ingresá una cantidad menor, o prepará más medio de cultivo.")
        return
    }  

    

   crearExperimento();
   
   document.getElementById("fichaExp").classList.add("visible");
   
});

//creo un div con un reactivo extra

const mostrarSumarReactivo = () => {

    let divNuevoReactivo = document.createElement("div");   

    divNuevoReactivo.innerHTML = `
          
          <input id="reactivo" class ="form-control m-1 border border-dark" type="text" placeholder="Reactivo"> 
          <input id="marcaYLote" class ="form-control m-1 border border-dark" type="text" type="text" placeholder="Marca y número de lote"> 
          <input id="cantidad" class ="form-control m-1 border border-dark" type="text" type="text" placeholder="Cantidad a utlizar"> 
          <button  id="botonIncluirReactivo" class ="m-1 btn btn-dark">Incluir Reactivo</button>
          `;

    document.getElementById("nuevoReactivo").append(divNuevoReactivo);

    const formCargarReactivoComplementario = document.getElementById("botonIncluirReactivo");

    formCargarReactivoComplementario.addEventListener("click", (e)=>{
    e.preventDefault();
    crearReactivoComplementario();
});

}




nuevoReactivos.addEventListener("click", mostrarSumarReactivo);

// doy color al borde del expe creado

colorElegido.addEventListener("input", ()=>{
    fichaExp.style.borderColor = colorElegido.value
});

// armo funcion de ficha del expe









