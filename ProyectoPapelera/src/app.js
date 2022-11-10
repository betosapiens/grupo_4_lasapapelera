//const { application } = require("express");   ????
const express = require('express');

const path = require("path");
const mainRouter = require('./routes/main');
const productRoutes= require('./routes/productRoutes');
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes= require('./routes/loginRoutes');
const productCartRoutes = require('./routes/productCartRoutes');


const app = express();

//Rutas creadas
//const mainRoutes= require('./src/routes/mainRoutes')
// const productRoutes= require('./routes/productRoutes')
//const registerRoutes= require('./src/routes/registerRoutes')
//const loginRoutes= require('./src/routes/loginRoutes')

/*const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));*/

app.use(express.static(path.join(__dirname, '../public')));

app.listen(3032, () => console.log("servidor corriendo! 3032"));


app.use('/', mainRouter)
app.use('/productDetail', productRoutes)
app.use('/register', registerRoutes)
app.use('/login', loginRoutes)
app.use('/productCart', productCartRoutes)
app.use('/products',productRoutes)


//npm 
app.set("view engine", "ejs")
app.set('views', path.join(__dirname, '/views'));





module.exports = app;