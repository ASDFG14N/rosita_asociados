import { getConnection, sql } from "../database/connection.js";

export const getCamiones = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Camion");
    const camionesConId = result.recordset.map((camion, index) => ({
      id: index + 1,
      ...camion,
    }));

    res.json(camionesConId);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


export const createNewCamion = async (req, res) => {
  const { Placa, Modelo} = req.body;
  

  if (Placa == null || Modelo == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("Placa", sql.VarChar, Placa)
      .input("Modelo", sql.VarChar, Modelo)
      .query(
        "INSERT INTO Camion (Placa, Modelo) VALUES (@Placa,@Modelo); SELECT SCOPE_IDENTITY() as id"
      );

    res.json({
      Placa,
      Modelo
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
  const { Placa, Modelo} = req.body;

  if (
    Placa == null ||
    Modelo == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Placa", sql.VarChar, Placa)
      .input("Modelo", sql.VarChar, Modelo)
      .query(
        "UPDATE Camion SET Modelo = @Modelo WHERE Placa = @Placa"
      );

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    res.json({ Placa, Modelo});
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
