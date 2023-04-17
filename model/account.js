const mongoose=require('mongoose')

const AccountSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    chrome_id:{
        required:true,
        type:String
    },
    is_paid:{
        type:Boolean,
        default:false
    },
    remaining_today:{
        type:Number,
        dafault:10
    }
    
})

const Account=mongoose.model('Account',AccountSchema)

module.exports=Account