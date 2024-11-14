import { getConnection, sql } from "../database/connection.js";

export const getProductos = async (req, res) => {
  try {

    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Producto");
    const filteredResult = result.recordset.map(({ IdAlmacen, ...rest }) => rest);

    res.json(filteredResult);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewProducto = async (req, res) => {
  const { Nombre, Cantidad, Precio, Categoria, Fecha_de_vencimiento, IdAlmacen} = req.body;
  

  if (
    Nombre == null || 
    Cantidad == null || 
    Precio == null || 
    Categoria == null|| 
    Fecha_de_vencimiento == null|| 
    IdAlmacen == null
) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("Nombre", sql.VarChar, Nombre)
      .input("Cantidad", sql.Int, Cantidad)
      .input("Precio", sql.Decimal, Precio)
      .input("Categoria", sql.VarChar, Categoria)
      .input("Fecha_de_vencimiento", sql.Date, Fecha_de_vencimiento)
      .input("IdAlmacen", sql.Int, IdAlmacen)
      .query(
        "INSERT INTO Producto (Nombre, Cantidad, Precio, Categoria, Fecha_de_vencimiento, IdAlmacen) VALUES (@Nombre, @Cantidad, @Precio, @Categoria, @Fecha_de_vencimiento, @IdAlmacen); SELECT SCOPE_IDENTITY() as IdProducto"
      );

    res.json({
        IdProducto,
        Nombre,
        Cantidad,
        Precio,
        Categoria,
        Fecha_de_vencimiento,
        IdAlmacen
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getProductoById = async (req, res) => {
  try {
    const pool = await getConnection();
    //DENTRO DEL pool HACEMOS EL request CON EL query PARA BUSCAR 
    const result = await pool
      .request()
      .input("id", req.params.IdProducto)
      .query("SELECT * FROM Producto WHERE IdProducto = @id");

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteProductoById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.IdProducto)
      .query("DELETE FROM Producto WHERE IdProducto = @id");

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getTotalProducto = async (req, res) => {
  
  const pool = await getConnection();
  const result = await pool.request().query("SELECT COUNT(*) FROM Producto");
  res.json(result.recordset[0][""]);
};

export const updateProductoById = async (req, res) => {
  const {IdProducto, Nombre, Cantidad, Precio, Categoria, Fecha_de_vencimiento, IdAlmacen} = req.body;

  if (
    IdProducto==null ||
    Nombre == null || 
    Cantidad == null || 
    Precio == null || 
    Categoria == null|| 
    Fecha_de_vencimiento == null|| 
    IdAlmacen == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, IdProducto)
      .input("Nombre", sql.VarChar, Nombre)
      .input("Cantidad", sql.Int, Cantidad)
      .input("Precio", sql.Decimal, Precio)
      .input("Categoria", sql.VarChar, Categoria)
      .input("Fecha_de_vencimiento", sql.Date, Fecha_de_vencimiento)
      .input("IdAlmacen", sql.Int, IdAlmacen)
      .query(
        "UPDATE Orden SET Nombre = @Nombre, Cantidad = @Cantidad, Precio = @Precio, Categoria = @Categoria, Fecha_de_vencimiento = @Fecha_de_vencimiento, IdAlmacen = @IdAlmacen  WHERE IdProducto = @id"
      );

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    res.json({ IdGuia, Destinatario, Fecha});
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
