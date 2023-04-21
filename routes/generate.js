const router=require("express").Router()
// const formMail=require('../../../middleware/genMail')
const formMail=require('../middleware/genMail')
const verify=require('../middleware/token')
const updateRem=require('../auth/update')

router.post('/mail',verify,async(req,res)=>{
    console.log('Received generate request')
    
    const {email,chrome_id}=req.query
    if(!email || !chrome_id){
        console.log('Missing email or id');
        res.status(400).json({message:'missing value email or id'})
    }
    else{
        let {prompt}=req.body
        if(prompt){
            updateRem(req,res)
            formMail(req,res,prompt)
        }else{
            console.log('Missing prompt');
            res.status(400).json({message:'invalid,missing prompt'})
        }  
        // res.status(200).json({account_status:accountPresent})
    }
    
})



module.exports=router