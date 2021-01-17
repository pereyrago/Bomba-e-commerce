const server = require('express').Router();
const Sequelize = require('sequelize');
var nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport');
const { User} = require('../db.js');

server.post('/adminMail', (req, res)=>{
var dato
    const {mail, name, texto}= req.body

    User.findAll({where: {rol: "admin"}})
    .then(ans => {
        dato = ans.map(rta => (rta.email))
        
    })
    

    .then(()=>{
        
        let options = {
            auth: {
                api_key: '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'
            }
        }
        
        htmlContent = `<h2>Nueva Consulta</h2>
                <div>
                  <p> Remitente : ${mail} </p>
                  <p>Nombre completo: ${name} </p> 
                  <p>Mensaje: ${texto} </p> 
                  
                </div>
              `; 

        let client = nodemailer.createTransport(sgTransport(options));

                    


        let email = {
            from: "bomba.ecommerce@gmail.com",
            to: `bomba.ecommerce@gmail.com, ${dato.map(data => data)}` ,
            subject: 'Nueva consulta',
            html: htmlContent
        };

        console.log("mail", email.to)
        client.sendMail(email, function(err, info) {

            if (err){
                console.log(err);
            }
            else {
                console.log('Mensaje enviado: ' + info);
                res.send("Su mensaje ha sido enviado")
            }
        });
        
    })
    
     
    .catch(err => res.send(err))
})

module.exports=server