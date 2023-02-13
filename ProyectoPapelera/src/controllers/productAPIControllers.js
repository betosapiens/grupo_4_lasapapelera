/*const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const Product = db.Product;

const productsAPIController = {
    'list': (req, res) => {
        db.Product.findAll()
        .then(products => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: products.length,
                    url: 'api/products'
                },
                data: products
            }
                res.json(respuesta);
            })
    },

    'search': (req, res) => {
        let query = {};
        if (req.query.name) {
            query.name = { [Op.like]: `%${req.query.name}%` };
        }
        if (req.query.category) {
            query.category = req.query.category;
        }

        Product.findAll({ where: query })
            .then(products => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: products.length,
                        url: 'api/products'
                    },
                    data: products
                }
                res.json(respuesta);
            })
            .catch(error => {
                let respuesta = {
                    meta: {
                        status: 500,
                        message: 'Error al realizar la búsqueda'
                    },
                    data: error
                }
                res.json(respuesta);
            });
},

    'show': (req, res) => {
        Product.findByPk(req.params.id)
            .then(product => {
                if (!product) {
                    let respuesta = {
                        meta: {
                            status: 404,
                            message: 'Producto no encontrado'
                        }
                    }
                    res.json(respuesta);
                } else {
                    let respuesta = {
                        meta: {
                            status: 200,
                            message: 'Producto encontrado'
                        },
                        data: product
                    }
                    res.json(respuesta);
                }
            })
            .catch(error => {
                let respuesta = {
                    meta: {
                        status: 500,
                        message: 'Error al buscar producto'
                    },
                    data: error
                }
                res.json(respuesta);
            });
    },

    'create': (req, res) => {
        Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            category: req.body.category
        })
        .then(product => {
            let respuesta = {
                meta: {
                    status: 201,
                    message: 'Producto creado con éxito'
                },
                data: product
            }
            res.json(respuesta);
        })
        .catch(error => {
            let respuesta = {
                meta: {
                    status: 500,
                    message: 'Error al crear producto'
                },
                data: error
            }
            res.json(respuesta);
        });
    },

    'update': (req, res) => {
        Product.update({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            category: req.body.category
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(product => {
            let respuesta = {
                meta: {
                    status: 200,
                    message: 'Producto actualizado con éxito'
                },
                data: product
            }
            res.json(respuesta);
        })
        .catch(error => {
            let respuesta = {
                meta: {
                    status: 500,
                    message: 'Error al actualizar producto'
                },
                data: error
            }
            res.json(respuesta);
        });
    },

    'destroy': (req, res) => {
        Product.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(product => {
            let respuesta = {
                meta: {
                    status: 200,
                    message: 'Producto eliminado con éxito'
                }
            }
            res.json(respuesta);
        })
        .catch(error => {
            let respuesta = {
                meta: {
                    status: 500,
                    message: 'Error al eliminar producto'
                },
                data: error
            }
            res.json(respuesta);
        });
    },
}

module.exports = productsAPIController;*/
