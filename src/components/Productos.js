import React, {Component} from 'react';
import Product from './Productos';

class ProductosEnDb extends Component{
    constructor(){
        super()
        this.state ={
            productList : []
        }
    }

    componentDidMount(){
        fetch('localhost:3032/api/products')
        .then(respuesta =>{ return respuesta.json()})
        .then(products =>{ this.setState({productList: products.data})})
        .catch(error => console.log(error))
    }

    render(){
        return (
            <React.Fragment>
                <div className="col-lg-6 mb-4">						
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="h1 m-0 font-weight-bold text-gray-800">Productos</h6>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {
                                    this.state.productList.map((product,index)=>{
                                        return <Product {...product} key={index} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }   
}
export default ProductosEnDb;