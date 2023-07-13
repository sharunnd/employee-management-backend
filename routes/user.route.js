const express = require("express")
const { UserModel } = require("../model/user.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRouter = express.Router()


userRouter.post("/signup",async(req,res)=>{
    const {email,password,firstName,lastName,confirmPassword} = req.body
    try {
        if(password===confirmPassword){
            
            bcrypt.hash(password, 5, async(err, hash)=> {
                if(err){
                     res.status(400).json({error:err.message})
                }else{
                    const user = new UserModel({email,password:hash,firstName,lastName})
                    await user.save()
                    res.status(200).json({msg:"User has been added"})
                }
            });
        }else{
           res.status(400).json({msg:"Please Confirm the Password"})
        }
    } catch (err) {
        res.status(400).json({error:err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if(result){
                    const token = jwt.sign({ userID:user._id  }, 'masai',{
                        expiresIn:"7d"
                    });
                    res.status(200).json({msg:"Login Successful",token})
                }else{
                    res.status(400).json({msg:"Wrong credentials!"})                    
                }
            });
        }else{
            res.status(400).json({msg:"User Not Found!"})                    
        }
        
    } catch (err) {
        res.status(400).json({error:err.message})
    }
})

userRouter.post("/logout",async(req,res)=>{
    
    try {
        res.status(200).json({msg:"Logout successful"})
    } catch (err) {
        res.status(400).json({error:err.message})
    }
})


module.exports = {
    userRouter
}