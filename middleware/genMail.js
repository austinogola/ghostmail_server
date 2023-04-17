
const Configuration =require("openai").Configuration
const OpenAIApi=require("openai").OpenAIApi


const configuration = new Configuration({
    apiKey: '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'
});

const openai = new OpenAIApi(configuration)



const formMail=async(prompt)=>{

    return new Promise(async(resolve,reject)=>{
        
        let content= `Write an email ${prompt}`

        try{
            console.log('Attemting with prompt',content);
            let res=await openai.createChatCompletion({
                "model":'gpt-3.5-turbo',
                "messages":[
                    {"role": "user", "content": content}
                ]
            })
    
            if(res.status==200){
                // let data=res.data

                console.log('gen text successfully');
                let infoN= res.data.choices[0]

                resolve(infoN)
            }
            else{
                console.log('Error fetching gen text');
                resolve({error:'Error resolving prompt'})
            }
        }
        catch(err){
            console.log(err);
        }
    })

    
}

// [ 'status', 'statusText', 'headers', 'config', 'request', 'data' ]
// [ 'id', 'object', 'created', 'model', 'usage', 'choices' ]

module.exports=formMail