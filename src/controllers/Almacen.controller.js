import { getConnection, sql } from "../database/connection.js";

export const getAlmacenes = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Almacen");
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewAlmacen = async (req, res) => {
  const { Direccion, Tipo } = req.body;

  if (Direccion == null || Tipo == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("Direccion", sql.VarChar, Direccion)
      .input("Tipo", sql.VarChar, Tipo)
      .query(
        "INSERT INTO Almacen (Direccion, Tipo) VALUES (@Direccion,@Tipo); SELECT SCOPE_IDENTITY() as IdAlmacen"
      );

    res.json({
      IdAlmacen,
      Direccion,
      Tipo,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getAlmacenById = async (req, res) => {
  try {
    const pool = await getConnection();
    //DENTRO DEL pool HACEMOS EL request CON EL query PARA BUSCAR
    const result = await pool
      .request()
      .input("id", req.params.IdAlmacen)
      .query("SELECT * FROM Almacen WHERE IdAlmacen = @id");

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteAlmacenById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.IdAlmacen)
      .query("DELETE FROM Almacen WHERE IdAlmacen = @id");

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getTotalAlmacen = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT COUNT(*) FROM Almacen");
  res.json(result.recordset[0][""]);
};

export const updateAlmacenById = async (req, res) => {
  const { IdAlmacen, Direccion, Tipo } = req.body;

  if (IdAlmacen == null || Direccion == null || Tipo == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdAlmacen", sql.VarChar, IdAlmacen)
      .input("Direccion", sql.VarChar, Direccion)
      .input("Tipo", sql.VarChar, Tipo)
      .query(
        "UPDATE Almacen SET Direccion = @Direccion, Tipo = @Tipo WHERE IdAlmacen = @IdAlmacen"
      );

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    res.json({ IdAlmacen, Direccion, Tipo });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
