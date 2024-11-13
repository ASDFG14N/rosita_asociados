import { getConnection, sql } from "../database/connection.js";

export const getTrabajadores = async (req, res) => {
  try {

    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Trabajador");
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewTrabajador = async (req, res) => {
  const {DNI, Nombre, Direccion} = req.body;
  

  if (
    DNI == null || 
    Nombre == null || 
    Direccion == null
) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("DNI", sql.VarChar, DNI)
      .input("Nombre", sql.VarChar, Nombre)
      .input("Direccion", sql.VarChar, Direccion)
      .query(
        "INSERT INTO Producto (DNI, Nombre, Direccion) VALUES (@DNI, @Nombre, @Direccion); SELECT SCOPE_IDENTITY() as IdProducto"
      );

    res.json({
        DNI,
        Nombre,
        Direccion
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getTrabajadorByDNI = async (req, res) => {
  try {
    const pool = await getConnection();
    //DENTRO DEL pool HACEMOS EL request CON EL query PARA BUSCAR 
    const result = await pool
      .request()
      .input("id", req.params.DNI)
      .query("SELECT * FROM Trabajador WHERE DNI = @id");

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteTrabajadorByDNI = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.DNI)
      .query("DELETE FROM Trabajador WHERE DNI = @id");

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getTotalTrabajador = async (req, res) => {
  
  const pool = await getConnection();
  const result = await pool.request().query("SELECT COUNT(*) FROM Trabajador");
  res.json(result.recordset[0][""]);
};

export const updateTrabajadorByDNI = async (req, res) => {
  const {DNI, Nombre, Direccion} = req.body;

  if (
    DNI == null || 
    Nombre == null || 
    Direccion == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("DNI", sql.VarChar, DNI)
      .input("Nombre", sql.VarChar, Nombre)
      .input("Direccion", sql.VarChar, Direccion)
      .query(
        "UPDATE Trabajador SET Nombre = @Nombre, Direccion = @Direccion WHERE DNI = @DNI"
      );

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    res.json({ IdGuia, Destinatario, Fecha});
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
