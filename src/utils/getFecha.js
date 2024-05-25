export const getFecha = (fecha) => {
    // Convertir la fecha de PostgreSQL a objeto Date
    const fechaObj = new Date(fecha);

    // Obtener los componentes de la fecha
    const dia = fechaObj.getDate().toString().padStart(2, '0'); // Día con dos dígitos
    const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0'); // Mes con dos dígitos (se suma 1 porque los meses van de 0 a 11)
    const anio = fechaObj.getFullYear().toString().slice(-2); // Año de dos dígitos

    // Formatear la fecha en formato dd/mm/yy
    const fechaFormateada = `${dia}/${mes}/${anio}`;

    return fechaFormateada;
}

export const getFechaDetallada = (fecha) => {
    // Convertir la fecha de PostgreSQL a objeto Date
    const fechaObj = new Date(fecha);

    // Obtener los componentes de la fecha
    const dia = fechaObj.getDate().toString().padStart(2, '0'); // Día con dos dígitos
    const mes = fechaObj.toLocaleString('default', { month: 'long' }); // Nombre del mes
    const anio = fechaObj.getFullYear(); // Año de cuatro dígitos
    let hora = fechaObj.getHours(); // Obtener la hora
    const minutos = fechaObj.getMinutes().toString().padStart(2, '0'); // Minutos con dos dígitos
    const amPM = hora >= 12 ? 'pm' : 'am'; // Determinar si es am o pm
    hora = hora % 12 || 12; // Convertir la hora a formato 12 horas

    // Formatear la fecha en formato "nombre del mes, día, año, hora am/pm"
    const fechaFormateada = `${mes} ${dia}, ${anio} a las ${hora}:${minutos} ${amPM}`;

    return fechaFormateada;
}

export function obtenerFechaHora(isoString) {
    // Crear un objeto Date a partir de la cadena ISO 8601
    const fecha = new Date(isoString);
  
    // Obtener los componentes de la fecha y la hora
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1; // Sumar 1 porque los meses van de 0 a 11
    const dia = fecha.getDate();
    const hora = fecha.getHours();
    const minuto = fecha.getMinutes();
    const segundo = fecha.getSeconds();
  
    // Formatear los componentes en una cadena legible
    const fechaFormateada = `${dia}/${mes}/${año}`;
    const horaFormateada = `${hora}:${minuto}:${segundo}`;
  
    // Devolver la fecha y la hora formateadas
    return { fecha: fechaFormateada, hora: horaFormateada };
  }

  export function calcularTiempoRestante(createdAt) {
    const tiempoLimite = new Date(createdAt); // Convertir la fecha de creación a objeto Date
    tiempoLimite.setHours(tiempoLimite.getHours() + 24); // Establecer el límite de tiempo en 24 horas después de la creación

    const ahora = new Date(); // Obtener la fecha y hora actual
    const diferencia = Math.max(0, tiempoLimite - ahora); // Calcular la diferencia entre la fecha límite y la fecha actual en milisegundos

    const horasRestantes = Math.floor(diferencia / (1000 * 60 * 60)); // Calcular las horas restantes
    const minutosRestantes = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60)); // Calcular los minutos restantes
    const segundosRestantes = Math.floor((diferencia % (1000 * 60)) / 1000); // Calcular los segundos restantes

    return { horas: horasRestantes, minutos: minutosRestantes, segundos: segundosRestantes };
}
