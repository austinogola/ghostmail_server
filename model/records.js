const mongoose=require('mongoose')

const RecordSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },

    is_paid:{
        type:Boolean,
        default:false
    },
    name:{
        type:String,
    },
    title:{
        type:String
    },
    useName:{
        type:Boolean
    },
    useTitle:{
        type:Boolean
    },
    remaining:{
        type:Map,
        of:Number
        default:300
    },
    history:{
        type:Map,
        of:Number
    }
    
})

const Record=mongoose.model('Record',RecordSchema)

module.exports=Record