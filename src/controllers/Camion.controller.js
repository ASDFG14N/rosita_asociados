import { getConnection, sql } from "../database/connection.js";

export const getCamiones = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Camion");
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

//CREACION DE UN NUEVO REGISTRO
export const createNewCamion = async (req, res) => {
  //DENTRO DEL reqUEST SACAMOS LOS VALORES A USAR DENTRO DEL BODY
  const { placa, modelo} = req.body;
//VERIFICAMOS QUE NO SEA NULO LOS INPUTS
  if (placa == null || modelo == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }
  //INICIAMOS EL TRY CATCH
  try {
    //INCIAMOS LA CONEXION
    const pool = await getConnection();

    /*COMENZAMOS A TRANSFERIR AL pool LOS DATOS QUE SACAMOS DEL BODY Y VERIFICAMOS QUE SEAN
    DEL TIPO QUE NECESITAMOS CON EL sql */
    const result = await pool
      .request()
      .input("placa", sql.VarChar, placa)
      .input("modelo ", sql.VarChar, modelo)
      .query(
        "INSERT INTO Camion (placa, modelo) VALUES (@name,@description); SELECT SCOPE_IDENTITY() as id"
      );

    //AL FINALIZAR EL pool CON EL query ENVIAMOS COMO RESPUESTA ESTE JSON
    res.json({
      placa,
      modelo
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getCamionByPlaca = async (req, res) => {
  try {
    const pool = await getConnection();
    //DENTRO DEL pool HACEMOS EL request CON EL query PARA BUSCAR 
    const result = await pool
      .request()
      .input("placa", req.params.placa)
      .query("SELECT * FROM Camion WHERE Placa = @placa");

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteCamionByPlaca = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("placa", req.params.placa)
      .query("DELETE FROM Camion WHERE Placa = @placa");

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getTotalCamion = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT COUNT(*) FROM Camion");
  res.json(result.recordset[0][""]);
};

export const updateCamionByPlaca = async (req, res) => {
  const { placa, modelo} = req.body;

  if (
    placa == null ||
    modelo == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("placa", sql.VarChar, placa)
      .input("modelo ", sql.VarChar, modelo)
      .query(
        "UPDATE Camion SET Modelo = @modelo WHERE Placa = @placa"
      );

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    res.json({ placa, modelo});
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
