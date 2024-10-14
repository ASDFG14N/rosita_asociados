import express from "express";
import path from "path";

const app = express();
const port = 3000;
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});