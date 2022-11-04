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
let hoy= new Date();
let btnBorrarExpes = document.querySelectorAll(".btnBorrarExpe");
let botonTorta = document.getElementById("botonTorta");


function mostrarExpes() {

    for (let i = 0; i < arrayExperimentos.length; i++) {

        let divCadaExp = document.createElement("div");

        divCadaExp.innerHTML += `
            <h3 class="tituloFicha">${arrayExperimentos[i].nombreExp}</h3> 
            <p>Responsable: ${arrayExperimentos[i].usuario}</p>
            <p>${arrayExperimentos[i].equipo}</p>
            <p>Inicio : ${arrayExperimentos[i].fechaInicio}</p>
            <p>Fin: ${arrayExperimentos[i].fechaFin}</p>  
            <p class="mt-2 ">${arrayExperimentos[i].descripcion}</p>`;

            if((arrayExperimentos[i].reactivosExtra).length !=0){
                let divExtras = document.createElement("div");
                divExtras.innerHTML=`
                    <div class="titulosExtras mt-2">
                    <p>Reactivo</p>
                    <p>Marca y Lote</p>
                    <p>Cantidad</p> 
                    </div>                
                `;
                arrayExperimentos[i].reactivosExtra.forEach(dato =>{
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
    }    
}

mostrarExpes();

    
    
//FILTROS POR EQUIPO

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
        <p>Responsable: ${element.usuario}</p>            
        <p>${element.equipo}</p>
        <p>Inicio : ${element.fechaInicio}</p>
        <p>Fin: ${element.fechaFin}</p>      
    `;
    if((element.reactivosExtra).length !=0){
        let divExtras = document.createElement("div");
        divExtras.innerHTML=`
            <div class="titulosExtras mt-2">
            <p>Reactivo</p>
            <p>Marca y Lote</p>
            <p>Cantidad</p> 
            </div>                
        `;
       element.reactivosExtra.forEach(dato =>{
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

//FILTROS POR FECHA

btnConcluidos.addEventListener("click", ()=>{
    let arrayConcluidos = arrayExperimentos.filter(exp => (new Date (exp.fechaFin).getTime() < hoy.getTime()));
    contenedorExpes.innerHTML = "";    
    agregarExpeFiltrado(arrayConcluidos);
});

btnProgramados.addEventListener("click", ()=>{
    let arrayProgramados = arrayExperimentos.filter(exp => (new Date (exp.fechaInicio).getTime() > hoy.getTime()));
    contenedorExpes.innerHTML = "";    
    agregarExpeFiltrado(arrayProgramados);
})

btnEnCurso.addEventListener("click", ()=>{
    let arrayEnCurso1 = arrayExperimentos.filter(exp => hoy.getTime() < new Date (exp.fechaFin).getTime());
    let arrayEnCurso2 = arrayEnCurso1.filter(exp => (new Date (exp.fechaInicio).getTime()< hoy.getTime()));
    contenedorExpes.innerHTML = "";    
    agregarExpeFiltrado(arrayEnCurso2);
})

btnTodosFechas.addEventListener("click", () => {
    contenedorExpes.innerHTML = "";
    mostrarExpes();
})

// Hago funcion para ver gráficos

botonTorta.addEventListener("click", ()=>{
     contenedorExpes.innerHTML="";
     let divCanvas = document.createElement("div");
     divCanvas.innerHTML=`<canvas id="myChart" width="400" height="400"></canvas>`
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
   




