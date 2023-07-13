const jwt = require('jsonwebtoken');



const auth = async(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
        try {
            const decoded = jwt.verify(token, 'masai');
            if(decoded){
                req.body.userID = decoded.userID
                next()
            }else{
                res.status(400).json({msg:"Invalid token"})
            }
        } catch (err) {
            res.status(400).json({error:err.message})
        }
    }else{
        res.status(400).json({msg:"Please Login!"})
    }
}

module.exports = {
    auth
}