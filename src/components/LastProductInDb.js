import React from 'react';
import imagenFondo from '../assets/images/bolsa.jpg';
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";

// function LastProductInDb(){
//     const [lastProduct, setlastProduct] = useState();
      
//     const { id } = useParams();
  
//     useEffect(() => {
//       fetch("http://localhost:3032/api/products/" + id)
//         .then((response) => response.json())
//         .then((productoData) => {
//           console.log(productoData);
//           setlastProduct(productoData);
//         })
//         .catch((error) => console.log("Errores:" + error));
//     }, []);
  
//     console.log(lastProduct);
  
//     useEffect(() => {
//       console.log("Se actualiza componente");
//     }, [lastProduct]);
  
//     useEffect(() => {
//       return console.log("Se desarma componente");
//     }, []);
  
//     return (
//     <>
//       <h1>Ultimo Producto:</h1>
//       <div className="content-UltimoProducto">
//         <img src={lastProduct?.imagen} alt="" width={"200px"} />
//         <h2>{lastProduct?.name}</h2>
//         <div className="content-info">
//           <h4>Categoria: {lastProduct?.categoria} </h4>
//           <h4>Precio: {lastProduct?.price}</h4>
//         </div>
//       </div>
//     </>
//     );
  



    function LastProductInDb(){
    return(
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Último producto en Base de Datos</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={imagenFondo} alt=" Star Wars - Mandalorian "/>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, consequatur explicabo officia inventore libero veritatis iure voluptate reiciendis a magnam, vitae, aperiam voluptatum non corporis quae dolorem culpa citationem ratione aperiam voluptatum non corporis ratione aperiam voluptatum quae dolorem culpa ratione aperiam voluptatum?</p>
                    <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View movie detail</a>
                </div>
            </div>
        </div>
    )
                
    }
export default LastProductInDb;
