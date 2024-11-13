import { Router } from "express";
import {
    getProductos,
    createNewProducto,
    getProductoById,
    deleteProductoById,
    getTotalProducto,
    updateProductoById,
} from "../controllers/Producto.controller.js";

const router = Router();

router.get("/productos", getProductos);

router.post("/productos", createNewProducto);

router.get("/productos/cantidad", getTotalProducto);

router.get("/productos/:IdProducto", getProductoById);

router.delete("/productos/:IdProducto", deleteProductoById);

router.put("/productos/:IdProducto", updateProductoById);

export default router;