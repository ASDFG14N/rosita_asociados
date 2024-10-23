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

router.get("/guias/:id", getGuiaById);

router.delete("/guias/:id", deleteGuiaById);

router.put("/guias/:id", updateGuiaById);

export default router;