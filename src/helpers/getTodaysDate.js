

export const getTodaysDate = () => {
  let fechaHoy = new Date();
  let dia = fechaHoy.getDate();
  let mes = fechaHoy.getMonth() + 1; // Los meses comienzan desde 0, por lo que debes sumar 1
  let anio = fechaHoy.getFullYear();

  // Asegurarse de que el día y el mes tengan dos dígitos
  if (dia < 10) {
    dia = '0' + dia;
  }
  if (mes < 10) {
    mes = '0' + mes;
  }

  let fechaFormateada = anio + '-' + mes + '-' + dia;

  return fechaFormateada
}

// Prueba GitHub