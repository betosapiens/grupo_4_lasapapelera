const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    
let Controllers= {
     index: (req,res) => {
        res.render('products', {products})
}, 
    detail: (req,res) => {
        let id= req.params.id
        let product= products.find(products=>products.id == id)
        
        res.render('productDetail',{product})
        
      
},

create: (req, res) => {

    res.render('productCreate')
},

store: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const data = req.body
    
    let nuevoProducto= {
                id: req.params.id,
                name: req.body.name,
                description: req.body.description,
                image: req.body.image,
                //category: req.body.category,
                price: Number(req.body.price), 
                //size: Number(req.body.size),
                
            }
            products.push(nuevoProducto);
    
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' ')),
            
            res.redirect('products')
        },


//Item 7 de sprint 3. Edición de productos
    edit:function (req,res){
       let productsId= req.params.id
       let editarProducto = products.find(product=> product.id == productsId );
        
       res.render("productEdit", {editarProducto});
    },


	

    update: (req, res) => {
        
            const productsId = req.params.id;
            const product = products.find(product => product.id == productsId);
           
            product.name = req.body.name;
            product.description = req.body.description;
            product.price = req.body.price;

            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
            //Redirigimos al usuario a la lista de productos
            res.redirect('products');
      
        },
        delete: (req, res) => {
       
                const id = req.params.id;
                const product = products.find(product => product.id == id);
                res.render('productDelete', { product });
        },



        destroy: (req, res) => {
            
            const id = req.params.id;
            const product = products.find(product => product.id == id);
            //Obtenemos el índice del producto que queremos eliminar
            const index = products.indexOf(product);
            //Eliminamos el producto del array
            products.splice(index, 1);
            //Escribimos el nuevo array de productos en el archivo JSON
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
            //Redirigimos al usuario a la lista de productos
            
            res.redirect('/products');
        }
    }

module.exports= Controllers;
