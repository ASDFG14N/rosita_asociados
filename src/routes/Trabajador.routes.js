import { Router } from "express";
import {
    getTrabajadores,
    createNewTrabajador,
    getTrabajadorByDNI,
    deleteTrabajadorByDNI,
    getTotalTrabajador,
    updateTrabajadorByDNI,
} from "../controllers/Trabajador.controller.js";

const router = Router();

router.get("/trabajadores", getTrabajadores);

router.post("/trabajadores", createNewTrabajador);

router.get("/trabajadores/cantidad", getTotalTrabajador);

router.get("/trabajadores/:DNI", getTrabajadorByDNI);

router.delete("/trabajadores/:DNI", deleteTrabajadorByDNI);

router.put("/trabajadores/:DNI", updateTrabajadorByDNI);

export default router;