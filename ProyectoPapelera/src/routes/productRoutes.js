const express= require('express');
const productControllers= require('../controllers/productControllers.js')

const router= express.Router();

/*
router.get("/productDetail", (req, res) => {
    res.render(path.join(__dirname, "../views/productDetail.html"));
  });*/


router.get('/', productControllers.index);
router.get('/:id', productControllers.detail)
//router.get('/productDetail/:id', productControllers.detail)
//router.get('/edit/:id', productControllers.edit)

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productControllers.create); 
router.post('/',productControllers.store); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productControllers.edit); 


module.exports= router