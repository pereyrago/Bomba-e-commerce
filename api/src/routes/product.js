const server = require('express').Router();
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const { Product,Image, Category, Category_Product, Line_Order, Rate, User} = require('../db.js');
const {verificarToken} = require('../middleware/authentication.js');
const jwt =  require ('jsonwebtoken')
const {addProductUploader,editProductUploader}= require('./../middleware/uploadImage')


// Peticion get all a products con cat e img
server.get('/', (req, res) => {	
	Product.findAll({ include: [Category, Image]})
		.then(products => res.status(200).send(products)
		)
		.catch(()=>{
			res.status(400).send('Productos no disponibles')
		});
});

//Petición Del para borrar una imagen a un producto
server.delete('/images/:imgId', (req, res, next)=>{
	const{imgId}=req.params;
	
	Image.destroy({where: {id: imgId}})

	.then(()=> res.sendStatus(200))
	.catch(()=> res.sendStatus(500))
})

	
//Ruta para cargar imagenes a un producto
server.post('/images/:productId', editProductUploader, (req, res, next)=>{
	const{productId}=req.params;
	const{files}=req

	if(!files) res.sendStatus(400)

	let productPromise = Product.findByPk(productId)

	let imagePromise = files.map(image => Image.create({imgUrl: `/image/${image.filename}`}))

	Promise.all([productPromise, ...imagePromise])

	.then(([product, ...image])=> product.addImages(image))

	.then(()=>{
		return Product.findOne({where:{id:productId},
			include: [{model: Image}]
		})
	})

	.then((r)=> res.send(r))

	.catch(()=> res.sendStatus(400))
})


//peticion post para crear producto
server.post('/addProduct',  (req, res, next) => {
	const {files} = req
	const {name, description, price, stock, categoriesId}= req.body

	if(name && description && price && stock && categoriesId.length){
		let productPromise = Product.create({ name, description, price, stock })

		let categoriesPromise = categoriesId.map(categoryId=> Category.findByPk(categoryId))
	
		let prodId;
		
		categoriesPromise = Promise.all([productPromise,...categoriesPromise])
		.then(([product, ...categories])=> {
			categories = categories.filter(category=> !!category)
			categories = categories.map(category=> category.id)
			prodId=product.id
			return product.setCategories(categories)			
		})

		.then(()=>{
			return Product.findOne({where:{id:prodId},
				include: [{model: Category}]
			})
		})
		
		.then(r=> res.send(r))
		.catch(next)

	}else{
		return res.sendStatus(400)
	}
});


// peticion delete para eliminar un producto segun la id
server.delete('/delete/:id', verificarToken,(req,res) => {
	if(req.params.id) {
	  Product.findByPk(req.params.id)
		  .then((product)=> {
			  if(product){
				return Product.destroy({where:{id:req.params.id}})
			  }
			  else{
				  return res.status(404).send('No se encontro el producto');
			  }
			  })
			 .then(()=>{
				return Category_Product.destroy({where:{productId:req.params.id}})
			 }) 
			.then(()=>{

				return Image.destroy({where:{id:req.params.id}})
			}).then(()=>{
				return res.sendStatus(200);
			})
			.catch( err => {
				return res.status(500).send(err)
			})			
		}
	else{
		return res.sendStatus(400)
	}
} );


// peticion post para crear category
server.post('/category', verificarToken, (req, res) => {

	if(!req.body.name){
		res.status(400).send("No se ha ingresado nombre de categoría");
	}
	Category.findOrCreate({where:{name:req.body.name}})
		.then(category => {
			res.status(201).json(category);

		})
		.catch(error => res.status(500).send(error))
});
//peticion delete para eliminar category segun el id
server.delete('/category/:id',verificarToken, (req, res) => {
	let {id} = req.params;
	let name;

	Category.findByPk(id)
		.then(category => {
			name = category.name;
			if(category){
				return Category.destroy({where: {id:id}});
			} else {
				return res.status(400).json({error: 'No match'})
			}
		})
		.then((eliminado) => {
			res.status(200).send('La categoría ' + name + ' ha sido eliminada')
		})
		.catch(error => res.status(500).send(error));
});

// peticion get para traer las category
server.get('/category', (req, res) => {
	Category.findAll()
		.then(category => {			
			res.json(category);
		})
		.catch(error => res.status(500).send(error));
});

//peticion put para modificar una categoria segun el id
server.put('/category/:id', verificarToken, (req,res)=>{
	const id= req.params.id;
	const name=req.body.name;
	Category.update({
		name: name
	},  {where: {
		id:id
	}})
	.then(e =>{ e[0] ? Category.findByPk(id) : res.status(400).send('La categoría no existe')
	})
	.then(e => res.send(e))
	.catch(e=> res.status(500).send('Error'))
});

// peticion GET para traer todos los productos pertenecientes a una categoría
server.get('/category/:nameCat', (req,res)=> {
	let products = [];
	let catId;
	let pid;
    Category.findOne({
       where: { name: req.params.nameCat }
    })
    .then(cat=>{
    	if(cat){
    		return Category_Product.findAll({ where: {categoryId: cat.dataValues.id}})
    	}else{
    		return res.status(404).send('la categoria no existe')
    	}	
    })
    .then(ids=>{
    	pid =  ids.map((id)=>{
  			return Product.findByPk(id.productId, {include: {model: Image}})
  			.then((results)=>{
     				products.push(results)     		
  			})
		})
    })   
    .then(()=>{
    	return Promise.all(pid)
    })
    .then(()=>{
			res.send(products)
    })
})


//peticion get para search un producto por nombre en el titulo o en la descripcion
server.get('/search/:product', (req,res)=> {
	let product;
	if(req.params.product){
		product=req.params.product
	Product.findAll({
        where: {[Op.or]: [{ name: { [Op.iLike]:  `%${product}%` }}, { description: { [Op.iLike]:  `%${product}%` }}]}, include:{model: Image},
    })
	.then((productsFind)=>{
		res.send(productsFind)
	})
	.catch(err =>{ send.status(500).send(err)})
}else{
	res.send(404)
}
})

//peticion POST para asignar categoria a un producto
server.post('/:idProducto/category/:idCategoria',verificarToken, (req, res)=>{
    let {idProducto, idCategoria} = req.params;
    if (!idCategoria) return res.status(400).send('No se ingreso una CATEGORIA valida');
    if(!idProducto) return res.status(400).send('No se ingreso un PRODUCTO valido');
    Product.findByPk(idProducto)
    .then(product => product.addCategory(idCategoria))
    .then(() => res.status(200).send('Categoria asignada con exito'))   
    .catch(()=> res.status(500).send('Error'))
})

//peticion DELETE para borrar categoria a un producto
server.delete('/:idProducto/category/:idCategoria',verificarToken, (req,res)=>{
    let {idProducto, idCategoria} = req.params;
    let arr;
    if (!idCategoria) return res.status(400).send('No se ingreso una CATEGORIA valida');
    if(!idProducto) return res.status(400).send('No se ingreso un PRODUCTO valido');
    
    Product.findByPk(idProducto)
	.then(product => (arr=product, Category.findByPk(idCategoria)))	
    .then(category => Category_Product.destroy({where: [{productId:arr.id},{categoryId:category.id}] }))
    .then(() => res.status(200).send('Categoria eliminada con exito'))
	.catch(()=> res.status(500).send('Error'))
})

//peticion get a category buscando por el nombre
server.get('/category/:nameCat', (req,res)=> {
	let products = [];
	let catId;
	let pid;
    Category.findOne({
       where: { name: req.params.nameCat }
    })
    .then(cat=>{
    	if(cat){
    		return Category_Product.findAll({ where: {categoryId: cat.dataValues.id}})
    	}else{
    		return res.status(404).send('la categoria no existe')
    	}
    })
    .then(ids=>{
    	pid =  ids.map((id)=>{
  			return Product.findByPk(id.productId, {include: {model: Image}})
  			.then((results)=>{
     				products.push(results)     		
  			})
		})
    })   
    .then(()=>{    	
    	return Promise.all(pid)
    })
    .then(()=>{
			res.send(products)
    })
})

//peticion get a products para traer un producto por su id
server.get('/:id', (req,res)=> {
  	let product={};
    Product.findOne({where: {id:req.params.id}, include:[{model: Image }, {model: Category}]
    })
    .then(prod=>{
      
    	product = prod
    	if(prod){
    		return Category_Product.findOne({ where: {productId: req.params.id}})
    	}else{
    		return res.status(404).send('el prodcto no existe')
    	}
    })
    .then(cat=>{
		console.log(cat)
     	return Category.findByPk(cat.categoryId)
    })   

    .then((cat)=>{    	
    	product.dataValues.catName = cat.name
		product.dataValues.catId = cat.id 	
		
    	return res.status(200).send(product)
    })
})

//peticion put a products para modificar un producto con su id
server.put('/:id',verificarToken, (req,res, next)=>{
	const{name, description, price, stock, categories} = req.body
	const{id} = req.params
		let productPromise =Product.update({
		name: name,
		description: description,
		price: price,
		stock: stock
		},	{where: {id: req.params.id}})
		.then(()=> productPromise=Product.findOne({where:{id}}))

		let categoriesPromise = categories.map(categoryId=> Category.findByPk(categoryId))

		categoriesPromise = Promise.all([productPromise,...categoriesPromise])
		.then(([product, ...categories])=> {
			categories = categories.filter(category=> !!category)
			categories = categories.map(category=> category.id)	
			return product.addCategory(categories)
		})

		.then(()=>{
			return Product.findOne({where:{id},
				include: [{model: Category}]
			})
		})
		
		.then(r=> res.send(r))
		.catch(next)
})


//peticion get para traenos el carrito de un usuario 
server.get('/:cartId/users/' , (req, res)=>{
    const {cartId, userId} = req.params;    
    let array=[]
    let nombres;
  
    Line_Order.findAll({where: { cartId : cartId }})
    .then((ans)=>{
    nombres = ans.map(async (line) => {
      return await Product.findByPk(line.productId)
      .then(product => {
        array.push({line, product})
      })
    })
  })
  .then(ans => {
    return Promise.all(nombres)
  })

  .then((ans) => {
    res.status(201).send(array)

  })
  .catch((err) => res.send(err))

})

module.exports = server;