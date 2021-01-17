const server = require('express').Router();
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const jwt = require('jsonwebtoken');

const { Product, Image, Cart, User, Line_Order } = require('../db.js');


server.post('/addProduct', (req, res) =>{
    const {email, id,quantity,price} = req.body
    let token;
    let userId;
    let cartId;

   User.findOrCreate({
    where: {
        email: email
      },
      defaults:{
        email: `invitado${Math.random()}@gmail.com`,
        first_name: 'invitado',
        last_name: 'invitado',
        password:'invitado',
        rol: 'guest'
      }
    })
    .then(usuario=>{
            userId =  usuario[0].id
            let user = usuario[0]
             token = jwt.sign({
                user
            }, 'ecommerce-ft06-g07' , { expiresIn: 60*60*24*30})    

        return Cart.findOrCreate({where: {
            userId: userId,
            state: "created"
          },
          defaults : { state: "created", userId  }})
    })
    .then(cart=>{   

        cartId = cart[0].id
       return  Line_Order.findOrCreate({
            where: {
              productId: id,
              cartId
            },
            defaults: {
             quantity, price: price*quantity, productId: id, cartId
            }
    })    
   })
   .then((ans)=>{
       if (!ans[1]){
       return Line_Order.update({
            quantity, price: price*quantity
        },{where: {productId: id,
            cartId}})
       }else{
        return res.status(201).send(token)
       }    
   })
   .catch(err => res.send(err))
})

server.put('/users/:idUser', (req,res)=>{
    const {quantity, price, productId} = req.body
    let userId = req.params.idUser
    Cart.findOne({where: {
      userId: userId,
      state: "created"
    }})
    
   .then(ans => {
    cartId = ans.id
    return Line_Order.update({
      quantity, price: price*quantity
  },{where: {productId,
      cartId}})
 }) 
 .then(ans => {
   res.status(200).send(ans)
 })
})

server.delete('/users/:idUser/:productId', (req,res)=>{
  Cart.findOne({where: {
    userId: req.params.idUser,
    state: "created"
  }})
  .then(ans=>{
    cartId = ans.id
    return Line_Order.destroy({where: {productId: req.params.productId,
      cartId}})

  })
  .then(ans =>{
    res.status(201).send('producto removido del carrito')
  })
})

server.get('/users/:idUser', (req,res)=>{
  let array = []
  let nombres; 

  Cart.findOne({where: {
    userId: req.params.idUser,
    state: "created"
  }})
  .then(ans =>{
      return Line_Order.findAll({where: {cartId: ans.id}})
  })
  .then((ans)=>{
    lineOrders = ans;
    nombres = ans.map(async (line) => {
      return await Product.findByPk(line.productId, {include :{model : Image}})
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


server.delete('/deleteCart/:userId', (req,res)=>{

  Cart.destroy({where: {userId: req.params.userId,
  state: 'created'}})
  .then(ans =>{
 res.status(201).send('carrito eliminado')
})
.catch(err => res.status(500).send(err))
})


server.put("/updateCart/:idUser/:newId", (req,res) =>{
  Cart.destroy({where:{userId:req.params.newId, state:"created"}})
  .then(ans=>{ 
    return Cart.update({userId: req.params.newId},{where: {
            userId: req.params.idUser,
            state: "created"
    }} )
  })
  .then(ans=>{
    User.destroy({where:{id: req.params.idUser}})
  })
  .then(ans=>{
    res.send("carritos cambiados")
  })
  .catch(err =>{err})
})

module.exports=server