import React from 'react';


function ChartRow(props){
    return (
                <tr>
                    <td>{props.Nombre}</td>
                    <td>{props.Descripción}</td>
                    <td>{props.Precio}</td>
                    <td>
                        <ul>
                            {props.Categorias.map( (category,i) => 
                                <li key={`category ${i}`}>{category}</li>
                            )}
                        </ul>
                    </td>
                  
                </tr>
            )
    }
    
        

export default ChartRow;