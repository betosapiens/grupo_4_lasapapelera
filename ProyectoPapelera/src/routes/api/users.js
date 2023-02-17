const express = require('express');
const router = express.Router();
const usersAPIControllers = require('../../controllers/api/usersAPIControllers');


//Rutas
//Listado de todos los usuarios
router.get('/', usersAPIControllers.list);
//Detalle del usuario
router.get('/:id', usersAPIControllers.show);
 //Api
 router.get('/search', usersAPIControllers.search);
 //router.get('/detail/:id', productAPIControllers.detail)
 router.post('/create', usersAPIControllers.create);
 router.patch('/update/:id', usersAPIControllers.update);
 router.delete('/delete/:id', usersAPIControllers.destroy);


module.exports = router;