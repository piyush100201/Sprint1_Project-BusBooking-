const express = require('express')

//importing 
const app=express();
const userRoute = express.Router();
const jwtHelper = require('../config/jwtHelper');
const passport = require('passport');
const _ = require('lodash');

//User module which is required and imported
let userModel = require('../Models/User');

//To get list of all users(only for admin)
userRoute.route('/getAllUsers').get(function(req,res){
    userModel.find(function(err,user){
        if(err){
            console.log(err);
        } 
        else{
            res.json(user);
        }
    });
});

//To add new user
userRoute.route('/addUser').post(function(req,res){
    let user =new userModel(req.body);
    user.save()
             .then(result=>{
               
                  res.status(200).json({'user' : 'User added successfully'}) 

             })
             .catch(err=>{
                res.status(400).send("Something went wrong")
             });
});

//To get user details by id
userRoute.route('/getUser/:id').get(function(req,res){
    let id=req.params.id;
    userModel.findById(id,function(err,user){
        res.json(user);
    });
});

//To update the user details
userRoute.route('/updateUser/:id').put(function(req,res){
    userModel.findById(req.params.id,function(err,user){
       if(!user){
        return next(new Error('Unable to find user with thisid'))
       }else{
         user.userName=req.body.userName; 
         user.email=req.body.email;
         user.phoneNumber=req.body.phoneNumber;
         user.gender=req.body.gender;
         user.dateOfBirth=req.body.dateOfBirth;
         user.password=req.body.password;
        //  user.role=req.body.role;
         user.save().then(cus=>{
            res.json("User updated successfully");
         }).catch(err=>{
              res.status(400).send("Unable to update user");
            })
       }

    });
});

//deleting user
userRoute.route('/deleteUser/:id').delete(function(req,res){
    userModel.findByIdAndRemove({_id:req.params.id},function(err,user){
        if(err){
            res.json(err)
        }else{
            res.json("User deleted successfully");
        }
    })
})

//authentication
var authenticate = (req,res,next)=>{
    passport.authenticate('local', (err, user, info)=>{
        if(err){
            return res.status(400).json(err);
        }
        else if(user){
            const token=user.generateJwt();

            return res.status(200).json(user);
        }
        else{
            return res.status(404).json(info);
        }
    })(req,res);
}
userRoute.post('/authenticate', authenticate)





module.exports = userRoute;
