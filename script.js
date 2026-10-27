const preguntas = [
    {
        pregunta: "¿Qué debes hacer ante una señal de ALTO?",
        opciones: [
            "Acelerar para pasar rápidamente",
            "Detenerte por completo y continuar cuando sea seguro",
            "Tocar el claxon y seguir",
            "Ignorarla si no hay vehículos"
        ],
        correcta: 1,
        explicacion: "La señal de alto indica que debes detenerte por completo y continuar solo cuando sea seguro."
    },

    {
        pregunta: "¿Para qué sirve el cinturón de seguridad?",
        opciones: [
            "Para conducir más rápido",
            "Para evitar usar el asiento",
            "Para ayudar a reducir lesiones en un accidente",
            "Solo para viajes largos"
        ],
        correcta: 2,
        explicacion: "El cinturón ayuda a proteger a los ocupantes del vehículo."
    },

    {
        pregunta: "¿Qué debes hacer si el semáforo está en rojo?",
        opciones: [
            "Detenerte antes de la línea de alto",
            "Acelerar",
            "Pasar si tienes prisa",
            "Cerrar los ojos y continuar"
        ],
        correcta: 0,
        explicacion: "Debes detenerte y respetar las indicaciones del semáforo."
    },

    {
        pregunta: "¿Es recomendable usar el teléfono mientras conduces?",
        opciones: [
            "Sí, para revisar mensajes",
            "Sí, cuando hay poco tráfico",
            "Solo para tomar fotografías",
            "No, debes evitar las distracciones"
        ],
        correcta: 3,
        explicacion: "Usar el teléfono puede desviar tu atención y aumentar el riesgo de un accidente."
    },

    {
        pregunta: "¿Qué debes hacer al acercarte a un cruce peatonal?",
        opciones: [
            "Acelerar siempre",
            "Prestar atención y ceder el paso cuando corresponda",
            "Tocar el claxon para que todos se retiren",
            "No mirar a los lados"
        ],
        correcta: 1,
        explicacion: "Debes prestar atención a los peatones y respetar su prioridad de paso cuando corresponda."
    },

    {
        pregunta: "¿Qué significa una señal de advertencia?",
        opciones: [
            "Que puedes ignorar el camino",
            "Que debes acelerar",
            "Que puede existir un riesgo o condición especial",
            "Que no hay reglas"
        ],
        correcta: 2,
        explicacion: "Las señales de advertencia alertan sobre condiciones que requieren precaución."
    },

    {
        pregunta: "¿Qué debes hacer si estás cansado y necesitas conducir?",
        opciones: [
            "Descansar antes de continuar",
            "Subir el volumen de la música y seguir",
            "Conducir más rápido",
            "Mirar el teléfono para distraerte"
        ],
        correcta: 0,
        explicacion: "El cansancio puede afectar tu atención. Lo más seguro es descansar antes de conducir."
    },

    {
        pregunta: "¿Qué debes hacer si las condiciones del camino son peligrosas?",
        opciones: [
            "Acelerar para salir pronto",
            "Conducir sin prestar atención",
            "Seguir al vehículo de adelante muy de cerca",
            "Reducir la velocidad de manera segura y aumentar la precaución"
        ],
        correcta: 3,
        explicacion: "Debes adaptar tu conducción a las condiciones del camino y mantener una distancia segura."
    }
];

let indice = 0;
let puntuacion = 0;
let respondida = false;

const preguntaElemento = document.getElementById("pregunta");
const opcionesElemento = document.getElementById("opciones");
const retroalimentacion = document.getElementById("retroalimentacion");
const contador = document.getElementById("contador");
const barra = document.getElementById("barra");
const botonSiguiente = document.getElementById("siguiente");
const quiz = document.getElementById("quiz");
const resultado = document.getElementById("resultado");


function iniciarCuestionario() {
    indice = 0;
    puntuacion = 0;
    respondida = false;

    quiz.classList.remove("oculto");
    resultado.classList.add("oculto");

    mostrarPregunta();
}


function mostrarPregunta() {
    respondida = false;

    const actual = preguntas[indice];

    preguntaElemento.textContent = actual.pregunta;
    contador.textContent = `Pregunta ${indice + 1} de ${preguntas.length}`;

    barra.style.width = `${((indice + 1) / preguntas.length) * 100}%`;

    opcionesElemento.innerHTML = "";
    retroalimentacion.textContent = "";

    botonSiguiente.disabled = true;
    botonSiguiente.style.opacity = "0.5";
    botonSiguiente.textContent =
        indice === preguntas.length - 1
            ? "Ver mis resultados →"
            : "Siguiente pregunta →";

    actual.opciones.forEach((opcion, numero) => {
        const boton = document.createElement("button");

        boton.className = "opcion";
        boton.textContent = opcion;

        boton.addEventListener("click", () => {
            seleccionarRespuesta(numero);
        });

        opcionesElemento.appendChild(boton);
    });
}


function seleccionarRespuesta(seleccion) {
    if (respondida) {
        return;
    }

    respondida = true;

    const actual = preguntas[indice];
    const botones = document.querySelectorAll(".opcion");

    botones.forEach((boton, numero) => {
        boton.disabled = true;

        if (numero === actual.correcta) {
            boton.classList.add("correcta");
        }

        if (numero === seleccion && seleccion !== actual.correcta) {
            boton.classList.add("incorrecta");
        }
    });

    if (seleccion === actual.correcta) {
        puntuacion++;

        retroalimentacion.textContent =
            "¡Muy bien! " + actual.explicacion;

        retroalimentacion.style.color = "#23824b";
    } else {
        retroalimentacion.textContent =
            "Puedes aprender de esta respuesta. " + actual.explicacion;

        retroalimentacion.style.color = "#c14b6a";
    }

    botonSiguiente.disabled = false;
    botonSiguiente.style.opacity = "1";
}


function siguientePregunta() {
    if (!respondida) {
        return;
    }

    indice++;

    if (indice < preguntas.length) {
        mostrarPregunta();
    } else {
        mostrarResultados();
    }
}


function mostrarResultados() {
    quiz.classList.add("oculto");
    resultado.classList.remove("oculto");

    const porcentaje = Math.round((puntuacion / preguntas.length) * 100);

    document.getElementById("calificacion").textContent =
        `${puntuacion} de ${preguntas.length}`;

    let mensaje = "";

    if (porcentaje === 100) {
        mensaje = "¡Excelente! Respondiste todas las preguntas correctamente.";
    } else if (porcentaje >= 75) {
        mensaje = "¡Muy bien! Tienes buenos conocimientos de seguridad vial.";
    } else if (porcentaje >= 50) {
        mensaje = "Vas por buen camino. Repasa los temas e inténtalo nuevamente.";
    } else {
        mensaje = "¡Sigue aprendiendo! Revisa el reglamento y vuelve a intentarlo.";
    }

    document.getElementById("mensaje-final").textContent = mensaje;

    guardarResultado(puntuacion);
    actualizarProgreso();
}


function obtenerHistorial() {
    try {
        return JSON.parse(localStorage.getItem("cecytoHistorial")) || [];
    } catch (error) {
        return [];
    }
}


function guardarResultado(nota) {
    const historial = obtenerHistorial();

    historial.push({
        nota: nota,
        total: preguntas.length,
        fecha: new Date().toLocaleString("es-MX")
    });

    localStorage.setItem("cecytoHistorial", JSON.stringify(historial));
}


function actualizarProgreso() {
    const historial = obtenerHistorial();

    document.getElementById("total-quiz").textContent = historial.length;

    if (historial.length === 0) {
        document.getElementById("mejor-nota").textContent = "0/8";
        document.getElementById("ultima-nota").textContent = "Sin resultados";

        document.getElementById("historial").innerHTML =
            '<p class="historial-vacio">Todavía no tienes resultados. ¡Responde el cuestionario!</p>';

        return;
    }

    const mejor = Math.max(...historial.map(item => item.nota));
    const ultima = historial[historial.length - 1];

    document.getElementById("mejor-nota").textContent =
        `${mejor}/${preguntas.length}`;

    document.getElementById("ultima-nota").textContent =
        `${ultima.nota}/${preguntas.length}`;

    const contenedor = document.getElementById("historial");

    contenedor.innerHTML = "";

    historial.slice().reverse().forEach((item, posicion) => {
        const fila = document.createElement("div");
        fila.className = "historial-item";

        const informacion = document.createElement("div");

        const titulo = document.createElement("strong");
        titulo.textContent = `Cuestionario ${historial.length - posicion}`;

        const fecha = document.createElement("br");

        const fechaTexto = document.createElement("span");
        fechaTexto.textContent = item.fecha;

        informacion.appendChild(titulo);
        informacion.appendChild(fecha);
        informacion.appendChild(fechaTexto);

        const nota = document.createElement("strong");
        nota.textContent = `${item.nota}/${item.total}`;

        fila.appendChild(informacion);
        fila.appendChild(nota);

        contenedor.appendChild(fila);
    });
}


botonSiguiente.addEventListener("click", siguientePregunta);

document.getElementById("reintentar").addEventListener(
    "click",
    iniciarCuestionario
);

iniciarCuestionario();
actualizarProgreso();