const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    
let Controllers= {
     index: (req,res) => {
        res.render('productDetail', {products})
}, 
    detail: (req,res) => {
        let id= req.params.id
        let product= products.find(products=>products.id == id)
        
        res.render('productDetail',{product})
        
      
},
//Item 7 de sprint 3. Edición de productos
    edit:function (req,res){
       // let id= req.params.id
        //let product= products.find(product=>product.id == id)
           // res.sendFile(path.join(__dirname, "./views/edit.ejs"), {productos:product})
},


	create: (req, res) => {

		res.render('create')
	},
	
    store: (req, res) => {
console.log(req.file)
		let nuevoProducto= {
			id: Date.now(),
			name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            //category: req.body.category,
			price: Number(req.body.price), 
			//size: Number(req.body.size),
			
		}

		products.push(nuevoProducto);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' ')),
		
		res.redirect('/productDetail')
	},


/*Para pasarle contenido a nuestra vista necesitamos el formato objeto, (clave y valor)
El primer parametro recibe la vista

*/
} 

module.exports= Controllers;
