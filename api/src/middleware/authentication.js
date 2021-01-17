const jwt = require('jsonwebtoken');
const { Product, Image, Category, Category_Product, Cart, User, Line_Order } = require('../db.js');

let verificarToken = (req,res,next)=>{

    let token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'ecommerce-ft06-g07', (err, decoded)=>{
        if(err){
            res.status(401).send(err)
        } 
        User.findOne({where:{email: decoded.user.email}})
        .then(user=>{
            if(decoded.user.password === user.password && decoded.user.rol === 'admin'){
                next()
            }else{
                return res.send('error de contrasenia')
            }
        })
        .catch(err=>{
            res.send(err)
        })
        
    })
}

let verificarId = (req,res,next)=>{

    let token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'ecommerce-ft06-g07', (err, decoded)=>{
        if(err){
            res.status(401).send(err)
        } 
        User.findOne({where:{email: decoded.user.email}})
        .then(user=>{
            if(decoded.user.password === user.password && decoded.user.id === req.params.id){
                next()
            }else if(decoded.user.password === user.password && decoded.user.rol === 'admin'){
                next()              
            }else{
                return res.send('error de contrasenia')
            }
        })
        .catch(err=>{
            res.send(err)
        })
        
    })
}


let verificarToken2 = (req,res,next)=>{

    let token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'ecommerce-ft06-g07', (err, decoded)=>{
        if(err){
            res.status(401).send(err)
        } 
        User.findOne({where:{email: decoded.user.email}})
        .then(user=>{
            if(decoded.user.password === user.password && decoded.user.rol === 'admin' || decoded.user.rol === 'user'){
                next() 
            }else{
                return res.send('error de contrasenia')
            }
        })
        .catch(err=>{
            res.send(err)
        })
    })
}

module.exports={
    verificarToken,
    verificarId,
    verificarToken2
}