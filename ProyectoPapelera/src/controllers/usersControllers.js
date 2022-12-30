//const express = require('express');
//const path = require('path');
const jsonTable = require('../data/jsonTable');
const usersModel = jsonTable('users');
const { validationResults } = require("express-validator")
const bcryptjs = require("bcryptjs")


//const app = express();


const controller = {
	index: (req, res) => {
		res.render('register')
	},	

	store: (req, res) => {
        console.log(req.body)    
       
        let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			
		}

        let userId = usersModel.create(userToCreate);

        res.send('FUNCIONNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!' ) + userId;

    },

    login: (req, res) => {
        res.render("login")
    },

    


};

module.exports = controller;