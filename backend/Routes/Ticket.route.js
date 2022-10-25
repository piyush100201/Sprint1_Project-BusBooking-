const express = require('express')

//importing 
const app=express();
const ticketRoute = express.Router();

//ticket module which is required and imported
let ticketModel = require('../Models/Ticket');

//To get list of tickets
ticketRoute.route('/getAllTickets').get(function(req,res){
    ticketModel.find(function(err,ticket){
        if(err){
            console.log(err);
        } 
        else{
            res.json(ticket);
        }
    });
});
// 
//To add new ticket
ticketRoute.route('/addTicket').post(function(req,res){
    let ticket =new ticketModel(req.body);
    ticket.save()
             .then(result=>{
               
                  res.status(200).json({data : result}) 

             })
             .catch(err=>{
                res.status(400).send("Something went wrong")
             });
});

//To get ticket details by id
ticketRoute.route('/getTicket/:id').get(function(req,res){
    let id = req.params.id;
    // ticketModel.findById(id,function(err,ticket){
    //     res.json(ticket);
    // });
    ticketModel
        .findOne({
            _id: id
        })
        .populate("userId", '-password')
        .populate("busId")// key to populate
        .then(ticket => {
            res.json(ticket);
        });
});

//To update the ticket details
ticketRoute.route('/updateTicket/:id').post(function(req,res){
    ticketModel.findById(req.params.id,function(err,ticket){
       if(!ticket){
        return next(new Error('Unable to find ticket with thisid'))
       }else{
         
         ticket.userId=req.body.userId; 
         ticket.busId=req.body.busId;
        
         ticket.save().then(cus=>{
            res.json("ticket updated successfully");
         }).catch(err=>{
              res.status(400).send("Unable to update ticket");
            })
       }

    });
});

//deleting ticket(only for admin)
ticketRoute.route('/deleteTicket/:id').delete(function(req,res){
    ticketModel.findByIdAndRemove({_id:req.params.id},function(err,ticket){
        if(err){
            res.json(err)
        }else{
            res.json("Ticket deleted successfully");
        }
    })
})


module.exports = ticketRoute;