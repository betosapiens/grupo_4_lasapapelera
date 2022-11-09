const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
//Acá van todos los productos que queremos mostrar, se pueden poner con más detalle en descripción(tamaño,formato,linea,etc)
//Hay que revisar los nombres de productos, con los de home.ejs, si coinciden o no. 


    //Revisar los nombres dados a las variables y si va productos.find de detail, detalle y edit
let Controllers= {
     index: (req,res) => {
        res.render('productDetail', {products})
}, 
    detail: (req,res) => {
        /* let id= req.params.id
        let product= productos.find(productos=>productos.id == id)
        res.sendFile(path.join(__dirname, "./views/productDetail.ejs"), {productos:productos}); */
        res.render('productDetail',{product:products.find(product => product.id == req.params.id)})
        
      
},
    edit:function (req,res){
        let id= req.params.id
        let product= products.find(product=>product.id == id)
            res.sendFile(path.join(__dirname, "./views/edit.ejs"), {productos:product})
},

// Create - Form to create
	create: (req, res) => {
		
		res.render('/create')
	},
	
	// Create -  Method to store
	store: (req, res) => {
console.log(req.file)
		let nuevoProducto= {
			id: Date.now(),
			name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            category: req.body.category,
			price: Number(req.body.price), 
			size: Number(req.body.size),
			
		}

		products.push(nuevoProducto);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' ')),
		
		res.redirect('/productDetail')
	},


/*Para pasarle contenido a nuestra vista necesitamos el formato objeto, (clave y valor)
El primer parametro recibe la vista

*/

//Prueba realizada para comparar con detail de más arriba.
/* detalle: function(req,res){
    let detalleProducto=producto.find(producto=>producto.id==req.params.id)
    if(detalleProducto == undefined){
    res.render("No se encontró el producto")
  }else {
    res.render('productDetail', {detalle:detalleProducto})
  }
    res.render('index',{detalle:detalleProducto})
}*/
} 

module.exports= Controllers;
