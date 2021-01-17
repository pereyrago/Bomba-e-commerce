const server = require('express').Router();
const Sequelize = require('sequelize')
const { Product, Image, Category, Category_Product, Line_Order, Rate, User, Cart} = require('../db.js');
const jwt =  require ('jsonwebtoken')

// Ruta para crear/agregar Review
server.post('/:idProduct' , (req,res) => {
	const {idProduct} = req.params;
	const {rate , description} = req.body;
	let token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'ecommerce-ft06-g07', (err, decoded)=>{
		if(err){
            res.status(401).send(err)
        } 
		Rate.create({rate: rate , description: description, productId : idProduct, userId : decoded.user.id})
		.then((ans)=> { 
			res.status(200).send('Gracias por tu comentario!')
		})
		.catch(()=> res.status(500).send('Error'))
	})
	
})





//Crear ruta para Modificar Review
server.put('/:idReview', (req, res)=>{
	const {idReview} = req.params;
	const {rate, description} = req.body;

		description || rate ?
		Rate.update({
			rate: rate,
			description: description }, {where:{id: idReview , }}
		)
		.then(()=> res.status(200).send('Review modificada con exito!'))		
		.catch(()=> res.status(500).send('Error'))

	: res.sendStatus(404)	
		
})
		
//peticion para devolver todos los reviews de un producto
server.get("/:idProduct", (req,res) =>{
	let {idProduct} = req.params

	Rate.findAll({where: {productId:idProduct}, include:{model:User}})
		.then((arr)=>{
			res.status(200).send(arr);
		})
		.catch(error => res.status(500).send(error));
})

//peticion delete para borrar un review
server.delete("/:idReview",(req,res) => {
	let {idReview} = req.params

	Rate.destroy({where: {id:idReview}})
		.then((eliminado) => {
			res.status(200).send('El Review ha sido eliminado')
		})
		.catch(error => res.status(500).send(error));
})

//peticion para devolver todos los reviews de un usuario
server.get("/user/:idUser", (req,res) =>{
	let {idUser} = req.params

	Rate.findAll({where: {userId: idUser}, include:{model:Product}})
		.then((arr)=>{
			res.status(200).send(arr);
		})
		.catch(error => res.status(500).send(error));
})

server.get("/search/:idReview", (req, res)=>{
    const {idReview} = req.params
    
        Rate.findByPk(idReview)
        .then(respuesta => res.status(200).send(respuesta))
        .catch(err => res.status(500).send(err))
 

})

server.post('/user/:userId', (req, res) =>{
	const {idProduct, userId} = req.params;
	/* const {rate , description} = req.body; */
	let token = req.headers.authorization.split(' ')[1];
	// jwt.verify(token, 'ecommerce-ft06-g07', (err, decoded)=>{
		// if(err){
        //     res.status(401).send(err)
        // } else{
		Cart.findAll({where:{userId: userId , state: "completed"}, include: {model: Product, through : Line_Order}})
		/* ({where:{id:productId}, include: [{model: Image}]}) */
	/* 	{model: Product, through: Line_Order} */ // }
	
		.then(ans => {
			if(ans.length){
			 res.send(ans.map (cart => cart.products.map(producto => producto.id)))
			} else {
				res.send("No se encontró ningún carrito")
			}
		})
		.catch(()=> res.status(500).send('Error'))
	// })

})

// USUARIO CON ESTADO DE CARRITO COMPLETED, Y QUE RECIÉN SE LE HABILITE EL PRODUCTO QUE COMPRÓ PARA REALIZAR REVIEW  
// productId : idProduct, userId : decoded.user.id
//map a traves de los carritos
 // {
// 	"id": 5,
// 	"state": "completed",
// 	"createdAt": "2020-11-26T01:29:25.728Z",
// 	"updatedAt": "2020-11-26T01:33:03.748Z",
// 	"userId": 3,
// 	"checkoutId": 3,
// 	"products": [
// 		{
// 			"id": 1,
// 			"name": "cuadro",
// 			"description": "pintado",
// 			"price": 1000,
// 			"stock": 1000,
// 			"createdAt": "2020-11-25T15:14:40.460Z",
// 			"updatedAt": "2020-11-25T15:14:40.460Z",
// 			"Line_Order": {
// 				"quantity": 1,
// 				"price": 1000,
// 				"createdAt": "2020-11-26T01:29:31.131Z",
// 				"updatedAt": "2020-11-26T01:29:47.576Z",
// 				"cartId": 5,
// 				"productId": 1
// 			}
// 		},
// 		{
// 			"id": 2,
// 			"name": "lapices",
// 			"description": "lapiz",
// 			"price": 350,
// 			"stock": 3000,
// 			"createdAt": "2020-11-25T15:15:02.918Z",
// 			"updatedAt": "2020-11-25T15:15:02.918Z",
// 			"Line_Order": {
// 				"quantity": 1,
// 				"price": 350,
// 				"createdAt": "2020-11-26T01:29:51.458Z",
// 				"updatedAt": "2020-11-26T01:29:51.458Z",
// 				"cartId": 5,
// 				"productId": 2
// 			}
// 		}
// 	]



module.exports = server;


