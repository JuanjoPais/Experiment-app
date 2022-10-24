let contenedorExpes = document.getElementById("contenedorExpes");
let filtroTissue = document.getElementById("botonTissue");
let filtroStemCells = document.getElementById("botonStemCells");
let filtroEcologia = document.getElementById("botonEcologia");
let filtroTodos = document.getElementById("botonTodos");



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

filtroTodos.addEventListener("click", ()=>{
    contenedorExpes.innerHTML="";
    mostrarExpes();
})

filtroTissue.addEventListener("click", (e) => {
    contenedorExpes.innerHTML="";
    let arrayTissue = arrayExperimentos.filter(exp => exp.equipo == "Tissue");

    arrayTissue.forEach(element => {   
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
        divCadaExp.classList.add("divExp"); });  
    }
);

filtroStemCells.addEventListener("click", (e) => {
    contenedorExpes.innerHTML="";
    let arrayTissue = arrayExperimentos.filter(exp => exp.equipo == "Stem cells");

    arrayTissue.forEach(element => {   
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
        divCadaExp.classList.add("divExp"); });  
    }
);

filtroEcologia.addEventListener("click", (e) => {
    contenedorExpes.innerHTML="";
    let arrayTissue = arrayExperimentos.filter(exp => exp.equipo == "Ecología");

    arrayTissue.forEach(element => {   
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
        divCadaExp.classList.add("divExp"); });  
    }
);


