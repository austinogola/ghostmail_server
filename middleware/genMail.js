
const Configuration =require("openai").Configuration
const OpenAIApi=require("openai").OpenAIApi
require('dotenv').config()



const configuration = new Configuration({
    apiKey:process.env.openApiKey
});

const openai = new OpenAIApi(configuration)



const formMail=async(prompt)=>{

    return new Promise(async(resolve,reject)=>{
        
        let content= `Write an email ${prompt}`

        try{
            console.log('Attemting with prompt',content);

            // const req=https.request({
            //     hostname:'api.openai.com',
            //     path:'/v1/completions',
            //     method:'POST',
            //     headers:{
            //         "Content-Type":"application/json",
            //         "Authorization":"Bearer " + process.env.openApiKey
            //     }
            // },(res)=>{
            //     res.on('data',(chunk)=>{
            //         console.log('Body',chunk);
            //     })
            //     res.on('end',(chunk)=>{
            //         console.log('No more data in response');
            //     })
            // })

            // let result=[]

            let res=await openai.createChatCompletion({
                "model":'gpt-3.5-turbo',
                "messages":[
                    {"role": "user", "content": content}
                ],
                "stream":true
            },{responseType:'stream'})

            res.data.on('data', async data=>{
                const lines=data.toString().split('\n').filter(line=>line.trim()!=='')
                
                for(const line of lines ){
                    const msg=line.replace(/^data: /,'')
                    if(msg=='[DONE]'){
                        console.log('Stream finished');
                    }
                    else{

                        let parsed=JSON.parse(msg)
                        let delta=await parsed.choices[0].delta

                        if(delta.content){
                            let text=delta.content
                            console.log(text);
                        }

                        // console.log(parsed.choices[0].text);
                    }
                }
            })
            // res.data.on('data',console.log)
            

            // for await(const event of streamCompletion(res.data)){
            //     let event_text = JSON.parse(event)
            //     let data=event_text.choices[0]
            //     console.log(data);
            // }

            
            // let res=await openai.createChatCompletion({
            //     "model":'gpt-3.5-turbo',
            //     "messages":[
            //         {"role": "user", "content": content}
            //     ]
            // })
    
            // if(res.status==200){
            //     // let data=res.data

            //     console.log('gen text successfully');
            //     let infoN= res.data.choices[0]

            //     resolve(infoN)
            // }
            // else{
            //     console.log('Error fetching gen text');
            //     resolve({error:'Error resolving prompt'})
            // }
        }
        catch(err){
            console.log(err);
        }
    })

    
}

// [ 'status', 'statusText', 'headers', 'config', 'request', 'data' ]
// [ 'id', 'object', 'created', 'model', 'usage', 'choices' ]

module.exports=formMail