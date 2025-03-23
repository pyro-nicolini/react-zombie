export function controlCambios(e, setAuth) {
  e.preventDefault();
  setAuth((prev) => ({
    ...prev,
    input: {
      ...prev.input,
      [e.target.name]: e.target.value,
      error: "",
      exito: "",
    },
  }));
}

export function cerrarSesion(setAuth) {
  setAuth((prev) => ({
    ...prev,
    autorizado: false,
    autenticado: null,
    input: { email: "", pass: "", error: "", exito: "" },
  }));
}

export function capitalizer(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function pricer(num) {
  return num.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
}