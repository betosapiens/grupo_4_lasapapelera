const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const Product = db.Product;
const Category = db.Category;
//Aqui hacen esto para lograr activalos operadores en sus querys (like - count - max) 
const Op = db.Sequelize.Op;

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    
let Controllers= {
     index: (req,res) => {
        Product.findAll({
            include : [{association : 'category'}]
        })   
        .then(products =>{
            //return res.send(relojes);
            //res.render(path.resolve(__dirname, '..', 'views', 'admin', 'administrar'),{relojes});
            res.render('products', {products})
        })
        .catch(error => res.send(error))

      
}, 
    detail: (req,res) => {
       // let id= req.params.id
        //let product= products.find(products=>products.id == id)
        Product.findByPk(req.params.id, {
            include : [{association : 'category'}]
        })  
        
        .then(product =>{
            //res.render(path.resolve(__dirname, '..','views','admin','detail'), {miReloj})
            res.render('productDetail',{product})

        })  
        .catch(error => res.send(error))


      
        
      
},

create: (req, res) => {
    Category.findAll()
    .then(categorias =>{
        // res.render(path.resolve(__dirname, '..','views','admin','create'), {categorias});
        res.render('productCreate')
    } )
  
},

store: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const data = req.body
    
    const lastIndex = products.length - 1;
    const lastProduct = products[lastIndex];
    const biggestId = lastProduct ? lastProduct.id : 0;
    const newId = biggestId + 1;
 
    const _body= {
              
                name: req.body.name,
                description: req.body.description,
                price: Number(req.body.price), 
                discount: req.body.descuento,
                image : req.file.filename,
                categoryId : req.body.categoria 
            }
            products.push(_body);
            //console.log(nuevoProducto)
    
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' ')),
          
            Product.create(_body)
            .then(product =>{
                res.redirect('products');
            })
            .catch(error => res.send(error))
        },
    
//Item 7 de sprint 3. Edición de productos
    edit:function (req,res){
      //let productsId= req.params.id
       //let editarProducto = products.find(product=> product.id == productsId );
       const categorias = Category.findAll()
       const productos = Product.findByPk(req.params.id,{
           include : [{association : 'category'}]
       })

       Promise.all([productos,categorias])  
       .then( ([editarProducto, categorias]) =>{
           //return res.send(categorias);
           //res.render(path.resolve(__dirname, '..','views','admin','edit'), {relojEditar, categorias})
           res.render("productEdit", {editarProducto, categorias});
       
        })  
       .catch(error => res.send(error))        
   },


    update: (req, res) => {
        
            //const productsId = req.params.id;
            //const product = products.find(product => product.id == productsId);
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
            // product.name = req.body.name;
            // product.description = req.body.description;
            // product.price = req.body.price;

            Product.update ({

                name: req.body.name,
                price: req.body.price,
                description : req.body.description,
                imagen: req.file ? req.file.filename : req.body.oldImagen,
               // categoryId : req.body.categoria
            }, {
                where: {
                    id:req.params.id
               }
            })
            .then(()=> res.redirect('products'))
            .catch(error =>res.send(error))

          //fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
            //Redirigimos al usuario a la lista de productos
            //res.redirect('products');
      
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
            Product.destroy({
                where: {
                    id : req.params.id
                }
            })
            .then(()=>  res.redirect('/products'))
            .catch(error => res.send(error))
        }
    
    }
module.exports= Controllers
