const express = require('express');
const path = require('path');

const app = express();


const controller = {
	index: (req, res) => {
		res.render('productCart');        
	}
};

module.exports = controller;