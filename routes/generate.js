const router=require("express").Router()
// const formMail=require('../../../middleware/genMail')
const formMail=require('../middleware/genMail')
const verify=require('../middleware/token')
const updateRem=require('../auth/update')

router.post('/mail',async(req,res)=>{
    console.log('Received generate request')
    console.log(Object.keys(req));
    console.log(req.body);
    const {email,chrome_id}=req.query
    if(!email || !chrome_id){
        console.log('Missing email or id');
        res.status(400).json({message:'missing value email or id'})
    }
    else{
        verify(req,res)
        let {prompt}=req.body

        if(prompt){
            console.log('prompt present');
            //check if a valid text here
            // let mailResult=await formMail(req,res,prompt)
            updateRem(req,res)
            formMail(req,res,prompt)


            
            // if(mailResult.error){
            //     res.status(500).json({message:'server error, please try again'})
            // }else{
            //     let content=mailResult.message.content
            //     res.status(200).json({mailResult:content})
            // }
    
        }else{
            console.log('Missing prompt');
            res.status(400).json({message:'invalid,missing prompt'})
        }

        // res.status(200).json({account_status:accountPresent})
    }
    
})



module.exports=router