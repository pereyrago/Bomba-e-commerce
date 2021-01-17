const server = require('express').Router();
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const {verificarToken, verificarToken2} = require('../middleware/authentication.js');
const { Product, Cart, User, Line_Order, Rate } = require('../db.js');


/* Ruta que retorna todas las ordenes según el state recibido por query */
server.get('/',verificarToken, (req, res) =>{
    const {state} = req.query;
    if( state === "created" || state === "processing" || state === "canceled" || state === "completed" ){
        Cart.findAll({
                where:{ state : state} , include:{model:User}})
        .then(respuesta => res.status(200).send(respuesta))
        .catch(err=> res.status(500).send(err))
    }else res.sendStatus(400)
})

/* Ruta que retorna todas las ordenes según ID de usuario */
server.get('/users/:id/', verificarToken2, (req, res)=>{
    const {id} = req.params;
    if(id){
        Cart.findAll({where:{ userId : id} , 
                        include: {model: Product, through: Line_Order}
                    })              
        
        .then(respuesta=> res.status(200).send(respuesta))
        .catch(() => res.sendStatus(500))
    }else{
      res.status(400).send('Bad Request')
    }   
})

//ruta para retornar los carritos con estado created
server.get('/users/:id/cart',(req, res)=>{
    const {id}=req.params;
    Cart.findAll({where:[{userId:id},{state:'created'}]})
    .then(respuesta=> res.send(respuesta))
    .catch(err=> res.send(err))
})

//ruta para retornar los carritos con estado created de un usuario
server.get('/users/:id/created',(req, res)=>{
    const {id}=req.params;
    Cart.findAll({where:[{userId:id},{state:'created'}],
                    include: {model: Product, through: Line_Order}
                })
    .then(respuesta=> res.send(respuesta))
    .catch(err=> res.send(err))
})

/* Ruta que retorne todas las Ordenes de los usuarios */
server.get('/all', verificarToken, (req, res) =>{    
    Cart.findAll({ include: {model: User}})
    .then(respuesta => res.status(200).send(respuesta))
    .catch(()=> res.sendStatus(500))
})

/* Ruta que retorne una orden en particular. */
server.get('/:id', (req, res)=>{
    const {id} = req.params;
    if(id){
        Cart.findByPk(id, {include:{model:User}})
        .then(respuesta=> res.status(200).send(respuesta))
        .catch(() => res.sendStatus(500))
    }else res.sendStatus(400);
})


/* Ruta para modificar una Orden  */
server.put('/:id', (req, res)=>{
    const {id} = req.params;
    const {state} = req.body;

    if( id  || state === "created" || state === "processing" || state === "canceled" || state === "completed" ){
        Cart.update({
            state : state
        }, {where:{id:id}})
        .then(resultado => res.status(200).send(resultado))
        .catch(() => res.sendStatus(500))
    }else{
        return res.sendStatus(400)
    }
})


/* Ruta que recibe un cartId y cambia state a canceled */
server.put('/cancel/:id', (req, res)=>{
    const {id} = req.params;
    const {state} = req.body;

    if( id &&  state === "created" || state === "processing" ){
        Cart.update({
            state : 'canceled'
        }, {where:{id:id}})
        .then(resultado => res.status(200).send(resultado))
        .catch(() => res.sendStatus(500))
    }else{
        return res.sendStatus(400)
    }
})


    
module.exports=server;

