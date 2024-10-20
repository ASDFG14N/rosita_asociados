import { Router } from "express";
import {
    getAlmacenes,
    createNewAlmacen,
    getAlmacenById,
    deleteAlmacenById,
    getTotalAlmacen,
    updateAlmacenById,
} from "../controllers/Almacen.controller.js";

const router = Router();

router.get("/almacenes", getAlmacenes);

router.post("/almacenes", createNewAlmacen);

router.get("/almacenes/cantidad", getTotalAlmacen);

router.get("/almacenes/:id", getAlmacenById);

router.delete("/almacenes/:id", deleteAlmacenById);

router.put("/almacenes/:id", updateAlmacenById);

export default router;
