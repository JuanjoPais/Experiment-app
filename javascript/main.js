//Defino 2 variables generales que voy a usar para traer información del localStorage.
let arrayUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let arrayExperimentos = JSON.parse(localStorage.getItem("experimentos")) || [];

