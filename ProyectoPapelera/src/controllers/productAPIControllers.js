const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Product = db.Product;



const productsAPIController = {
    'list': (req, res) => {
        db.Product.findAll({
            include: ['categories']
        })
        .then(movies => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: movies.length,
                    url: 'api/products'
                },
                data: products
            }
                res.json(respuesta);
            })
    },
    'show': (req, res) => {
        db.Product.findByPk(req.params.id,
            {
                include : ['categories']
            })
            .then(product => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: product.length,
                        url: '/api/product/:id'
                    },
                    data: product
                }
                res.json(respuesta);
            });
    },

    
    'search': (req, res) => {
        db.Product.findAll({
            where:{
                title: { [Op.like]: "%" + req.query.keyword + "%"}
            }
        })
            
            .then(products => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: products.length,
                        url: '/api/products/:id'
                    },
                    data: products
                }
                if(products.lenght>0){
                res.json(respuesta);
                }
                else{
                    return res.status(200).json("No se encontraron peliculas")
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
    'recomended': (req, res) => {
        db.Product.findAll({
            include: ['categories'],
            where: {
                rating: {[db.Sequelize.Op.gte] : req.params.price}
            },
            order: [
                ['price', 'DESC']
            ]
        })
        .then(products => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: movies.length,
                    url: 'api/products/recomended/:price'
                },
                data: products
            }
                res.json(respuesta);
        })
        .catch(error => console.log(error))
    },
    create: (req,res) => {
        Product
        .create(
            {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image,
                
            }
        )
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/products/create'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/products/create'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
    update: (req,res) => {
        let productId = req.params.id;
        Product.update(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            },
            {
                where: {id: productId}
        })
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/movies/update/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/movies/update/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
    destroy: (req,res) => {
        let productId = req.params.id;
        Product
        .destroy({where: {id: productId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/products/destroy/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/products/destroy/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    }
    
}

module.exports = productsAPIController;