import { Router } from "express";
import {
    getOrdenes,
    createNewOrden,
    getOrdenById,
    deleteOrdenById,
    getTotalOrden,
    updateOrdenById,
} from "../controllers/Orden.controller.js";

const router = Router();

router.get("/ordenes", getOrdenes);

router.post("/ordenes", createNewOrden);

router.get("/ordenes/cantidad", getTotalOrden);

router.get("/ordenes/:id", getOrdenById);

router.delete("/ordenes/:id", deleteOrdenById);

router.put("/ordenes/:id", updateOrdenById);

export default router;