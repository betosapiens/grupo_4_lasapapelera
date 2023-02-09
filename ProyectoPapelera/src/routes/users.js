let express = require("express")
let router= express.Router()
const path = require("path")
const { body } = require("express-validator")
//const loginController= require('../controllers/loginController')
const usersControllers = require('../controllers/usersControllers')
const { validateHeaderValue } = require("http")
const uploadFile = require('../middlewares/multerMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


//Formulario de registro
router.get('/register', guestMiddleware, usersControllers.index);
router.get('/edit/:id', guestMiddleware, usersControllers.edit);
router.post('/edit/:id', guestMiddleware, usersControllers.update);

//Proceso de registro
router.post('/register', uploadFile.single("avatar"), usersControllers.store);

//Formulario de Login
router.get('/login', guestMiddleware, usersControllers.login);

//Proceso de Login
router.post("/login", usersControllers.loginProcess);

//Perfil de usuario
router.get('/profile/', authMiddleware, usersControllers.profile)

//logout
router.get("/logout/", usersControllers.logout)


module.exports = router