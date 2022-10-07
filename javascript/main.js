

function nombre (){
    let nombre = prompt("Ingresa tu nombre");

    let apellido = prompt("Ingresa tu apellido");

    let nombreCompleto = `${nombre} ${apellido}`;

    return nombreCompleto;
}

//nombre();

//Hago un algoritmo condicional, y dentro de una de las condiciones incluyo un ciclo.

//let accion = prompt(`Tenés un nuevo experimento para cargar (tipeá ´exp´)?. Querés sumar datos a un experimento actual (tipeá ´datos´)?. Si querés navegar el sitio, elegí cancelar.`)

if (accion == "exp") {   
        
        let nombreExpe = prompt("Cómo se llama el experimento?")     
        let equipo = prompt("A qué equipo pertenece?");

    alert(`Se sumó el experimento ${nombreExpe} al equipo ${equipo}. Podrás modificar sus condiciones desde "Mis experimentos"`)

} else if (accion == "datos") {
    let dia = 1
    let conteo = parseInt(prompt(`Ingresá el conteo de células del día ${dia}. Tipeá ´000´ para salir.`));    

    while (conteo != 000) {
        dia++;
        conteo = parseInt(prompt(`Ingresá el conteo de células del día ${dia}. Tipeá ´000´ para salir.`));

    };   

    alert("Los datos se sumaron a tu experimento en curso" )

} else {
    alert("Si buscás otra acción, navegá el sitio")
};

// defino arrays

const equipos = [tissue, stem, eco];

const expesCreados = [];



// defino la cantidad inicial de medio de cultivo

let cantidadMedioCultivoMl= 100;

// armo el constructor de objetos


class Experimento {
    constructor (nombre, equipo, duracion, consumoMedioCultivo){
        this.nombre = nombre;
        this.equipo= equipo;
        this.duracion= duracion;
        this.consumoMedioCultivo= consumoMedioCultivo;
    }
        
}

const crearExperimento = () =>{
    let nombreExp 
    let seleccionEquipo 
    let seleccionDuracion
    let seleccionConsumoMedioCultivo 

    const experimento = new Experimento(nombreExp, seleccionEquipo, seleccionDuracion, seleccionConsumoMedioCultivo);

    expesCreados.push(experimento);
    return experimento;
}

