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
    { nombre: "Delitos en Particular I",
