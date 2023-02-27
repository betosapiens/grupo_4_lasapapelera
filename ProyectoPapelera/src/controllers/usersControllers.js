//const express = require('express');
//const path = require('path');
const usersModel = require('../data/jsonTable');
//const usersModel = jsonTable('users');
const { validationResults } = require("express-validator")
const bcryptjs = require("bcryptjs")

//Aquí requiero la Base  de Datos.
const db = require('../database/models/');

//Aquí hago la asociación al módelo correspondiente
const User = db.User;
//const app = express();

const controller = {
	index: (req, res) => {
        res.cookie("testing", "Hola mundo!", {maxAge: 1000 * 30 })
		res.render('register')
	},	

	store: (req, res) => {   
       
        let userToCreate = {
			firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
			password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file.filename
			
		}
        User
        .create(userToCreate)
        .then((storedUser) => {
            return  res.redirect('/login');
        })
        .catch(error => console.log(error));
    


        let userId = usersModel.create(userToCreate);

        res.redirect('/' ) + userId;

    },

    
    login: (req, res) => {
        res.render("login")
    },


    loginProcess: (req, res) => {
        
       let userToLogin = usersModel.findByField('email', req.body.email);
        
       if (userToLogin) { 
        let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
        if (isOkThePassword) {
            delete userToLogin.password;
		    req.session.userLogged = userToLogin;
            
            if(req.body.remember_user) {
                
                res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
            }

            return res.redirect('/user/profile')
        }

        return res.render('login', {
            errors: {
                email: {
                    msg: 'Contraseña incorrecta'
                }
            }
        });
        
       }

       return res.render('login', {
        errors: {
            email: {
                msg: "No se encuentra este email en la base de datos"
            }
        }
       })
    },

    profile: (req, res) => {

        console.log(req.cookies.userEmail)
        return res.render('userProfile', {
			user: req.session.userLogged
		});
    },

    logout: (req, res) => {
        res.clearCookie('userEmail')
        req.session.destroy()
        console.log(req.session)
        return res.redirect('/');
    }
}

module.exports = controller;
























/*


//const express = require('express');
//const path = require('path');
const usersModel = require('../data/jsonTable');
//const usersModel = jsonTable('users');
const { validationResult } = require("express-validator")
const bcryptjs = require('bcryptjs')
const db = require('../database/models');
const User = db.User;
//const app = express();

const controller = {
	index: (req, res) => {
        res.cookie("testing", "Hola mundo!", {maxAge: 1000 * 30 })
		res.render('register')
	},	
	register: (req, res) => {
		return res.render('register');
	},
	processRegister: (req, res) => {
		const resultValidation = validationResult(req);
		
		if (resultValidation.errors.length > 0) {
			return res.render('register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
      
		}
    else{
      return res.render('register')
    }
    },
      // Mostrar la lista de usuarios
     
 
    login: (req, res) => {
        res.render("login")
    },

    loginProcess: (req, res) => {
        const resultValidation = validationResult(req);
		

		if (resultValidation.errors.length > 0) {
			return res.render('login', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}
    
        
       let userToLogin = usersModel.findByField('email', req.body.email);
		   
       if (userToLogin) { 
        let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
        if (isOkThePassword) {
            delete userToLogin.password;
		    req.session.userLogged = userToLogin;
            
            if(req.body.remember_user) {
                
                res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
            }

            return res.redirect('/user/profile')
        }

        return res.render('login', {
            errors: {
                email: {
                    msg: 'Contraseña incorrecta',
                
                }
            }
        });  
       }

       return res.render('login', {
        errors: {
            email: {
                msg: "Debes completar con un email",
                msg: "No se encuentra este email en la base de datos"
            }
        }
       })
    },
	processLogin: (req, res) => {
		const resultValidation = validationResult(req);
		
		if (resultValidation.errors.length > 0) {
			return res.render('register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}
    },

    profile: (req, res) => {

        console.log(req.cookies.userEmail)
        return res.render('userProfile', {
			user: req.session.userLogged
		});
    },

    logout: (req, res) => {
        res.clearCookie('userEmail')
        req.session.destroy()
        console.log(req.session)
        return res.redirect('/');
	},


// Crear un nuevo usuario en la base de datos
store: (req, res) => {   
       
        let userToCreate = {
			firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
			password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file.filename
			
		}
        User
        .create(userToCreate)
        .then((storedUser) => {
            return  res.redirect('/login');
        })
        .catch(error => console.log(error));
    
        let userId = usersModel.create(userToCreate);

        res.redirect('/' ) + userId;

    },
  // Mostrar los detalles de un usuario específico
 
  
  // Renderizar el formulario para actualizar un usuario existente
  edit: (req, res) => {
    User.findByPk(req.params.id)
    .then(user => {
      res.render('users/edit', { user: user });
    })
    .catch(error => console.log(error));
  },

  // Actualizar los detalles de un usuario existente
  update: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password, avatar } = req.body;

    const user = {
      firstName,
      lastName,
      email,
      password: bcryptjs.hashSync(password, 10), 
      avatar
    };

    User.update(user, {
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.redirect('/users');
    })
    .catch(error => console.log(error));
  },

  // Eliminar un usuario existente de la base de datos
  destroy: (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.redirect('/users');
    })
    .catch(error => console.log(error));
  },

  // Buscar usuarios que cumplan ciertos criterios

show: (req, res) => {
    User.findByPk(req.params.id)
    .then(user => {
      res.render('users/show', { user: user });
    })
    .catch(error => console.log(error));

  },
}

module.exports = controller

/*store: (req, res) => {   
       
        let userToCreate = {
			firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
			password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file.filename
			
		}
        User
        .create(userToCreate)
        .then((storedUser) => {
            return  res.redirect('/login');
        })
        .catch(error => console.log(error));
    
        let userId = usersModel.create(userToCreate);

        res.redirect('/' ) + userId;

    },
    edit:function (req,res){
        //let productsId= req.params.id
         //let editarProducto = products.find(product=> product.id == productsId );

         User.findByPk(req.params.id)
         .then( ([user]) =>{
             //return res.send(categorias);
             //res.render(path.resolve(__dirname, '..','views','admin','edit'), {relojEditar, categorias})
             res.render("productEdit", {user});
         
          })  
         .catch(error => res.send(error))        
     },
  


	update: (req, res) => {   
       
        let userToEdit = {
			firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file.filename
			
		}
    User
    .create(userToEdit)
    .then((storedUser) => {
        return  res.redirect('/login');
    })
    .catch(error => console.log(error));

    let userId = usersModel.create(userToEdit);

    res.redirect('/edit' ) + userId;

},*/