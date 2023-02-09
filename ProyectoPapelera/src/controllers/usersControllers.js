//const express = require('express');
//const path = require('path');
const usersModel = require('../data/jsonTable');
//const usersModel = jsonTable('users');
const { validationResults } = require("express-validator")
const bcryptjs = require("bcryptjs")

//Aquí requiero la Base  de Datos.
const db = require('../database/models/');

//Aquí hago la asociación al módelo correspondiente
const User = db.User;
//const app = express();

const controller = {
	index: (req, res) => {
        res.cookie("testing", "Hola mundo!", {maxAge: 1000 * 30 })
		res.render('register')
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

    
    login: (req, res) => {
        res.render("login")
    },


    loginProcess: (req, res) => {
        
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
                    msg: 'Contrasena incorrecta'
                }
            }
        });
        
       }

       return res.render('login', {
        errors: {
            email: {
                msg: "No se encuentra este email en la base de datos"
            }
        }
       })
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