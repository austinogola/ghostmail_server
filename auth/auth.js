const Account=require('../model/account')
const jwt=require('jsonwebtoken')
require('dotenv').config()

const register=async(req,res,next)=>{
    return new Promise((resolve,reject)=>{
        const {email,chrome_id}=req.query
        try{
            Account.create({
                email,
                chrome_id,
                remaining_today:10
            })
            .then(account=>{
                const maxAge = 3 * 60 * 60;
                const {chrome_id,email}=account

                const token=jwt.sign(
                    {chrome_id,email},
                    process.env.jwtSecret,
                    {
                        expiresIn:maxAge
                    }
                )
                // res.cookie('ghostToken',token,{
                //     httpOnly:true,
                //     maxAge:maxAge*1000
                // })
                res.status(200).json({
                    message:'account successfully added',
                    account,
                    ghostToken:token
                })
            })
        }
        catch(err){
            res.status(401).json({
                message: "User not successfully created",
                error: err.message,
              })
        }
    })
    
}

const login=async(req,res,next)=>{
    const {email,chrome_id}=req.query

    try{

        const maxAge = 3 * 60 * 60;

        const token=await jwt.sign(
            {chrome_id,email},
            process.env.jwtSecret,
            {
                expiresIn:maxAge
            }
        )

        // res.cookie('ghostToken',token,{
        //     httpOnly:true,
        //     maxAge:maxAge*1000
        // })
        res.status(200).json({
            massage:'User successfully logged in',
            user:{email,chrome_id},
            ghostToken:token
        })

    }
    catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}

const check=async(email,chrome_id)=>{
    return new Promise(async(resolve,reject)=>{
        const em_acnt=await Account.findOne({email})
        const id_acnt=await Account.findOne({chrome_id})

        if(em_acnt,id_acnt){
            console.log('Both email and id found')
            resolve (true)
        }
        else{
            resolve (false)
        }
    })
    
}

const checkUsage=async(req,res)=>{
    const {email,chrome_id}=req.query

    try{
        Account.findOne({email,chrome_id})
        .then(resp=>{
            if(resp.is_paid){
                res.status(200).json({
                    type:'paying user',
                    allow:true
                })
            }
            else{
                let rema=resp.remaining_today
                if(rema>0){
                    res.status(200).json({
                        type:'free user',
                        allow:true,
                        to_remain:rema-1
                    })
                }
                else{
                    res.status(200).json({
                        type:'free user',
                        allow:false,
                        to_remain:rema-1
                    })
                }
                
            }
           

        })
        .catch(err=>{
            res.status(400).json({
                message:'error verifying user stats',
                error:err.message
            })
        })

        // acc.exec((err,account)=>{
        //     if(err){
        //         if(err){
        //             console.log("error: " + err);
        //             res.status(400).json({
        //                 message:'error verifying user stats',
        //                 error:err.message
        //             })
        //         }
        //         else{
        //             if(account){
        //                 res.status(200).json({
        //                     message:'user found',
        //                     user:account
        //                 })
        //             }
        //         }
        //     }
        // })
    }
    catch(err){
        res.status(400).json({
            message:'error verifying user stats',
            error:err.message
        })
    }
}




module.exports={register,check,login,checkUsage}