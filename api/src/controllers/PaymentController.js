class PaymentController {
    constructor(paymentService) {
      this.paymentService = paymentService; 
    }
  
    async getMercadoPagoLink(req, res) {
        //const { name, price, unit, img } = req.body; 
        
        const {articles} = req.body; 
        console.log('body', articles)
        try {
          const checkout = await this.paymentService.createPaymentMercadoPago(
        /*     name, // nombre del producto o servicio
            price, //precio del producto o servicio
            unit,  //cantidad que estamos vendiendo
            img  // imagen de referencia del producto o servicio */
            articles
          );
    
         //return res.redirect(checkout.init_point); 
         //si es exitoso los llevamos a la url de Mercado Pago
    
          return res.json({url: checkout.init_point})
         // o si queres devolver la url al front 
    
    
        } catch (err) { 
    // si falla devolvemos un status 500
          return res.status(500).json({
            error: true,
            msg: "Hubo un error con Mercado Pago"
          });
        }
      }
  
      webhook(req, res) { 
          console.log('hook', req.query)
          let body;
        if (req.method === "POST") { 
           body = ""; 
          req.on("data", chunk => {  
            body += chunk.toString();
          });
          req.on("end", () => {  
            console.log(body, "webhook response"); 
            res.end("ok");
          });
        }

        console.log("BODY", body)
        return res.status(200); 
      }
  }
  
  module.exports = PaymentController;
