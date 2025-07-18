document.addEventListener("DOMContentLoaded", function () {
  const malla = {
    1: [
      "Historia del Derecho",
      "Historia y Evolución de las Instituciones Civiles",
      "Derecho Político",
      "Introducción a la Economía",
      "Introducción al Derecho",
      "Electivo de Comunicación"
    ],
    2: [
      "Historia Institucional de Chile",
      "Fundamentos Filosóficos del Derecho",
      { nombre: "Teoría de la Ley y las Personas" },
      { nombre: "Teoría Constitucional", prerequisitos: ["Derecho Político"] },
      "Argumentación Jurídica y Debate",
      "Electivo de Comunicación"
    ],
    3: [
      { nombre: "Acto Jurídico", prerequisitos: ["Historia y Evolución de las Instituciones Civiles"] },
      { nombre: "Organización y Atribuciones de los Tribunales", prerequisitos: ["Introducción al Derecho"] },
      { nombre: "Derecho Constitucional Orgánico", prerequisitos: ["Derecho Político"] },
      { nombre: "Teoría del Delito", prerequisitos: ["Introducción al Derecho"] },
      "Negociación y Ética Profesional",
      "Electivo Desarrollo del Pensamiento"
    ],
    4: [
      { nombre: "Bienes", prerequisitos: ["Historia y Evolución de las Instituciones Civiles", "Teoría de la Ley y las Personas"] },
      "Teoría del Proceso",
      { nombre: "Derechos y Garantías Constitucionales", prerequisitos: ["Derecho Político", "Derecho Constitucional Orgánico"] },
      { nombre: "Derecho Internacional Público", prerequisitos: ["Historia y Evolución de las Instituciones Civiles"] },
      "Teoría de la Reacción Penal",
      { nombre: "Taller de Interrogación I", prerequisitos: ["Acto Jurídico", "Organización y Atribuciones de los Tribunales"] }
    ],
    5: [
      { nombre: "Teoría de las Obligaciones", prerequisitos: ["Acto Jurídico"] },
      { nombre: "Procedimientos Civiles de Cognición", prerequisitos: ["Teoría del Proceso"] },
      { nombre: "Derecho Individual del Trabajo", prerequisitos: ["Derechos y Garantías Constitucionales"] },
      { nombre: "Delitos en Particular I", prerequisitos: ["Teoría de la Reacción Penal"] },
      "Electivo de Desarrollo Personal"
    ],
    6: [
      { nombre: "Fuentes de las Obligaciones", prerequisitos: ["Acto Jurídico"] },
      { nombre: "Procedimientos de Ejecución y Cautela", prerequisitos: ["Teoría del Proceso"] },
      { nombre: "Derecho Mercantil", prerequisitos: ["Acto Jurídico", "Bienes"] },
      "Derecho Colectivo del Trabajo y Seguridad Social",
      "Delitos en Particular II",
      "Electivo de Responsabilidad Social"
    ],
    7: [
      { nombre: "Derecho de Familia", prerequisitos: ["Teoría de la Ley y las Personas"] },
      { nombre: "Responsabilidad Civil", prerequisitos: ["Teoría de las Obligaciones"] },
      { nombre: "Derecho Societario", prerequisitos: ["Teoría de las Obligaciones"] },
      { nombre: "Derecho Administrativo I", prerequisitos: ["Derechos y Garantías Constitucionales"] },
      { nombre: "Derecho Procesal Penal", prerequisitos: ["Procedimientos Civiles de Cognición"] },
      { nombre: "Taller de Litigación", prerequisitos: ["Procedimientos Civiles de Cognición"] }
    ],
    8: [
      { nombre: "Derecho Sucesorio", prerequisitos: ["Teoría de la Ley y las Personas", "Electivo de Comunicación", "Acto Jurídico"] },
      { nombre: "Procedimientos Especiales Orales", prerequisitos: ["Teoría del Proceso", "Procedimientos Civiles de Cognición"] },
      { nombre: "Contratación Mercantil", prerequisitos: ["Fuentes de las Obligaciones"] },
      { nombre: "Derecho Administrativo II", prerequisitos: ["Derechos y Garantías Constitucionales"] },
      "Derecho Tributario I",
      "Optativo de Especialidad I",
      { nombre: "Taller de Interrogación II", prerequisitos: ["Taller de Interrogación I", "Responsabilidad Civil", "Taller de Litigación"] }
    ],
    9: [
      { nombre: "Recursos", prerequisitos: ["Teoría del Proceso", "Procedimientos Civiles de Cognición"] },
      { nombre: "Seminario de Investigación", prerequisitos: ["Historia del Derecho", "Electivo de Responsabilidad Social"] },
      { nombre: "Reorganización y Liquidación Patrimonial", prerequisitos: ["Fuentes de las Obligaciones", "Derecho Societario"] },
      "Derecho Tributario II",
      "Optativo de Especialidad II",
      { nombre: "Clínica Jurídica", prerequisitos: "ALL_BEFORE_SEMESTER_7" }
    ],
    10: [
      { nombre: "Taller de Interrogación III", prerequisitos: "ALL" }
    ]
  };

  const container = document.querySelector(".container-semestres");
  const completados = new Set();

  function crearRamo(ramo, semestreNum) {
    const btn = document.createElement("button");
    btn.classList.add("ramo");

    let nombre, prereqs = [];
    if (typeof ramo === "string") {
      nombre = ramo;
    } else {
      nombre = ramo.nombre;
      if (ramo.prerequisitos) prereqs = ramo.prerequisitos;
    }

    btn.textContent = nombre;
    btn.dataset.nombre = nombre;
    btn.dataset.semestre = semestreNum;

    if (
      prereqs === "ALL" ||
      prereqs === "ALL_BEFORE_SEMESTER_7" ||
      (Array.isArray(prereqs) && prereqs.length > 0)
    ) {
      btn.classList.add("locked");
      btn.disabled = true;
      btn.dataset.prerequisitos = JSON.stringify(prereqs);
    }

    btn.addEventListener("click", () => {
      if (btn.classList.contains("locked")) return;

      btn.classList.toggle("completed");

      const nombreRamo = btn.dataset.nombre;
      if (btn.classList.contains("completed")) {
        completados.add(nombreRamo);
      } else {
        completados.delete(nombreRamo);
      }

      verificarDesbloqueos();
    });

    return btn;
  }

  function verificarDesbloqueos() {
    document.querySelectorAll(".ramo.locked").forEach(btn => {
      const reqs = JSON.parse(btn.dataset.prerequisitos || "[]");

      let desbloquear = false;
      if (reqs === "ALL") {
        desbloquear = Object.values(malla).flat().every(r => {
          const n = typeof r === "string" ? r : r.nombre;
          return completados.has(n);
        });
      } else if (reqs === "ALL_BEFORE_SEMESTER_7") {
        let ramosPrevios = [];
        for (let i = 1; i <= 6; i++) {
          ramosPrevios.push(...malla[i]);
        }
        desbloquear = ramosPrevios.every(r => {
          const n = typeof r === "string" ? r : r.nombre;
          return completados.has(n);
        });
      } else {
        desbloquear = reqs.every(r => completados.has(r));
      }

      btn.disabled = !desbloquear;
      btn.classList.toggle("locked", !desbloquear);
    });
  }

  for (let semestre in malla) {
    const div = document.createElement("div");
    div.classList.add("semestre");
    div.innerHTML = `<h2>${semestre}° Semestre</h2>`;
    malla[semestre].forEach(ramo => {
      const btn = crearRamo(ramo, semestre);
      div.appendChild(btn);
    });
    container.appendChild(div);
  }
});
