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

router.get("/ordenes/:IdOrden", getOrdenById);

router.delete("/ordenes/:IdOrden", deleteOrdenById);

router.put("/ordenes/:IdOrden", updateOrdenById);

export default router;