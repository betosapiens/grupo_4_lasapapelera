const express= require('express');
const productCartControllers= require('../controllers/productCartControllers.js')

const router= express.Router();


router.get('/', productCartControllers.index);

module.exports= router