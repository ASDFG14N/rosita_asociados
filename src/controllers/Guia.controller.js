import { getConnection, sql } from "../database/connection.js";

export const getGuias = async (req, res) => {
  try {

    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Guia_de_reemision");
    const guiasConId = result.recordset.map((guias, index) => ({
      id: index + 1,
      ...guias,
    }));
    res.json(guiasConId);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewGuia = async (req, res) => {
  const { Destinatario, Fecha} = req.body;
  

  if (Destinatario == null || Fecha == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("Destinatario", sql.VarChar, Destinatario)
      .input("Fecha", sql.Date, Fecha)
      .query(
        "INSERT INTO Guia_de_reemision (Destinatario, Fecha) VALUES (@Destinatario,@Fecha); SELECT SCOPE_IDENTITY() as IdGuia"
      );

    res.json({
        IdGuia,
        Destinatario,
        Fecha
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getGuiaById = async (req, res) => {
  try {
    const pool = await getConnection();
    //DENTRO DEL pool HACEMOS EL request CON EL query PARA BUSCAR 
    const result = await pool
      .request()
      .input("id", req.params.IdGuia)
      .query("SELECT * FROM Guia_de_reemision WHERE IdGuia = @id");

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteGuiaById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.IdGuia)
      .query("DELETE FROM Guia_de_reemision WHERE IdGuia = @id");

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getTotalGuia = async (req, res) => {
  
  const pool = await getConnection();
  const result = await pool.request().query("SELECT COUNT(*) FROM Guia_de_reemision");
  res.json(result.recordset[0][""]);
};

export const updateGuiaById = async (req, res) => {
  const { IdGuia, Destinatario, Fecha} = req.body;

  if (
    IdGuia == null ||
    Destinatario == null||
    Fecha == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, IdGuia)
      .input("Destinatario", sql.VarChar, Destinatario)
      .input("Fecha", sql.Date, Fecha)
      .query(
        "UPDATE Guia_de_reemision SET Destinatario = @Destinatario, Fecha = @Fecha WHERE IdGuia = @id"
      );

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    res.json({ IdGuia, Destinatario, Fecha});
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
