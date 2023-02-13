const express = require('express');
const fs = require('fs');

const app = express();
const path = require('path');


const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {
	index: (req, res) => {
		res.render('home',{products})
	}
};

module.exports = controller;