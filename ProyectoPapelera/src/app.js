//const { application } = require("express");   ????
const express = require('express');
const session = require('express-session');
const app = express();

const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const path = require("path"); 
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware")
const cookies = require('cookie-parser');


//RUTAS REQUERIDAS
const mainRouter = require('./routes/main');

const productRoutes= require('./routes/productRoutes');
const usersRoutes = require('./routes/users');
//Aquí llamo a la ruta de las api de productos
const apiProductsRouter = require('./routes/api/products')
//Aquí llamo a la ruta de las api de usuarios
const apiUsersRouter = require('./routes/api/users')

//const productsList= require('./routes/productRoutes');

//const productCartRoutes = require('./routes/productCartRoutes');



app.use(session({
	secret: "Shhh, It's a secret",
	resave: false,
	saveUninitialized: false,
}));

app.use(cookies())
app.use(userLoggedMiddleware)


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

//rutas

app.use('/', mainRouter)
app.use('/products', productRoutes)
app.use('/user', usersRoutes)

app.use('/api/products',apiProductsRouter);

app.use('/api/users',apiUsersRouter);

// app.use('/productDetail', productRoutes)
//app.use('/productCart', productCartRoutes)
//app.use('/productEdit',productRoutes)


//const mainRoutes= require('./src/routes/mainRoutes')
// const productRoutes= require('./routes/productRoutes')
//const registerRoutes= require('./src/routes/registerRoutes')
//const loginRoutes= require('./src/routes/loginRoutes')

/*const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());*/

//npm 

app.set('views', path.join(__dirname, '/views'));


app.listen(3032, () => console.log("servidor corriendo! 3032"));


module.exports = app;