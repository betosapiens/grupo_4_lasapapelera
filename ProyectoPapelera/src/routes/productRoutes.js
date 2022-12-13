const express= require('express');
const productControllers= require('../controllers/productControllers')

const router= express.Router();


router.get('/', productControllers.index);

//Rutas de creación de productos /
router.get('/create', productControllers.create); 
router.post('/create', productControllers.store); 
router.get('/detail/:id', productControllers.detail)

//Rutas de edición de productos/ 
router.get('/edit/:id', productControllers.edit); 
router.put('/edit/:id', productControllers.update)

//Rutas de eliminación de productos
router.get('/:id/delete', productControllers.delete);
router.delete('/:id/delete', productControllers.destroy);

module.exports= router