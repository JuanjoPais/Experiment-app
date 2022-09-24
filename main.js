let nombre = prompt("Ingresa tu nombre");

let apellido = prompt("Ingresa tu apellido");

alert(`Bienvenid@ ${nombre} ${apellido}.`);

let accion = prompt("Tenés un nuevo experimento para cargar (tipeá ´exp´)?. Querés sumar datos a un experimento actual (tipeá ´datos´)?. Si querés navegar el sitio, elegí cancelar.")

if (accion == "exp") {
    let nombreExpe = prompt("Cómo se llama el experimento?");
    let equipo = prompt("A qué equipo pertenece?");
    let tiempoExpe = parseInt(prompt("Cuántos días estimás que dure?"))

    alert(`Se sumó el experimento ${nombreExpe} al equipo ${equipo}. Podrás modificar sus condiciones desde "Ver tareas"`)

} else if (accion == "datos") {
    alert("En la sección ´Mis experimentos´ vas a poder cargar tus datos.");
    
} else {
    alert("Si buscás otra acción, navegá el sitio")
};