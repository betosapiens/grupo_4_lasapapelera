import React, {Component} from 'react';
import User from './Usuarios';

class UsuariosEnDb extends Component{
    constructor(){
        super()
        this.state ={
            userList : []
        }
    }

    componentDidMount(){
        fetch('api/users')
        .then(respuesta =>{ return respuesta.json()})
        .then(users =>{ this.setState({userList: users.data})})
        .catch(error => console.log(error))
    }

    render(){
        return (
            <React.Fragment>
                <div className="col-lg-6 mb-4">						
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="h1 m-0 font-weight-bold text-gray-800">Usuarios</h6>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {
                                    this.state.userList.map((user,index)=>{
                                        return <User {...user} key={index} />
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
export default UsuariosEnDb;