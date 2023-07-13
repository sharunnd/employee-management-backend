const express = require("express")
const { connectDB } = require("./db")
const { userRouter } = require("./routes/user.route")
const { employeeRouter } = require("./routes/employee.routes")
const app = express()
require("dotenv").config()


app.use(express.json())
app.use("/users",userRouter)
app.use("/employees",employeeRouter) 
  
connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        try {
            console.log(`Server running at ${process.env.PORT}`);
        } catch (error) {
            console.log(error.message);
            console.log("something went wrong");
        }
    })
})