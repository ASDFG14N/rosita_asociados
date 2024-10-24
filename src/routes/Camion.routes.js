import { Router } from "express";
import {
    getCamiones,
    createNewCamion,
    getCamionByPlaca,
    deleteCamionByPlaca,
    getTotalCamion,
    updateCamionByPlaca,
} from "../controllers/Camion.controller.js";

const router = Router();

router.get("/camiones", getCamiones);

router.post("/camiones", createNewCamion);

router.get("/camiones/cantidad", getTotalCamion);

router.get("/camiones/:Placa", getCamionByPlaca);

router.delete("/camiones/:Placa", deleteCamionByPlaca);

router.put("/camiones/:Placa", updateCamionByPlaca);

export default router;
