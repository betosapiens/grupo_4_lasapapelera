let express = require("express")
let router= express.Router()
const path = require("path")
const { body } = require("express-validator")
const loginController= require('../controllers/loginController')
const usersControllers = require('../controllers/usersControllers')
const usersAPIControllers = require('../controllers/usersAPIControllers')

const { validateHeaderValue } = require("http")
const uploadFile = require('../middlewares/multerMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const validations = [
body('firstName')
.notEmpty().withMessage('Tienes que escribir un nombre')
.isLength({min: 2}).withMessage('El nombre debe tener un mínimo de 2 caracteres'),
body('lastName')
.notEmpty().withMessage('Tienes que escribir un apellido')
.isLength({min: 2}).withMessage('El apellido debe tener un mínimo de 2 caracteres'),
body('email')
.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
.isEmail().withMessage('Debes escribir un formato de correo válido'),
body('password')
.notEmpty().withMessage('Tienes que escribir una contraseña')
.isLength({min: 8}).withMessage('La contraseña debe tener un mínimo de 8 caracteres'),
	body('avatar').custom((value, { req }) => {
	let file = req.file;
	let acceptedExtensions = ['.jpg', '.png', '.gif'];
		
	if (!file) {
		throw new Error('Tienes que subir una imagen');
	} else {
		let fileExtension = path.extname(file.originalname);
		if (!acceptedExtensions.includes(fileExtension)) {
		throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
}
}

return true;
})
]

 //Api
// router.get('/:id', usersAPIControllers.show)
 router.get('/', usersAPIControllers.list)
router.get('/search', usersAPIControllers.search);
//router.get('/detail/:id', productAPIControllers.detail)
router.post('/', usersAPIControllers.create);
router.post('/', usersAPIControllers.update);
router.delete('/:id', usersAPIControllers.destroy);


//Formulario de registro
router.get('/register', guestMiddleware, usersControllers.index);
router.get('/edit/:id', guestMiddleware, usersControllers.edit);
router.post('/edit/:id', guestMiddleware, usersControllers.update);

router.get('/register', guestMiddleware, usersControllers.register);
router.post('/register', uploadFile.single("avatar"),validations, usersControllers.processRegister);

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