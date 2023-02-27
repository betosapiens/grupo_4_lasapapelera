import React from 'react';
import SmallCard from './SmallCard';

/*  Cada set de datos es un objeto literal */

/* <!-- Products in DB --> */

let productosInDB = {
    title: 'Productos en Base de Datos',
    color: 'primary', 
    cuantity: 21,
    icon: 'fa-clipboard-list'
}



/* <!-- Total awards --> */

let totalDeProductos = {
    title:' Total de productos', 
    color:'success', 
    cuantity: '79',
    icon:'fa-award'
}

/* <!-- Actors quantity --> */

let CategoriasDeProductos = {
    title:'Categorias de productos' ,
    color:'warning',
    cuantity:'4',
    icon:'fa-user-check'
}
let cartProps = [productosInDB, totalDeProductos, CategoriasDeProductos];

function ContentRowProducts(){
    return (
    
        <div className="row">
            
            {cartProps.map( (movie, i) => {

                return <SmallCard {...movie} key={i}/>
            
            })}

        </div>
    )
}

export default ContentRowProducts;