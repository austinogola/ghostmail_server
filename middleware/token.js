const jwt=require('jsonwebtoken')
require('dotenv').config()

const verifyToken=(req,res,next)=>{
    const {email,chrome_id}=req.query
    const token=req.headers.authorization


    if(token){
        console.log('Token found');
        jwt.verify(token,process.env.jwtSecret,(err,user)=>{
            if(err){
                return res.status(401).json({message:"Not authorized"})
            }else{
                if(user.chrome_id!=chrome_id || user.email!=email){
                   return res.status(401).json({message:"Not authorized"})
                }else{
                    // next()
                }
            }
        })

    }
    else{
        console.log('Missing token');
        return res.status(401).json({message:'Not authorized. Missing token'})
    }
}

module.exports=verifyToken