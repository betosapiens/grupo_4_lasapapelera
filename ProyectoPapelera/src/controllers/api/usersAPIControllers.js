const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const User = db.User;

const usersAPIControllers = {
    'list': (req, res) => {
        User.findAll()
        .then(users => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: users.length,
                    url: 'api/users'
                },
                data: users
            }
                res.json(respuesta);
            })
    },
    'show': (req, res) => {
        User.findByPk(req.params.id)
        .then(user => {
            if (!user) {
                let respuesta = {
                    meta: {
                        status: 404,
                        message: 'Usuario no encontrado'
                    }
                }
                res.json(respuesta);
            } else {
                let respuesta = {
                    meta: {
                        status: 200,
                        message: 'Usuario encontrado'
                    },
                    data: user
                }
                res.json(respuesta);
            }
        })
        .catch(error => {
            let respuesta = {
                meta: {
                    status: 500,
                    message: 'Error al buscar usuario'
                },
                data: error
            }
            res.json(respuesta);
        });
},
    
    'search': (req, res) => {
        User.findAll({
            where: {
                name: {
                    [Op.like]: '%' + req.params.name + '%'
                }
            }
        })
        .then(users => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: users.length,
                    url: 'api/users/search/' + req.params.name
                },
                data: users
            }
            res.json(respuesta);
        })
        .catch(error => {
            let respuesta = {
                meta: {
                    status: 500,
                    message: 'Error al buscar usuarios'
                },
                data: error
            }
            res.json(respuesta);
        });
    },

    'create': (req, res) => {
        User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            image: req.body.image
        })
        .then(user => {
            let respuesta = {
                meta: {
                    status: 201,
                    message: 'Usuario creado con éxito'
                },
                data: user
            }
            res.json(respuesta);
        })
        .catch(error => {
            let respuesta = {
                meta: {
                    status: 500,
                    message: 'Error al crear usuario'
                },
                data: error
            }
            res.json(respuesta);
        });
    },

    'update': (req, res) => {
        User.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            image: req.body.image
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            if (result[0]) {
                let respuesta = {
                    meta: {
                        status: 200,
                        message: 'Usuario actualizado con éxito'
                    }
                }
                res.json(respuesta);
            } else {
                let respuesta = {
                    meta: {
                        status: 404,
                        message: 'Usuario no encontrado'
                    }
                }
                res.status(404).json(respuesta);
            }
        })
        .catch(error => {
            let respuesta = {
                meta: {
                    status: 500,
                    message: 'Error al actualizar usuario'
                },
                data: error
            }
            res.json(respuesta);
        });
    },
   
    
    
    

    'destroy': (req, res) => {
        User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(user => {
            let respuesta = {
                meta: {
                    status: 200,
                    message: 'Usuario eliminado con éxito'
                }
            }
            res.json(respuesta);
        })
        .catch(error => {
            let respuesta = {
                meta: {
                    status: 500,
                    message: 'Error al eliminar usuario'
                },
                data: error
            }
            res.json(respuesta);
        });
   
    }
}
    

module.exports = usersAPIControllers;


/*const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const User = db.User;



const usersAPIControllers = {
    'list': (req, res) => {
        db.User.findAll
        .then(users => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: users,
                    url: 'api/users'
                },
                data: users
            }
                res.json(respuesta);
            })
    },
'show': (req, res) => {
  db.User.findByPk(req.params.id)
            
       .then(user => {
            let respuesta = {
                meta: {
                   status: 200,
                   total: user,
                    url: '/api/user/:id'
             },
                  data: user
               }
               res.json(respuesta);
            });
    },

    
    'search': (req, res) => {
        db.User.findAll({
            where:{
                title: { [Op.like]: "%" + req.query.keyword + "%"}
            }
        })
            
            .then(users => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: users,
                        url: '/api/users/:id'
                    },
                    data: users
                }
                if(users.lenght>0){
                res.json(respuesta);
                }
                else{
                    return res.status(200).json("No se encontraron usuarios")
                }

            });
    },
        
    
    create: (req,res) => {
        User
        .create(
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
                
            }
        )
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/users/create'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/users/create'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
    update: (req,res) => {
        let userId = req.params.id;
        User.update(
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password:req.body.password,
                avatar: req.body.avatar
            },
            {
                where: {id: userId}
        })
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/users/update/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/users/update/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
    destroy: (req,res) => {
        let userId = req.params.id;
        User
        .destroy({where: {id: userId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/users/destroy/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/users/destroy/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    }
    
}

module.exports = usersAPIControllers;

const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const User = db.User;

const usersAPIController = {
    'list': (req, res) => {
        User.findAll()
        .then(users => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: users.length,
                    url: 'api/users'
                },
                data: users
            }
                res.json(respuesta);
            })
    },

    'create': (req, res) => {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        .then(user => {
            let respuesta = {
                meta: {
                    status: 201,
                    message: 'Usuario creado con éxito'
                },
                data: user
            }
            res.json(respuesta);
        })
        .catch(error => {
            let respuesta = {
                meta: {
                    status: 500,
                    message: 'Error al crear usuario'
                },
                data: error
            }
            res.json(respuesta);
        });
    },

    'update': (req, res) => {
        User.update({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(user => {
            let respuesta = {
                meta: {
                    status: 200,
                    message: 'Usuario actualizado con éxito'
                },
                data: user
            }
            res.json(respuesta);
        })
        .catch(error => {
            let respuesta = {
                meta: {
                    status: 500,
                    message: 'Error al actualizar usuario'
                },
                data: error
            }
            res.json(respuesta);
        });
    },

    'destroy': (req, res) => {
        User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(user => {
            let respuesta = {
                meta: {
                    status: 200,
                    message: 'Usuario eliminado con éxito'
                }
            }
            res.json(respuesta);
        })
        .catch(error => {
            let respuesta = {
                meta: {
                    status: 500,
                    message: 'Error al eliminar usuario'
                },
                data: error
            }
            res.json(respuesta);
        });
   */
