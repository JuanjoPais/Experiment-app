let contenedorExpes = document.getElementById("contenedorExpes");
let filtroTissue = document.getElementById("botonTissue");
let filtroStemCells = document.getElementById("botonStemCells");
let filtroEcologia = document.getElementById("botonEcologia");
let filtroTodos = document.getElementById("botonTodos");
let opcionesDeUsuarios = document.getElementById("opcionesDeUsuarios");
let opcionTodosUsuarios = document.getElementById("todosUsuarios");
let btnConcluidos = document.getElementById("botonConcluidos");
let btnEnCurso = document.getElementById("botonEnCurso");
let btnProgramados = document.getElementById("botonProgramados");
let btnTodosFechas = document.getElementById("botonTodosFechas");
let hoy = new Date();
let btnBorrarExpes = document.querySelectorAll(".btnBorrarExpe");
let botonTorta = document.getElementById("botonTorta");

AOS.init();

/*Defino la función que muestra todos los experimentos que hay en el localStorage. Recorre el array de expes
e inyecta la info de cada uno en una ficha. Si un expe tiene reactivos extras, hago un forEach para sumarlos a la ficha.
Al final, agrego una clase, un estilo y una animación a cada uno.*/
function mostrarExpes() {
    for (let i = 0; i < arrayExperimentos.length; i++) {
        let divCadaExp = document.createElement("div");
        divCadaExp.innerHTML += `
            <h3 class="tituloFicha">${arrayExperimentos[i].nombreExp}</h3>
            <div class="contenedorArribaFicha">
                <div> 
                    <p>Responsable: ${arrayExperimentos[i].usuario}</p>
                    <p>Equipo: ${arrayExperimentos[i].equipo}</p>
                </div>
                <div>
                    <p>Inicio : ${arrayExperimentos[i].fechaInicio}</p>
                    <p>Fin: ${arrayExperimentos[i].fechaFin}</p>  
                </div>
            </div>
            <p class="mt-2 descripcionFicha">${arrayExperimentos[i].descripcion}</p>`;

        if ((arrayExperimentos[i].reactivosExtra).length != 0) {
            let divExtras = document.createElement("div");
            divExtras.innerHTML = `
                    <div class="titulosExtras mt-2">
                    <p>Reactivo</p>
                    <p>Marca y Lote</p>
                    <p>Cantidad</p> 
                    </div>                
                `;
            arrayExperimentos[i].reactivosExtra.forEach(dato => {
                divExtras.innerHTML += `   
                    <div class="datosExtras">                 
                    <p>${dato.reactivo}</p>
                    <p>${dato.marcaYLote}</p>
                    <p>${dato.cantidad}</p>
                    </div>`
            })
            divCadaExp.appendChild(divExtras);
            divExtras.classList.add("divExtras")
        }
        contenedorExpes.appendChild(divCadaExp);
        divCadaExp.style.borderColor = arrayExperimentos[i].color;
        divCadaExp.classList.add("divExp");
        divCadaExp.setAttribute("data-aos", "zoom-in")
    }
}

mostrarExpes();

//Genero los filtros para que muestre los experimentos filtrados por equipo.

filtroTodos.addEventListener("click", () => {
    contenedorExpes.innerHTML = "";
    mostrarExpes();
})

filtroTissue.addEventListener("click", () => {
    contenedorExpes.innerHTML = "";
    let arrayFiltradoPorExpe = arrayExperimentos.filter(exp => exp.equipo == "Tissue");
    agregarExpeFiltrado(arrayFiltradoPorExpe);
});

filtroStemCells.addEventListener("click", () => {
    contenedorExpes.innerHTML = "";
    let arrayFiltradoPorExpe = arrayExperimentos.filter(exp => exp.equipo == "Stem cells");
    agregarExpeFiltrado(arrayFiltradoPorExpe)
});

filtroEcologia.addEventListener("click", () => {
    contenedorExpes.innerHTML = "";
    let arrayFiltradoPorExpe = arrayExperimentos.filter(exp => exp.equipo == "Ecología");
    agregarExpeFiltrado(arrayFiltradoPorExpe);
});

//Esta es la función que es invocada para mostrar los experimentos filtrados en cada caso.
let agregarExpeFiltrado = (array) => {
    array.forEach(element => {
        let divCadaExp = document.createElement("div");
        divCadaExp.innerHTML += `
        <h3 class="tituloFicha">${element.nombreExp}</h3> 
        <div class="contenedorArribaFicha">
            <div>
                <p>Responsable: ${element.usuario}</p>            
                <p>Equipo: ${element.equipo}</p>
            </div>
            <div>    
                <p>Inicio : ${element.fechaInicio}</p>
                <p>Fin: ${element.fechaFin}</p>  
            </div>  
        </div>
        <p class="mt-2 descripcionFicha">${element.descripcion}</p> 
    `;
        if ((element.reactivosExtra).length != 0) {
            let divExtras = document.createElement("div");
            divExtras.innerHTML = `
            <div class="titulosExtras mt-2">
            <p>Reactivo</p>
            <p>Marca y Lote</p>
            <p>Cantidad</p> 
            </div>                
        `;
            element.reactivosExtra.forEach(dato => {
                divExtras.innerHTML += `   
            <div class="datosExtras">                 
            <p>${dato.reactivo}</p>
            <p>${dato.marcaYLote}</p>
            <p>${dato.cantidad}</p>
            </div>`
            })
            divCadaExp.appendChild(divExtras);
            divExtras.classList.add("divExtras")
        }
        contenedorExpes.appendChild(divCadaExp);
        divCadaExp.style.borderColor = element.color;
        divCadaExp.classList.add("divExp");
        divCadaExp.setAttribute("data-aos", "zoom-in")
    });

}

/*Ahora quiero hacer un filtro por usuarios. Primero recorro el localStorage para traer los nombre de usuarios
registrados, y luego los inyecto como opción elegible dentro de la etiqueta select del HTML.*/

let ponerUsuariosEnFiltro = () => {
    arrayUsuarios.forEach(usuario => {
        let nuevaOpcionUsuario = document.createElement("option")
        nuevaOpcionUsuario.innerHTML += usuario.nombreUsuario
        nuevaOpcionUsuario.setAttribute("id", `${usuario.nombreUsuario}`);
        nuevaOpcionUsuario.setAttribute("value", `${usuario.nombreUsuario}`);
        opcionesDeUsuarios.append(nuevaOpcionUsuario);
    })
}
ponerUsuariosEnFiltro();

/*Esta es la función que filtra por usuarios y llama a las primeras 2 funciones para inyectarlos en el html
en forma de ficha a cada uno.*/
opcionesDeUsuarios.addEventListener("change", (e) => {
    if (e.target.value == ("todos")) {
        contenedorExpes.innerHTML = "";
        mostrarExpes();
    } else {
        contenedorExpes.innerHTML = "";
        let arrayExpePorUsuario = arrayExperimentos.filter(exp => exp.usuario == e.target.value);
        agregarExpeFiltrado(arrayExpePorUsuario);
    }
});

/*En esta sección filtro por fecha. Comparo las fecha de inicio y fin de cada expe con la fecha actual para 
mostrar los experimentos terminados, en curso y los futuros.*/
btnConcluidos.addEventListener("click", () => {
    let arrayConcluidos = arrayExperimentos.filter(exp => (new Date(exp.fechaFin).getTime() < hoy.getTime()));
    contenedorExpes.innerHTML = "";
    agregarExpeFiltrado(arrayConcluidos);
});

btnProgramados.addEventListener("click", () => {
    let arrayProgramados = arrayExperimentos.filter(exp => (new Date(exp.fechaInicio).getTime() > hoy.getTime()));
    contenedorExpes.innerHTML = "";
    agregarExpeFiltrado(arrayProgramados);
})

btnEnCurso.addEventListener("click", () => {
    let arrayEnCurso1 = arrayExperimentos.filter(exp => hoy.getTime() < new Date(exp.fechaFin).getTime());
    let arrayEnCurso2 = arrayEnCurso1.filter(exp => (new Date(exp.fechaInicio).getTime() < hoy.getTime()));
    contenedorExpes.innerHTML = "";
    agregarExpeFiltrado(arrayEnCurso2);
})

btnTodosFechas.addEventListener("click", () => {
    contenedorExpes.innerHTML = "";
    mostrarExpes();
})

// Hago uso de la librería Charts.js para mostrar graficamente la proporción de experimentos de cada equipo.

botonTorta.addEventListener("click", () => {
    contenedorExpes.innerHTML = "";
    let divCanvas = document.createElement("div");
    divCanvas.innerHTML = `<canvas id="myChart" width="500%" height="500%"></canvas>`
    contenedorExpes.appendChild(divCanvas);
    divCanvas.classList.add("divCanvas");
    const labels = [
        'Tissue',
        'Stem Cells',
        'Ecology',
    ];
    const data = {
        labels: labels,
        datasets: [{
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            borderColor: 'black',
            data: [
                (arrayExperimentos.filter(exp => exp.equipo == "Tissue")).length,
                (arrayExperimentos.filter(exp => exp.equipo == "Stem cells")).length,
                (arrayExperimentos.filter(exp => exp.equipo == "Ecología")).length,
            ],
        }]
    };
    const config = {
        type: 'doughnut',
        data: data,
        options: {}
    };
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
});