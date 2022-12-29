//const express = require('express');
//const path = require('path');
const jsonTable = require('../data/jsonTable');
const usersModel = jsonTable('users');
const { validationResults } = require("express-validator")


//const app = express();


const controller = {
	index: (req, res) => {
		res.render('register')
	},	

	store: (req, res) => {
        /* -------------------VALIDACION 
        const resultsValidation = validationResults(req)
        if (resultsValidation.errors.length > 0) {
            return res.render("register", {
                errors: resultsValidation.mapped(),
            })
        }*/
    
         let user = req.body;    

        userId = usersModel.create(user);

        res.redirect('/register' )//+ userId);
    },
    
    /*processRegister: (req, res) => {
        return res.send({
            body: req.body,
            file: req.file
        })
    }*/
    
};

module.exports = controller;