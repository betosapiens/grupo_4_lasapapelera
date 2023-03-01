import React from 'react';
import { useState, useEffect } from "react";

function Total() {
  const [totalProductos, setTotalProductos] = useState([]);
  const [totalUsuarios, setTotalUsuarios] = useState([]);

  useEffect(() => {
    fetch("api/products")
      .then((response) => response.json())
      .then((data) => {
        setTotalProductos(data);
      })
      .catch((error) => console.log("Errores:" + error));
  }, []);
  
  useEffect(() => {
    fetch("api/users")
      .then((response) => response.json())
      .then((data) => {
        setTotalUsuarios(data);
      })
      .catch((error) => console.log("Errores:" + error));
  }, []);


  return (
    <>
    <h1>Total:</h1>
    <div className="content-TotalProducts">
      <h2>TOTAL PRODUCTOS: {totalProductos.total}</h2>
      <h2>TOTAL USUARIOS: {totalUsuarios.total}</h2>
      <h2>TOTAL CATEGORIAS: {totalProductos.totalCategorias}</h2>
    </div>
    </>
  );
  
}

export default Total;
