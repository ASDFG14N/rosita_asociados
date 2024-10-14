import axios from "./api.js";

export const getCamiones = () => axios.get("/camiones");
export const getCantCamiones = () => axios.get("/camiones/cantidad");
export const getPlacaCamiones = (placa) => axios.get(`/camiones/${placa}`);
export const createCamion = (camion) => axios.get(`/camiones`, camion);
export const updateCamion = (placa) => axios.put(`/camiones/${placa}`);
export const deleteCamion = (placa) => axios.delete(`/camiones/${placa}`);
