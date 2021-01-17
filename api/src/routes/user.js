const server = require('express').Router();
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken')
const Op = Sequelize.Op
const bcrypt = require('bcrypt')
const { Product, Image, Category, Category_Product, Cart, User, Line_Order } = require('../db.js');
const {verificarToken} = require('../middleware/authentication.js');
const {userUploadImg} = require('./../middleware/uploadImage.js')
var nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport');

//Ruta post para crear un usuario
server.post('/create', (req, res)=>{
    const {first_name, last_name, password, email, rol, reset, ban} = req.body;
    let token;

    if (first_name && last_name && password  && email){
       rol ? 
            User.create({first_name, last_name, password: bcrypt.hashSync(password,10), email, rol, reset, ban})
            .then((user)=>{
                token = jwt.sign({
                    user
                }, 'ecommerce-ft06-g07' , { expiresIn: 60*60*24*30}) 
                return Cart.create({
                    state:'created',
                    userId: user.id
                })
            })
            .then((ans)=>{     
                res.status(201).send(token)
            })
            .catch((err)=>{
                res.status(500).send(err)
            })
        :
            User.create({first_name, last_name, password: bcrypt.hashSync(password,10), email, rol:'user',reset, ban})
        .then((user)=>{
            token = jwt.sign({
                user
            }, 'ecommerce-ft06-g07' , { expiresIn: 60*60*24*30}) 
            return Cart.create({
                state:'created',
                userId: user.id
            })
        })
        .then((ans)=>{
            res.status(201).send(token)
        })
        .catch((err)=>{
            res.status(500).send(err)
        })
    } else{
        res.status(400).send('Faltan campos para crear un usuario')
    }
})

//Ruta post para crear una orden de compra
server.post('/:idUser/cart', (req, res)=>{

    const {idUser} = req.params;
    const {productId, quantity, price} = req.body;
    
    if(productId && quantity && price){
        Cart.findOne({ where:{ userId : idUser }})
        .then(carrito=>{
            return Line_Order.Create({productId : productId , cartId : carrito.id, quantity : quantity , price : price})
        })
        .then(respuesta=> res.status(201).send(respuesta))
        
        .catch(err=> res.status(500).send(err))
        
   }else return res.status(400).send('Bad Request')
})

//Ruta put para modificar el usuario
server.put('/edit/:id', (req,res)=>{
    const {id} = req.params;
    const {first_name, last_name, email} = req.body;
    if( first_name && last_name && email ){
        User.update({
            first_name: first_name,
            last_name: last_name,
            email: email,
        },  {where: { id: id }})
        .then(result=> res.status(200).send('Usuario modificado'))
        .catch(()=> res.status(500).send('Usuario no encontrado'))
    }else{
        res.status(400).send('Faltan campos para modificar el usuario')
        }
    })
//Ruta put para modificar el pass

    server.put('/editPassword', (req,res)=>{
        //console.log(req.body)
        const { actual,nueva,nuevaVerify} = req.body.input;
        let email;
        let password;
        let token = req.headers.authorization.split(' ')[1];
        
        jwt.verify(token, 'ecommerce-ft06-g07', (err, decoded)=>{
           
        if(err){
             return res.status(401).send(err)
        }else{
            password =  decoded.user.password
            email = decoded.user.email
        }})
        if( actual && nueva && nuevaVerify ){
            if(bcrypt.compareSync(actual, password) && nueva === nuevaVerify){            
                User.update({
                   password: bcrypt.hashSync(nueva,10)
                },  {where: { email: email }})
                .then(result=> res.status(200).send('Usuario modificado'))
                .catch(()=> res.status(500).send('Usuario no encontrado'))
            }else{
                return res.status(400).send('error de contrasenais')
            }

        }else{
            return res.status(400).send('Faltan campos para modificar el usuario')         
        }
        })    

//Ruta get que trae todos los usuarios
server.get('/', (req,res)=>{
    User.findAll()
    .then(users => res.status(200).send(users)
     )
    .catch(()=>{
       res.status(400).send('Usuarios no disponibles')
    });
})

//Ruta Delete que borra un usuario por id
server.delete('/:id',  (req,res)=>{
    let {id} = req.params;
    User.findByPk(id)
        .then(user => {

            if(user){
                return User.destroy({where: {id:id}});
            } else {
                return res.status(400).json({error: 'No match'})
            }
        })
        .then((eliminado) => {
            res.status(200).send('El Usuario ' + id + ' ha sido eliminado')
        })
        .catch(error => res.status(500).send(error));
});

//peticion get para search un usuario por email
server.get('/search/:email',verificarToken, (req,res)=> {
	if(req.params.email){
        User.findOne({
            where: {email: req.params.email}
         })
	.then((usersFind)=>{
		res.send(usersFind)
	})
	.catch(err =>{send.status(500).send(err)})
}else{
	res.send(404)
}
})
    
server.post('/login', (req,res)=>{
 const {email, password} = req.body
 User.findOne({where: {email: email}})
 .then(user=>{   
    if(!user){
        return res.status(400).send('no se encuentra el email resigtrado. Ingrese a Registrarse')
    }   
    if(bcrypt.compareSync( password , user.password)){
        let token = jwt.sign({
            user
        }, 'ecommerce-ft06-g07' , { expiresIn: 60*60*24*30})
        if(user.reset) {
            return res.send({reset:true})
        }
        if(user.ban){
            return res.send({ban:true})
        }
        res.status(200).send(token)
    }else{
        res.status(400).send('contraseña incorrecta')
    }
})
})

//ruta para avisar que debe resetear el password
server.put('/:id/passwordReset', (req,res)=>{
    User.update({reset:"true"},{where: {id:req.params.id}})
    .then(users => res.status(200).send('debe modificar el password')
     )
    .catch(err=>res.status(500).send(err));
})

server.post('/resetLogin', (req,res)=>{
    console.log(req.body)
    const {email,password,newpass} = req.body
    let user;
    let token;
 User.findOne({where: {email: email}})
 .then(infoUser=>{   
    if(!infoUser){
        return res.status(400).send('no se encuentra el email resigtrado. Ingrese a Registrarse')
    }
    if(!bcrypt.compareSync( password , infoUser.password)) return res.send("contaseña incorrecta")  
    user = infoUser;
    return User.update({password: bcrypt.hashSync(newpass,10), reset: false}, {where: {email: email}})
    })
    .then(ans=>{
        token = jwt.sign({
            user
        }, 'ecommerce-ft06-g07' , { expiresIn: 60*60*24*30})
            return res.status(200).send(token)
        
    })
})

server.put('/:id/banneado', (req,res)=>{
    User.update({ban:"true"},{where: {id:req.params.id}})
    .then(users => res.status(200).send('Usuario Banneado')
     )
    .catch(err=>res.status(500).send(err));
})

server.put('/:id/desbanneado', (req,res)=>{
    User.update({ban:"false"},{where: {id:req.params.id}})
    .then(users => res.status(200).send('Usuario Desbanneado')
     )
    .catch(err=>res.status(500).send(err));
})

//pasa un usuario a administrador
server.put('/:id/toAdmin', (req,res)=>{
    User.findByPk(req.params.id)
    .then((ans) => {
        if(ans.rol==='user'){
            return User.update({rol:"admin"},{where: {id:req.params.id}})
            .then(() => res.status(200).send('Usuario es ahora Administrador'))
            .catch(err=>res.status(500).send(err));
        }
    })
    .catch(()=>res.status(400).send('Este usuario todavia no tiene cuenta'));
})

//ruta get que trae todos los datos del usuario logeado
server.get('/me/:userId', (req, res)=> {
    const {userId} = req.params

    let userPromise = User.findOne({where:{id : userId}, include:{model:Image}})

    .then(ans => res.send(ans))
    .catch(()=> res.sendStatus(500))
})


//ruta post para subir imagen de usuario
server.post('/me/:userId', userUploadImg, (req, res)=> {
    const {userId} = req.params
    const {file} = req
    Image.findAll({where: {userId: userId}})
    .then( ans => ans.length === 0 ?(
        
        Image.create({userId: userId, imgUrl:`/image/${file.filename}`})
        .then(() => User.findByPk(userId, {include:{model:Image}})))

        :(
       
        Image.update({imgUrl:`/image/${file.filename}`}, {where:{id: ans[0].dataValues.id}})
        .then(() => User.findByPk(userId, {include:{model:Image}})))

    )
    .then(ans =>  res.send(ans))
    .catch((e)=> res.sendStatus(e))
})

//pasa un usuario a administrador
server.put('/:id/toUser', (req,res)=>{
    User.findByPk(req.params.id)
    .then((ans) => {
        if(ans.rol==='admin'){
            return User.update({rol:"user"},{where: {id:req.params.id}})
            .then(() => res.status(200).send('El Administrador es ahora usuario'))
            .catch(err=>res.status(500).send(err));
        }
    })
    .catch(()=>res.status(400).send('Este usuario todavia no tiene cuenta'));
})

//restablecer contraseña a travez del email
server.post('/sendMailPass', (req,res)=>{
    User.findOne({where:{email:req.body.email}})
    .then(ans=>{
   
    let options = {
        auth: {
            api_key: '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'
        }
    }
    htmlContent = `<h2>Restablecer contraseña olvidada</h2>
            <div>
              <p>Si usted no pidio restablecer su contraseña, ingore este mensaje!</p>
              <a href='www.localhost:3000/ResetPassowordEmail?pass=${ans.password}' >ingrese a este link para restablecer su contraseña:</a>
              <p>www.localhost:3000/ResetPassowordEmail?pass=${ans.password}</p>
            </div>
          `; 

    let client = nodemailer.createTransport(sgTransport(options));

    let email = {
        from: 'bomba.ecommerce@gmail.com',
        to: req.body.email,
        subject: 'Restablecer contraseña',
        html: htmlContent
    };
    client.sendMail(email, function(err, info) {
        if (err){
            console.log(err);
        }
        else {
            console.log('Mensaje enviado: ' + info);
            res.send("email enviado")
        }
    });
    }).catch(err=> res.send(err))
})


server.put('/ResetPassowordEmail', (req,res)=>{
    const { pass, nueva,nuevaVerify} = req.body;
        if(  nueva && nuevaVerify ){
            if(nueva === nuevaVerify){            
                User.update({
                   password: bcrypt.hashSync(nueva,10)
                },  {where: { password: pass }})
                .then(result=>  res.status(200).send('Usuario modificado'))
                .catch(()=> res.status(500).send('Usuario no encontrado'))
            }else{
                return res.status(400).send('error de contrasenais')
            }
    
        }else{
            res.status(400).send('Faltan campos para modificar el usuario')         
        }
  
    })    



module.exports=server;


