const router = require("express").Router()
const auth=require('../auth/auth')
const registerAcc=auth.register
const checkAcc=auth.check
const loginAcc=auth.login
const verify=require('../middleware/token')
const checkUsage=auth.checkUsage

router.get('/init',async(req,res)=>{
    const {email,chrome_id}=req.query

    if(!email || !chrome_id){
        res.status(400).json({message:'missing value email or id'})
    }
    else{
        let accountPresent=await checkAcc(email,chrome_id)
        if(accountPresent){
            loginAcc(req,res)
        }else{
            registerAcc(req,res)
        }
        // res.status(200).json({account_status:accountPresent})
    }
})

router.get('/verify',verify,async(req,res)=>{
    checkUsage(req,res)
})


module.exports=router