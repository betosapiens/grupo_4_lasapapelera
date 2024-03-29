const express = require('express');
const productControllers = require('../controllers/productControllers')
const uploadFile = require('../middlewares/multerProductsMiddleware')

const router= express.Router();


router.get('/', productControllers.index);

//Rutas de creación de productos /
router.get('/create', productControllers.create); 
router.post('/', uploadFile.single("image"), productControllers.store); 
router.get('/detail/:id', productControllers.detail)

//Rutas de edición de productos/ 
router.get('/edit/:id', productControllers.edit); 
router.post('/edit/:id', uploadFile.single("image"), productControllers.update)

//Rutas de eliminación de productos
router.get('/delete/:id', productControllers.destroy);
router.delete('/delete/:id', productControllers.destroy);

module.exports= router