const express = require("express")

const jwt = require('jsonwebtoken');
const { auth } = require("../middlewares/auth.middleware");
const { EmployeeModel } = require("../model/employee.model");
const employeeRouter = express.Router()


employeeRouter.post("/add",auth,async(req,res)=>{
    const {email,firstName,lastName} = req.body
 
    try { 
        const employee = new EmployeeModel(req.body)
        await employee.save()
        res.status(200).json({msg:"Employee has been added"})
    } catch (err) {
        res.status(400).json({error:err.message})
    }
})

employeeRouter.get("/",auth,async(req,res)=>{
    const {firstName,page,salary,sortBy,order,department,limit} = req.query;
    let query={};
    let sort={};
    let skip=0;
    try {
        if(firstName){
            query.firstName = {$regex:firstName,$options:"i"};
        } 
        if(sort){
            if(order=="asc"){
                sort[`${sortBy}`] = 1
            }else if(order=="desc"){
                sort[`${sortBy}`] = -1
            }
        }
        if(department){
            query.department = department
        }
        if(page){
            skip = limit * (page - 1)
        }
        const employee = await EmployeeModel.find(query).sort(sort).limit(limit).skip(skip)
        res.status(200).json(employee)
    } catch (err) {
        res.status(400).json({error:err.message})
    }
})

employeeRouter.patch("/update/:empId",auth,async(req,res)=>{
    const {empId} = req.params;
 
    try { 
        
        const employee =await EmployeeModel.findOne({_id:empId})
        if(employee){
            await EmployeeModel.findByIdAndUpdate({_id:empId},req.body)
            res.status(200).json({msg:"Employee has been updated"})
        }
    } catch (err) {
        res.status(400).json({error:err.message})
    }
})

employeeRouter.delete("/delete/:empId",auth,async(req,res)=>{
    const {empId} = req.params;
 
    try { 
        
        const employee =await EmployeeModel.findOne({_id:empId})
        if(employee){
            await EmployeeModel.findByIdAndDelete({_id:empId})
            res.status(200).json({msg:"Employee has been deleted"})
        }
    } catch (err) {
        res.status(400).json({error:err.message})
    }
})


module.exports = {
    employeeRouter
}