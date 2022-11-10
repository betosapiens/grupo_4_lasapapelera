const express= require('express');
const productControllers= require('../controllers/productControllers')

const router= express.Router();

/*
router.get("/productDetail", (req, res) => {
    res.render(path.join(__dirname, "../views/productDetail.html"));
  });*/


router.get('/create', productControllers.create);
//router.get('/', productControllers.index);
router.get('/:id', productControllers.detail)
//router.get('/productDetail/:id', productControllers.detail)
//router.get('/edit/:id', productControllers.edit)

//Rutas de creación de productos / 
 
router.post('/',productControllers.store); 

//Rutas de edición de productos/ 
router.get('/edit/:id', productControllers.edit); 




module.exports= router