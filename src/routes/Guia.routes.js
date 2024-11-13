import { Router } from "express";
import {
    getGuias,
    createNewGuia,
    getGuiaById,
    deleteGuiaById,
    getTotalGuia,
    updateGuiaById,
} from "../controllers/Guia.controller.js";

const router = Router();

router.get("/guias", getGuias);

router.post("/guias", createNewGuia);

router.get("/guias/cantidad", getTotalGuia);

router.get("/guias/:IdGuia", getGuiaById);

router.delete("/guias/:IdGuia", deleteGuiaById);

router.put("/guias/:IdGuia", updateGuiaById);

export default router;