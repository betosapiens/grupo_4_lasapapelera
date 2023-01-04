//const { application } = require("express");   ????
const express = require('express');
const session = require('express-session');
const app = express();
 //const methodOverride = require('method-override');
const path = require("path"); 
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware")
const cookies = require('cookie-parser');


app.use(session({
	secret: "Shhh, It's a secret",
	resave: false,
	saveUninitialized: false,
}));

app.use(userLoggedMiddleware)
app.use(cookies())

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

//rutas

const mainRouter = require('./routes/main');
const productsList= require('./routes/productRoutes');
const productRoutes= require('./routes/productRoutes');
const usersRoutes = require('./routes/users');

const productCartRoutes = require('./routes/productCartRoutes');

app.use('/', mainRouter)
app.use('/products', productRoutes)
//app.use('/productDetail', productRoutes)
app.use('/user', usersRoutes)
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
//app.use(methodOverride('_method'));

app.listen(3032, () => console.log("servidor corriendo! 3032"));


module.exports = app;