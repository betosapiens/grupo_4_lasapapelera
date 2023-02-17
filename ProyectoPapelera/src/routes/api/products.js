const express = require('express');
const router = express.Router();
const productsAPIControllers = require('../../controllers/api/productsAPIControllers');

//Rutas
//Listado de películas
router.get('/', productsAPIControllers.list);
//Detalle de una película
router.get('/:id', productsAPIControllers.show);
//Buscar una película
router.get('/search/:id', productsAPIControllers.search);
//Agregar una película
router.post('/create', productsAPIControllers.store);
//Modificar una película
router.put('/update/:id', productsAPIControllers.update);
//Eliminar una película
router.delete('/delete/:id', productsAPIControllers.destroy);




module.exports = router;