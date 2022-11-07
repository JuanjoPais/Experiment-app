const equipos = ["Tissue", "Stem cells", "Ecología"];
const listadoReactivosComplementarios = [];
const botonNuevoExp = document.getElementById("botonNuevoExp");
let colorElegido = document.getElementById("colorInput");
let fichaExp = document.getElementById("fichaExp");
let fechaInicial = new Date(document.getElementById("fechaInicio").value).getTime();
let fechaFinal = new Date(document.getElementById("fechaFin").value);
let cantidadReactivos = document.getElementById("cantidadReactivos");
let btnDesplegarReactivos = document.getElementById("desplegarReactivos");
let matcheoUsuario = 0;

let stockMedioCultivoMl = JSON.parse(localStorage.getItem("stock medio cultivo")) || 1000;
stockMedioCultivoMl == 0 && actualizarMedioCultivo();


//Creo la clase que crea los nuevos experimentos, y que modifica el stock del medio de cultivo disponible.

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

//dentro del experimento necesité el uso de otra clase para incorporar reactivos adicionales.
class ReactivosComplementarios {
    constructor(reactivo, marcaYLote, cantidad) {
        this.reactivo = reactivo;
        this.marcaYLote = marcaYLote;
        this.cantidad = cantidad;
    }
}


/*Defino la funcion que crea los experimentos. Toma los datos del DOM, crea el expe, modifica el stock del medio de cultivo
sube el expe al localStorage y lo suma al resto ya creados. Y por último carga toda esta info en una ficha que 
se genera al lado del formulario a modo de resumen.*/

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

//Defino una función que voy a usar para validar. 

function chequeoUsuariosExistentes() {
    for (let i = 0; i < arrayUsuarios.length; i++) {
        if (arrayUsuarios[i].nombreUsuario == document.getElementById("usuario").value) {
            matcheoUsuario++
        }
    }
    return matcheoUsuario;
}

/*Hago la validación del formulario. Si algún dato ingreado es erróneo, se pinta el casillero de otro color,
o bien, salta un alert para avisar y corregir. Si todo está ok, se llama a la función que crea el expe.*/

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

    chequeoUsuariosExistentes();

    if (matcheoUsuario == 0) {
        document.getElementById("usuario").style.backgroundColor = "#E3F553";
        swal("Ese nombre de usuario no está registrado. Corregilo o iniciá sesión primero.")
        return
    }
    if (JSON.parse(sessionStorage.getItem("inicioSesion")) != 1) {
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



/*Con la siguiente función quiero mostrar un nuevo div que permita el ingreso de reactivos extras. 
como la cantidad de reactivos es variable, cada ID generado también lo es y esto lo uso para poder 
darle identidad propia a cada input y luego poder recuperar los datos individualmente.
Con cada set de datos ingresados, se genera un nuevo objeto que luego se agrega a un array ( que está vinculado al array general de experimentos.)
Finalmente, esos datos se inyectan en la ficha del experimento creado.*/

const mostrarSumarYCargarReactivos = () => {
    for (let i = 0; i < cantidadReactivos.value; i++) {
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

            document.getElementById("divReactivosExtra").innerHTML += `
            ${listadoReactivosComplementarios[i].reactivo}, marca y lote: ${listadoReactivosComplementarios[i].marcaYLote}, volumen ${listadoReactivosComplementarios[i].cantidad} ml.<br>`;

            return listadoReactivosComplementarios;;
        })
    };
};

btnDesplegarReactivos.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarSumarYCargarReactivos()
});

// doy color al borde del expe creado

colorElegido.addEventListener("input", () => {
    fichaExp.style.borderColor = colorElegido.value
});