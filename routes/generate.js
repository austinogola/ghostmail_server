const router=require("express").Router()
// const formMail=require('../../../middleware/genMail')
const formMail=require('../middleware/genMail')

router.post('/mail',async(req,res)=>{
    console.log('Received generate request')
    let {prompt}=req.body
    if(prompt){
        console.log('prompt present');
        //check if a valid text here
        let mailResult=await formMail(prompt)
        if(mailResult.error){
            res.status(500).json({message:'server error, please try again'})
        }else{
            let content=mailResult.message.content
            res.status(200).json({mailResult:content})
        }

    }else{
        res.status(400).json({message:'invalid,missing prompt'})
    }
})



module.exports=router