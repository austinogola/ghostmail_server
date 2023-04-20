const Account=require('../model/account')
const jwt=require('jsonwebtoken')
const verify=require('../middleware/token')
require('dotenv').config()

const updateRem=async(req,res)=>{
    console.log('Updating now')
    const {email,chrome_id}=req.query
    let {prompt}=req.body
    verify(req,res)

    const em_acnt=await Account.findOne({email})
    console.log("The account",em_acnt)
    let remaining=em_acnt.remaining_today-1
    const update={remaining_today:remaining}

    let doc = await Account.findOneAndUpdate({email}, update);
}

module.exports=updateRem