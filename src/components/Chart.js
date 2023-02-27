import React from 'react';
import ChartRow from './ChartRow';

let tableRowsData = [
    {
        Nombre: 'Bolsa Kp1 ',
        Descripción: 'Bolsa de diferentes colores',
        Precio: '80',
        Categorias: ['Bolsa'],
        
    },
    {
        Nombre: 'Bandeja Fast Food',
        Descripción: 'Bandeja descartable',
        Precio: '50',
        Categorias: ['Bandeja'],
       
    },
    
]


function Chart (){
    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Categorias</th>
                             
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                            <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Categorias</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {
                            tableRowsData.map( ( row , i) => {
                                return <ChartRow { ...row} key={i}/>
                            })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Chart;