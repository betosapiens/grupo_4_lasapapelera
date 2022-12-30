let express = require("express")
let router= express.Router()
const path = require("path")
const { body } = require("express-validator")
//const loginController= require('../controllers/loginController')
const usersControllers = require('../controllers/usersControllers')
const { validateHeaderValue } = require("http")
const uploadFile = require('../middlewares/multerMiddleware')


  const validations = [
   body("first_name").notEmpty().withMessage("Tienes escribir un nombre"),
   /*body("last_name").notEmpty().withMessage("Tienes que escribir un apellido"),
   body("email").notEmpty().withMessage("Tienes que escribir un correo electronico").bail()
   .isEmail().withMessage("Debes escribir un formato de correo valido"),
   body("password").notEmpty().withMessage("Tienes que escribir una contrasena"),
   body("category").notEmpty().withMessage("Debes elegir una categoria"),
   body("avatar").notEmpty().custom ((value, {req}) => {
      let file = req.file 
      let acceptedExtensions = [".jpg", ".png"]
      if (!file) {
         throw new Error("Tienes que subir una imagen")
      } else {
         let fileExtension = path.extname(file.originalname)
         if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(", ")}`)
         }
      }
      return true
      
   }) ,*/
  ]


router.get('/register', usersControllers.index);

router.get('/login',usersControllers.login);



router.post('/register', uploadFile.single("avatar"), validations, usersControllers.store);

module.exports = router