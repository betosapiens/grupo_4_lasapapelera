const express= require('express');
const productControllers= require('../controllers/productControllers')

const router= express.Router();


router.get('/', productControllers.index);


//Rutas de creación de productos /
router.get('/create', productControllers.create); 
router.post('/', productControllers.store); 


router.get('/:id', productControllers.detail)


//Rutas de edición de productos/ 
router.get('/:id/edit/', productControllers.edit); 
router.put('/:id', productControllers.update)

//Rutas de eliminación de productos
router.get('/:id/delete', productControllers.delete);

router.delete('/:id', productControllers.destroy);

module.exports= router