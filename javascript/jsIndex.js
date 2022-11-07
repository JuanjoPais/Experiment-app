let cita = document.getElementById("cita");
let autor = document.getElementById("autor");
let btnCita = document.getElementById("btnNuevaCita");


// Funcion que trae citas desde una API,  aleatoriamente sobre ciencia, tech y motivacion 
const mostrarCitas = async () => {
    try {
        let response = await fetch("https://api.quotable.io/random?maxLength=50&tags=science|technology|biology|motivational");
        let resultado = await response.json();
        cita.innerHTML = resultado.content;
        autor.innerHTML = resultado.author;
    } catch (error) {
        cita.innerHTML = "Al pan, pan. Y al vino, vino."
        autor.innerHTML = "Mendocino anónimo"
    }
}

window.addEventListener("load", mostrarCitas);
btnCita.addEventListener("click", mostrarCitas);