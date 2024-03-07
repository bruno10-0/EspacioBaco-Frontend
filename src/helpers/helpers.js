export function isNew(fechaCreacion) {
    const SIETE_DIAS_EN_MILISEGUNDOS = 7 * 24 * 60 * 60 * 1000; // 7 días en milisegundos
    const tiempoCreacion = new Date(fechaCreacion).getTime();
    const tiempoActual = new Date().getTime();
    return tiempoActual - tiempoCreacion < SIETE_DIAS_EN_MILISEGUNDOS;
  }

 export const extractIdsFromState = (state) => {
    // Verificar si el estado es un array
    if (!Array.isArray(state)) {
      console.error('El estado no es un array');
      return [];
    }
    // Extraer los IDs de los objetos en el estado
    const ids = state.map(item => item.id);
    return ids;
  };
  
  