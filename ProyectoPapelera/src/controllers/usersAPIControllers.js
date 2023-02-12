const path = require('path');
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
                    total: users.length,
                    url: 'api/users'
                },
                data: users
            }
                res.json(respuesta);
            })
    },
    // 'show': (req, res) => {
    //     db.User.findByPk(req.params.id)
            
    //         .then(user => {
    //             let respuesta = {
    //                 meta: {
    //                     status: 200,
    //                     //total: user.length,
    //                     url: '/api/user/:id'
    //                 },
    //                 data: user
    //             }
    //             res.json(respuesta);
    //         });
    // },

    
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
                        total: users.length,
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
        
    // 'detail': (req, res) => {
    //     db.Movie.findByPk(req.params.id,
    //         {
    //             include : ['genre']
    //         })
    //         .then(movie => {
    //             let respuesta = {
    //                 meta: {
    //                     status: 200,
    //                     total: movie.length,
    //                     url: '/api/movie/:id'
    //                 },
    //                 data: movie
    //             }
    //             res.json(respuesta);
    //         });
    // },

    
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