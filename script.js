// Al cargar la página, intentar cargar progreso guardado
document.addEventListener("DOMContentLoaded", () => {
  const semestres = document.querySelectorAll(".semestre");

  // Cargar progreso desde LocalStorage
  semestres.forEach(semestre => {
    const semestreId = semestre.id;
    const guardado = localStorage.getItem(semestreId);

    if (guardado) {
      const completados = JSON.parse(guardado);
      const botones = semestre.querySelectorAll("button.ramo");
      botones.forEach((btn, i) => {
        if (completados[i]) {
          btn.classList.add("completado");
        }
      });
    }
  });

  // Revisar desbloqueo de semestres según progreso
  desbloquearSemestres();

  // Agregar evento click a cada ramo
  const ramos = document.querySelectorAll("button.ramo");
  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("completado")) {
        ramo.classList.remove("completado");
      } else {
        ramo.classList.add("completado");
      }
      guardarProgreso();
      desbloquearSemestres();
    });
  });
});

// Función para guardar el progreso en LocalStorage
function guardarProgreso() {
  const semestres = document.querySelectorAll(".semestre");
  semestres.forEach(semestre => {
    const botones = semestre.querySelectorAll("button.ramo");
    const estado = [];
    botones.forEach(btn => {
      estado.push(btn.classList.contains("completado"));
    });
    localStorage.setItem(semestre.id, JSON.stringify(estado));
  });
}

// Función que desbloquea el siguiente semestre si todos los ramos están completados
function desbloquearSemestres() {
  const semestres = Array.from(document.querySelectorAll(".semestre"));
  for (let i = 0; i < semestres.length - 1; i++) {
    const actual = semestres[i];
    const siguiente = semestres[i + 1];

    const botones = actual.querySelectorAll("button.ramo");
    const todosCompletos = Array.from(botones).every(btn => btn.classList.contains("completado"));

    if (todosCompletos) {
      siguiente.classList.remove("bloqueado");
      siguiente.style.pointerEvents = "auto";
      siguiente.style.opacity = "1";
    } else {
      siguiente.classList.add("bloqueado");
      siguiente.style.pointerEvents = "none";
      siguiente.style.opacity = "0.5";
    }
  }
}
