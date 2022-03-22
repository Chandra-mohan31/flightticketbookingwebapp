const Tickets = require("../models/tickets");

const {check,validationResult} = require("express-validator");
const { isAdmin } = require("./auth");




 exports.createTicket = (req,res) => {
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }

     const ticket = new Tickets(req.body);
     ticket.save((err,ticket)=>{
        if(err){
            return res.status(400).json({
                err: "NOT able to save ticket in db"
            })
        }
        res.json({
            flightname: ticket.name,
            flightnum: ticket.flightnum,
            source: ticket.source,
            destination: ticket.destination,
            price: ticket.price,
            sold: ticket.price,
            date: ticket.date
        });
     });
 }

 exports.getTicketById = (req, res, next, id) => {
    Tickets.findById(id)
      
      .exec((err, ticket) => {
        if (err) {
          return res.status(400).json({
            error: "ticket not found in DB"
          });
        }
        req.ticket = ticket;
        next();
    });
  };
 
  
  
//  exports.getTicketDataById = (req, res, next, id) => {
//   Tickets.findById(id)
    
//     .exec((err, ticket) => {
//       if (err) {
//         return res.status(400).json({
//           error: "ticket not found in DB"
//         });
//       }
//       return res.json({
//         ticket: ticket
//       })
//   });
// };

  

 exports.getAllTickets = (req,res) =>{
     Tickets.find()
        .exec((err,tickets)=>{
            if(err){
                return res.status(400).json({
                    error:"no tickets found"
                })
            }
            res.json(tickets);
        })
     
 }

 exports.updateTicket=(req,res)=>{
    const ticket = req.ticket;
    ticket.name = req.body.name;
    ticket.sold = req.body.sold;
    ticket.date = req.body.date;
    ticket.flightnum = req.body.flightnum;
    ticket.source = req.body.source;
    ticket.destination = req.body.destination;
    ticket.price = req.body.price;
    ticket.stock = req.body.stock;
    
    ticket.save((err,updatedTicket)=>{
        if(err){
            res.status(400).json({
                error:"cant update ticket"
            });
        }
        return res.json(updatedTicket);
    })
}

 
   
    
  
  

 exports.deleteTicket = (req,res) =>{
    let ticket = req.ticket;
    ticket.remove((err,deletedTicket)=>{
      if(err){
        return res.status(400).json({
          err:"failed to delete ticket"
        })
      }
      res.json({
        message:"deleted successfully",
        deletedTicket
      })
    })
  }

