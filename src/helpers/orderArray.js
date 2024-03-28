export function ordenarPorFechaCreacion(array) {
  // Utilizamos el método sort para ordenar el array en base a la fecha de creación
  return array.sort((a, b) => {
    // Convertimos las fechas de creación a objetos Date para compararlas
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    // Comparamos las fechas de creación y devolvemos el resultado de la comparación
    return dateA - dateB;
  });
}

export function ordenarPorFechaCreacionDesc(array) {
  // Utilizamos el método sort para ordenar el array en base a la fecha de creación
  return array.sort((a, b) => {
    // Convertimos las fechas de creación a objetos Date para compararlas
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    // Comparamos las fechas de creación de manera inversa para obtener el orden descendente
    return dateB - dateA;
  });
}

export const ordenarPorPrecioMenorAMayor = (array) => {
  // Utiliza el método sort para ordenar el array según el precio de menor a mayor
  const arrayOrdenado = array.sort((a, b) => a.precio - b.precio);
  return arrayOrdenado;
};

export const ordenarPorPrecioMayorAMenor = (array) => {
  // Utiliza el método sort para ordenar el array según el precio de mayor a menor
  const arrayOrdenado = array.sort((a, b) => b.precio - a.precio);
  return arrayOrdenado;
};

export function filtrarUsuariosPorTipo(usuarios, tipo) {
  return usuarios.filter((usuario) => usuario.tipo === tipo);
}
