//const express = require('express');
//const path = require('path');
const usersModel = require('../data/jsonTable');
//const usersModel = jsonTable('users');
const { validationResult } = require("express-validator")
const db = require('../database/models');
const User = db.User;
//const app = express();

const controller = {
	index: (req, res) => {
        res.cookie("testing", "Hola mundo!", {maxAge: 1000 * 30 })
		res.render('register')
	},	
	register: (req, res) => {
		return res.render('register');
	},
	processRegister: (req, res) => {
		const resultValidation = validationResult(req);
		
		if (resultValidation.errors.length > 0) {
			return res.render('register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}
    },

	store: (req, res) => {   
       
        let userToCreate = {
			firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
			password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file.filename
			
		}
        User
        .create(userToCreate)
        .then((storedUser) => {
            return  res.redirect('/login');
        })
        .catch(error => console.log(error));
    
        let userId = usersModel.create(userToCreate);

        res.redirect('/' ) + userId;

    },
    edit:function (req,res){
        //let productsId= req.params.id
         //let editarProducto = products.find(product=> product.id == productsId );

         User.findByPk(req.params.id)
         .then( ([user]) =>{
             //return res.send(categorias);
             //res.render(path.resolve(__dirname, '..','views','admin','edit'), {relojEditar, categorias})
             res.render("productEdit", {user});
         
          })  
         .catch(error => res.send(error))        
     },
  


	update: (req, res) => {   
       
        let userToEdit = {
			firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            avatar: req.file.filename
			
		}
    User
    .create(userToEdit)
    .then((storedUser) => {
        return  res.redirect('/login');
    })
    .catch(error => console.log(error));

    let userId = usersModel.create(userToEdit);

    res.redirect('/edit' ) + userId;

},  
    login: (req, res) => {
        res.render("login")
    },


    loginProcess: (req, res) => {
        const resultValidation = validationResult(req);
		

		if (resultValidation.errors.length > 0) {
			return res.render('login', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}
    
        
       let userToLogin = usersModel.findByField('email', req.body.email);
		
		
        
       if (userToLogin) { 
        let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
        if (isOkThePassword) {
            delete userToLogin.password;
		    req.session.userLogged = userToLogin;
            
            if(req.body.remember_user) {
                
                res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
            }

            return res.redirect('/user/profile')
        }

        return res.render('login', {
            errors: {
                email: {
                    msg: 'Contraseña incorrecta',
                
                }
            }
        });

        
       }

       return res.render('login', {
        errors: {
            email: {
                msg: "Debes completar con un email",
                msg: "No se encuentra este email en la base de datos"
            }
        }
       })
    },
	processLogin: (req, res) => {
		const resultValidation = validationResult(req);
		
		if (resultValidation.errors.length > 0) {
			return res.render('register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}
    },

    profile: (req, res) => {

        console.log(req.cookies.userEmail)
        return res.render('userProfile', {
			user: req.session.userLogged
		});
    },

    logout: (req, res) => {
        res.clearCookie('userEmail')
        req.session.destroy()
        console.log(req.session)
        return res.redirect('/');
    }
}

module.exports = controller;