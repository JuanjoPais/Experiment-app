// defino 

const equipos = ["tissue", "stem", "eco"];

const expesCreados = [];
const listadoReactivosComplementarios = [];

let stockMedioCultivoMl = 100;

const botonNuevoExp = document.getElementById("botonNuevoExp");

const nuevoReactivo = document.getElementById("formRadioDefault");

let colorElegido = document.getElementById("colorInput");

let fichaExp = document.getElementById("fichaExp");






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
    let seleccionConsumoMedioCultivo = parseFloat(document.getElementById("consumoMedioCultivo").value);

    const experimento = new Experimento(nombreExp, seleccionEquipo, seleccionDuracion, seleccionConsumoMedioCultivo);

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







botonNuevoExp.addEventListener("click", (e)=>{
   e.preventDefault();
   crearExperimento();
});





//defino un funcion para quitar los experimentos que vayan terminando

const quitarExpes = () => {
    expesCreados.pop();
    return expesCreados;
};

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









