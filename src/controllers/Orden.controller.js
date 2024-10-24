import { getConnection, sql } from "../database/connection.js";

export const getOrdenes = async (req, res) => {
  try {

    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Orden");
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewOrden = async (req, res) => {
  const { Cantidad, Precio, IdProducto, IdGuia} = req.body;
  

  if (Cantidad == null || Precio == null || IdProducto == null || IdGuia == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("Cantidad", sql.Int, Cantidad)
      .input("Precio", sql.Decimal, Precio)
      .input("IdProducto", sql.Int, IdProducto)
      .input("IdGuia", sql.Int, IdGuia)
      .query(
        "INSERT INTO Orden (Cantidad, Precio, IdProducto, IdGuia) VALUES (@Cantidad, @Precio, @IdProducto, @IdGuia); SELECT SCOPE_IDENTITY() as IdOrden"
      );

    res.json({
        IdOrden,
        Cantidad,
        IdProducto,
        IdGuia
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getOrdenById = async (req, res) => {
  try {
    const pool = await getConnection();
    //DENTRO DEL pool HACEMOS EL request CON EL query PARA BUSCAR 
    const result = await pool
      .request()
      .input("id", req.params.IdOrden)
      .query("SELECT * FROM Orden WHERE IdOrden = @id");

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteOrdenById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.IdOrden)
      .query("DELETE FROM Orden WHERE IdOrden = @id");

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getTotalOrden = async (req, res) => {
  
  const pool = await getConnection();
  const result = await pool.request().query("SELECT COUNT(*) FROM Orden");
  res.json(result.recordset[0][""]);
};

export const updateOrdenById = async (req, res) => {
  const {IdOrden , Cantidad, Precio, IdProducto, IdGuia} = req.body;

  if (
    IdOrden == null ||
    Cantidad == null||
    Precio == null||
    IdProducto == null||
    IdGuia == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, IdOrden)
      .input("Cantidad", sql.Int, Cantidad)
      .input("Precio", sql.Decimal, Precio)
      .input("IdProducto", sql.Int, IdProducto)
      .input("IdGuia", sql.Int, IdGuia)
      .query(
        "UPDATE Orden SET Cantidad = @Cantidad, Precio = @Precio, IdProducto = @IdProducto, IdGuia = @IdGuia WHERE IdOrden = @id"
      );

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    res.json({ IdGuia, Destinatario, Fecha});
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
