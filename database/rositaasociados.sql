CREATE DATABASE rositaasociados;

USE rositaasociados;

CREATE TABLE Almacen (
    IdAlmacen INT PRIMARY KEY,
    Direccion VARCHAR(255),
    Tipo VARCHAR(50)
);

CREATE TABLE Producto (
    IdProducto INT PRIMARY KEY,
    Nombre VARCHAR(50),
    Cantidad INT,
    Precio DECIMAL(10,2),
    Categoria VARCHAR(50),
    Fecha_de_vencimiento DATE,
    IdAlmacen INT,
    FOREIGN KEY (IdAlmacen) REFERENCES Almacen(IdAlmacen)
);

CREATE TABLE Trabajador (
    DNI VARCHAR(8) PRIMARY KEY,
    Nombre VARCHAR(50),
    Direccion VARCHAR(255)
);

CREATE TABLE Trabajador_Almacen (
    IdAlmacen INT,
    DNI_trabajador VARCHAR(8),
    Rol VARCHAR(50),
    FOREIGN KEY (IdAlmacen) REFERENCES Almacen(IdAlmacen),
    FOREIGN KEY (DNI_trabajador) REFERENCES Trabajador(DNI)
);

CREATE TABLE Guia_de_reemision (
    IdGuia INT PRIMARY KEY,
    Destinatario VARCHAR(255),
    Fecha DATE
);

CREATE TABLE Trabajador_Guia_de_Reemision (
    IdGuia INT,
    DNI_trabajador VARCHAR(8),
    FOREIGN KEY (IdGuia) REFERENCES Guia_de_reemision(IdGuia),
    FOREIGN KEY (DNI_trabajador) REFERENCES Trabajador(DNI)
);

CREATE TABLE Camion (
    Placa VARCHAR(10) PRIMARY KEY,
    Modelo VARCHAR(255)
);

CREATE TABLE Guia_camion (
    IdGuia INT,
    Placa_Camion VARCHAR(10),
    FOREIGN KEY (IdGuia) REFERENCES Guia_de_reemision(IdGuia),
    FOREIGN KEY (Placa_Camion) REFERENCES Camion(Placa)
);

CREATE TABLE Orden (
    IdOrden INT PRIMARY KEY,
    Cantidad INT,
    Precio DECIMAL(10,2),
    IdProducto INT,
    IdGuia INT,
    FOREIGN KEY (IdProducto) REFERENCES Producto(IdProducto),
    FOREIGN KEY (IdGuia) REFERENCES Guia_de_reemision(IdGuia)
);

INSERT INTO Almacen (IdAlmacen, Direccion, Tipo) VALUES
(1, 'Calle Alborada 123', 'Central'),
(2, 'Avenida Siempreviva 742', 'Sucursal'),
(3, 'Boulevard de los Sueños 456', 'Central'),
(4, 'Calle de la Luna 789', 'Sucursal'),
(5, 'Camino del Rey 101', 'Sucursal');

INSERT INTO Producto (IdProducto, Nombre, Cantidad, Precio, Categoria, Fecha_de_vencimiento, IdAlmacen) VALUES
(1, 'Oreo', 100, 9.99, 'Galletas', '2024-12-31', 1),
(2, 'Glacitas', 200, 19.99, 'Galletas', '2025-06-30', 2),
(3, 'Inka Cola', 150, 14.99, 'Bebidas', '2024-11-30', 1),
(4, 'Coca Cola', 120, 24.99, 'Bebidas', '2025-01-31', 3),
(5, 'Soda', 300, 29.99, 'Galletas', '2025-03-31', 4),
(6, 'Chin Chin', 180, 34.99, 'Dulces', '2024-09-30', 5),
(7, 'Ole Ole', 50, 39.99, 'Dulces', '2024-08-31', 3),
(8, 'Cañonaso', 70, 44.99, 'Dulces', '2025-07-31', 2),
(9, 'Rellenitas', 90, 49.99, 'Galletas', '2025-04-30', 1),
(10, 'Trifruna', 60, 54.99, 'Dulces', '2024-10-31', 5);

INSERT INTO Trabajador (DNI, Nombre, Direccion) VALUES
('72717118', 'Juan Pérez', 'Corea del Norte 543'),
('81726354', 'María López', 'Avenida Siempreviva 742'),
('73829164', 'Carlos García', 'Boulevard de los Sueños 456'),
('84736251', 'Ana Martínez', 'Calle de la Luna 789'),
('75938471', 'Lucía Fernández', 'Camino del Rey 101'),
('62917538', 'Pedro Sánchez', 'Calle del Sol 654'),
('83947562', 'Elena Gómez', 'Avenida de las Flores 321'),
('94836271', 'Jorge Díaz', 'Callejón de la Noche 987'),
('71529384', 'Laura Torres', 'Avenida de los Pinos 111'),
('83746291', 'Miguel Ortiz', 'Calle del Mar 222');

INSERT INTO Trabajador_Almacen (IdAlmacen, DNI_trabajador, Rol) VALUES
(1, '72717118', 'Gerente'),
(2, '81726354', 'Encargado'),
(3, '73829164', 'Asistente'),
(4, '84736251', 'Supervisor'),
(5, '75938471', 'Jefe de almacén'),
(1, '62917538', 'Estibador'),
(2, '83947562', 'Estibador'),
(3, '94836271', 'Estibador'),
(4, '71529384', 'Estibador'),
(5, '83746291', 'Estibador');

INSERT INTO Guia_de_reemision (IdGuia, Destinatario, Fecha) VALUES
(1, 'Minoristas&Asociados', '2024-06-01'),
(2, 'Galletas World', '2024-06-02'),
(3, 'Tía Veneno', '2024-06-03'),
(4, 'Tío Uña Sucia', '2024-06-04'),
(5, 'Universidad Sideral Carrion', '2024-06-05');

INSERT INTO Trabajador_Guia_de_Reemision (IdGuia, DNI_trabajador) VALUES
(1, '83746291'),
(2, '71529384'),
(3, '94836271'),
(4, '83947562'),
(5, '62917538');

INSERT INTO Camion (Placa, Modelo) VALUES
('ABC1234', 'Modelo X'),
('DEF5678', 'Modelo Y'),
('GHI9101', 'Modelo Z'),
('JKL1121', 'Modelo A'),
('MNO1314', 'Modelo B');

INSERT INTO Guia_camion (IdGuia, Placa_Camion) VALUES
(1, 'ABC1234'),
(2, 'DEF5678'),
(3, 'GHI9101'),
(4, 'JKL1121'),
(5, 'MNO1314');

INSERT INTO Orden (IdOrden, Cantidad, Precio, IdProducto, IdGuia) VALUES
(1, 50, 9.99, 1, 1),
(2, 100, 19.99, 2, 2),
(3, 75, 14.99, 3, 3),
(4, 60, 24.99, 4, 4),
(5, 90, 29.99, 5, 5),
(6, 30, 34.99, 6, 1),
(7, 20, 39.99, 7, 2),
(8, 40, 44.99, 8, 3),
(9, 55, 49.99, 9, 4),
(10, 65, 54.99, 10, 5);

DESCRIBE almacen;
DESCRIBE camion;
DESCRIBE guia_camion;
DESCRIBE guia_de_reemision;
DESCRIBE orden;
DESCRIBE producto;
DESCRIBE trabajador;
DESCRIBE trabajador_almacen;
DESCRIBE trabajador_guia_de_reemision;

#total de órdenes y la cantidad total de productos vendidos por categoría
SELECT P.Categoria, COUNT(O.IdOrden) AS TotalOrdenes, SUM(O.Cantidad) AS TotalProductosVendidos
FROM Orden O
JOIN Producto P ON O.IdProducto = P.IdProducto
GROUP BY P.Categoria;

#Ingresos Totales de los Últimos 6 Meses
SELECT SUM(Precio * Cantidad) AS TotalIngresos 
FROM Orden 
WHERE IdGuia IN (
    SELECT IdGuia 
    FROM Guia_de_reemision 
    WHERE Fecha BETWEEN DATE_SUB(CURDATE(), INTERVAL 6 MONTH) AND CURDATE()
);

#Promedio de Precios por Categoría
SELECT Categoria, AVG(Precio) AS PrecioPromedio 
FROM Producto 
GROUP BY Categoria;

#Cantidad de Productos por Almacén
SELECT A.Direccion, COUNT(P.IdProducto) AS TotalProductos
FROM Almacen A
JOIN Producto P ON A.IdAlmacen = P.IdAlmacen
GROUP BY A.Direccion;

#Número de Trabajadores por Almacén
SELECT A.IdAlmacen ,A.Direccion, COUNT(TA.DNI_trabajador) AS TotalTrabajadores
FROM Almacen A
JOIN Trabajador_Almacen TA ON A.IdAlmacen = TA.IdAlmacen
GROUP BY A.IdAlmacen;

#subconsultas
#Productos con Precio Mayor al Promedio
SELECT Nombre, Precio 
FROM Producto 
WHERE Precio > (SELECT AVG(Precio) FROM Producto);

#Almacenes con Productos por Debajo del Stock Promedio
SELECT DISTINCT A.Direccion 
FROM Almacen A
JOIN Producto P ON A.IdAlmacen = P.IdAlmacen
WHERE P.Cantidad < (
    SELECT AVG(Cantidad)
    FROM Producto
);

#Promedio de Cantidad de Productos por Guía
SELECT IdGuia, (SELECT AVG(Cantidad) FROM Orden WHERE IdGuia = G.IdGuia) AS PromedioCantidad
FROM Guia_de_reemision G;

#Guías de Remisión con Más de 50 Productos
SELECT IdGuia, Destinatario, Fecha 
FROM Guia_de_reemision G
WHERE (SELECT SUM(Cantidad) FROM Orden WHERE IdGuia = G.IdGuia) > 50;

#Guías de Remisión con Productos de Precio Superior al Promedio
SELECT IdGuia, Destinatario, Fecha 
FROM Guia_de_reemision G
WHERE(
    SELECT 1 
    FROM Orden O
    WHERE O.IdGuia = G.IdGuia AND O.Precio > (SELECT AVG(Precio) FROM Producto)
);

#Inner Join
#Productos junto con la información del almacén donde se almacenan.
SELECT P.Nombre AS Producto, P.Cantidad, P.Precio, A.Direccion AS Almacen, A.Tipo 
FROM Producto P
INNER JOIN Almacen A ON P.IdAlmacen = A.IdAlmacen;

#los trabajadores junto con la información del almacén al que están asignados
SELECT T.DNI, T.Nombre, T.Direccion, A.Direccion AS Almacen, TA.Rol 
FROM Trabajador T
INNER JOIN Trabajador_Almacen TA ON T.DNI = TA.DNI_trabajador
INNER JOIN Almacen A ON TA.IdAlmacen = A.IdAlmacen;

#las guías de remisión junto con la información del camión que las transporta
SELECT G.IdGuia, G.Destinatario, G.Fecha, C.Placa, C.Modelo 
FROM Guia_de_reemision G
INNER JOIN Guia_camion GC ON G.IdGuia = GC.IdGuia
INNER JOIN Camion C ON GC.Placa_Camion = C.Placa;

#Encuentra todos los trabajadores asignados a las guías de remisión
SELECT T.DNI, T.Nombre, G.IdGuia, G.Destinatario, G.Fecha 
FROM Trabajador T
INNER JOIN Trabajador_Guia_de_Reemision TGR ON T.DNI = TGR.DNI_trabajador
INNER JOIN Guia_de_reemision G ON TGR.IdGuia = G.IdGuia;

#productos transportados por una guía de remisión específica
SELECT P.IdProducto, P.Nombre, P.Cantidad, P.Precio, P.Categoria,
 P.Fecha_de_vencimiento, A.Direccion AS Almacen
FROM Orden O
INNER JOIN Producto P ON O.IdProducto = P.IdProducto
INNER JOIN Almacen A ON P.IdAlmacen = A.IdAlmacen
WHERE O.IdGuia = 3;


