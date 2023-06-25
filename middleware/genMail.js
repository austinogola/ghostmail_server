
const Configuration =require("openai").Configuration
const OpenAIApi=require("openai").OpenAIApi
require('dotenv').config()
const fs = require('fs');
var Readable = require('stream').Readable


const configuration = new Configuration({
    apiKey:process.env.openApiKey
});

const openai = new OpenAIApi(configuration)



const formMail=async(req,res,prompt)=>{

    // return new Promise(async(resolve,reject)=>{
        
        let content= `Write an email ${prompt}`

        let lan='en'

        try{
            console.log('Attempting with prompt',content);

            let resp

            try {
                resp=await openai.createChatCompletion({
                    "model":'gpt-3.5-turbo',
                    "messages":[
                        {"role": "user", "content": content}
                    ],
                    "stream":true
                },{responseType:'stream'})
                
            } catch (error) {
                console.log('Error generating');
            }

            console.log(resp.status);

            resp.data.on('data', async data=>{
                const lines=data.toString().split('\n').filter(line=>line.trim()!=='')
                
                for(const line of lines ){
                    const msg=line.replace(/^data: /,'')
                    if(msg=='[DONE]'){
                        res.write('STREAM COMPLETELEY FINISHED','utf8')
                        console.log('Stream Completelely finished');
                    }
                    else{
                        let parsed=JSON.parse(msg)
                        let delta=await parsed.choices[0].delta

                        if(delta.content){
                            let text=delta.content
                            res.write(text,'utf8')
                        }

                        // console.log(parsed.choices[0].text);
                    }
                }
            })
        }
        catch(err){
            console.log(err.message);
            console.log(Object.keys(err))
            // console.log(err.response)
        }
    // })

    
}

// [ 'status', 'statusText', 'headers', 'config', 'request', 'data' ]
// [ 'id', 'object', 'created', 'model', 'usage', 'choices' ]

module.exports=formMail