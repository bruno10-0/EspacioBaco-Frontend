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
