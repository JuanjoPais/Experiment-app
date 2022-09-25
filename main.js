let nombre = prompt("Ingresa tu nombre");

let apellido = prompt("Ingresa tu apellido");

alert(`Bienvenid@ ${nombre} ${apellido}.`);

//Hago un algoritmo condicional, y dentro de una de las condiciones incluyo un ciclo.

let accion = prompt(`${nombre}, tenés un nuevo experimento para cargar (tipeá ´exp´)?. Querés sumar datos a un experimento actual (tipeá ´datos´)?. Si querés navegar el sitio, elegí cancelar.`)

if (accion == "exp") {
    let nombreExpe = prompt("Cómo se llama el experimento?");
    let equipo = prompt("A qué equipo pertenece?");
    let tiempoExpe = parseInt(prompt("Cuántos días estimás que dure?"))

    alert(`Se sumó el experimento ${nombreExpe} al equipo ${equipo}. Podrás modificar sus condiciones desde "Ver tareas"`)

} else if (accion == "datos") {
    let dia = 1
    let conteo = parseInt(prompt(`Ingresá el conteo de células del día ${dia}. Tipeá ´000´ para salir.`));

    while (conteo != 000) {
        dia++;
        conteo = parseInt(prompt(`Ingresá el conteo de células del día ${dia}. Tipeá ´000´ para salir.`));

    };

} else {
    alert("Si buscás otra acción, navegá el sitio")
};