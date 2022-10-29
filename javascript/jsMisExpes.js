let contenedorExpes = document.getElementById("contenedorExpes");
let filtroTissue = document.getElementById("botonTissue");
let filtroStemCells = document.getElementById("botonStemCells");
let filtroEcologia = document.getElementById("botonEcologia");
let filtroTodos = document.getElementById("botonTodos");
let opcionesDeUsuarios = document.getElementById("opcionesDeUsuarios");
let opcionTodosUsuarios = document.getElementById("todosUsuarios");
let seleccionMesInicio = document.getElementById("seleccionMesInicio");
let seleccionAnioInicio= document.getElementById("seleccionAnioInicio");
let btnFiltrarFecha = document.getElementById("btnFiltrarFecha");


function mostrarExpes() {

    for (let i = 0; i < arrayExperimentos.length; i++) {

        let divCadaExp = document.createElement("div");

        divCadaExp.innerHTML += `
            <h3 class="tituloFicha">${arrayExperimentos[i].nombreExp}</h3> 
            <p>Responsable: ${arrayExperimentos[i].usuario}</p>
            <p>${arrayExperimentos[i].equipo}</p>
            <p>Inicio : ${arrayExperimentos[i].fechaInicio}</p>
            <p>Fin: ${arrayExperimentos[i].fechaFin}</p>      
        `;

        contenedorExpes.appendChild(divCadaExp);
        divCadaExp.style.borderColor = arrayExperimentos[i].color;
        divCadaExp.classList.add("divExp");

    }
}

mostrarExpes();

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

let agregarExpeFiltrado = (array) => {
    array.forEach(element => {
        let divCadaExp = document.createElement("div");
        divCadaExp.innerHTML += `
        <h3 class="tituloFicha">${element.nombreExp}</h3> 
        <p>${element.usuario}</p>            
        <p>${element.equipo}</p>
        <p>Inicio : ${element.fechaInicio}</p>
        <p>Fin: ${element.fechaFin}</p>      
    `;
        contenedorExpes.appendChild(divCadaExp);
        divCadaExp.style.borderColor = element.color;
        divCadaExp.classList.add("divExp");
    });

}



//filtro por usuario

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

opcionesDeUsuarios.addEventListener("change", (e) => {
    if (e.target.value == ("todos")) {
        contenedorExpes.innerHTML = "";
        mostrarExpes();
    } else {
        contenedorExpes.innerHTML = "";
        let arrayExpePorUsuario = arrayExperimentos.filter(exp => exp.usuario == e.target.value);
        arrayExpePorUsuario.forEach(element => {
            let divCadaExp = document.createElement("div");
            divCadaExp.innerHTML += `
                    <h3 class="tituloFicha">${element.nombreExp}</h3> 
                    <p>${element.usuario}</p>           
                    <p>${element.equipo}</p>
                    <p>Inicio : ${element.fechaInicio}</p>
                    <p>Fin: ${element.fechaFin}</p>      
                 `;
            contenedorExpes.appendChild(divCadaExp);
            divCadaExp.style.borderColor = element.color;
            divCadaExp.classList.add("divExp");
        })
    }
});

let fechaSeleccionada= seleccionMesInicio.value

