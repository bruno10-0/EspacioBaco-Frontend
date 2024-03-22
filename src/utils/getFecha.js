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
