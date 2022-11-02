
let arrayUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let arrayExperimentos = JSON.parse(localStorage.getItem("experimentos")) || [];

let cita = document.getElementById("cita");
let autor = document.getElementById("autor");
let btnCita = document.getElementById("btnNuevaCita");




const mostrarCitas = async ()=>{ 
    try{
        let response = await  fetch("https://api.quotable.io/random?maxLength=50&tags=science|technology|biology|motivational");
        let resultado = await response.json();   

        cita.innerHTML= resultado.content;
        autor.innerHTML= resultado.author;
    } catch (error){
        cita.innerHTML= "Al pan, pan. Y al vino, vino."
        autor.innerHTML= "Mendocino anónimo"
    }
}       

window.addEventListener("load", mostrarCitas);
btnCita,addEventListener("click", mostrarCitas);        
       


/* ME FALTA
MOSTRAR MAS INFO DE CADA EXPE
SUMAR GRAFICO DE TORTAS A LOS EXPES FILTRANDO POR EQUIPOS (Y POR USUARIOS SI LLEGO)
MEJORAR FRONT DE LOG IN
ANIMACIONES EN MIS EXPES
FOTO POSTER EL INDEX
APLICAR SASS?
GENERAR SALTOS DE PANTALLA


*/