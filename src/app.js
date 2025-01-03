import express from "express";
import cors from "cors";
import morgan from "morgan";

import camionRoutes from "./routes/Camion.routes.js";
import almacenRoutes from "./routes/Almacen.routes.js";
import guiaRoutes from "./routes/Guia.routes.js";
import ordenRoutes from "./routes/Orden.routes.js";
import productoRoutes from "./routes/Producto.routes.js";
import trabajadorRoutes from "./routes/Trabajador.routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api", camionRoutes);
app.use("/api", almacenRoutes);
app.use("/api", guiaRoutes);
app.use("/api", ordenRoutes);
app.use("/api", productoRoutes);
app.use("/api", trabajadorRoutes);

export default app;
