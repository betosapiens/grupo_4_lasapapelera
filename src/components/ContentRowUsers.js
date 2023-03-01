import React from 'react';
import SmallCard from './SmallCard';

/*  Cada set de datos es un objeto literal */

/* <!-- Products in DB --> */

let UsersInDB = {
    title: 'Usuarios en Base de Datos',
    color: 'primary', 
    cuantity: 21,
    icon: 'fa-clipboard-list'
}



/* <!-- Total awards --> */

let totalDeUsuarios = {
    title:' Total de usuarios', 
    color:'success', 
    cuantity: '79',
    icon:'fa-award'
}

/* <!-- Actors quantity --> */


let cartProps = [UsersInDB, totalDeUsuarios];

function ContentRowUsers(){
    return (
    
        <div className="row">
            
            {cartProps.map( (movie, i) => {

                return <SmallCard {...movie} key={i}/>
            
            })}

        </div>
    )
}

export default ContentRowUsers;