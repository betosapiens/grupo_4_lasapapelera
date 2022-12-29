let express = require("express")
let router= express.Router()
const path = require("path")
const { body } = require("express-validator")
//const loginController= require('../controllers/loginController')
const registerController = require('../controllers/registerController')
const multer = require('multer')
const { validateHeaderValue } = require("http")


const storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
       cb(null, './public/images/users'); 
    }, 
    filename: (req, file, cb) => { 
      let fileName = `${Date.now()}_img_${path.extname(file.originalname)}`; 
       cb(null, fileName)}  
  })

  const uploadFile = multer({ storage })
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

router.get('/', registerController.index);

//router.get('/',loginController.index);

router.post('/', uploadFile.single("avatar"), validations, registerController.store);







module.exports = router