const mongoose=require('mongoose');

const songSchema= new mongoose.Schema(
    {
         name:{
            type: String,
            required : true,
         },
         imageURL:{
            type: String,
            required : true,
         },
         songURL:{
            type: String,
            required : true,
         },
         artist:{
            type: String,
           
         },
         album:{
            type: String,
         },
         language:{
            type: String,
         },
    },
    {
        timestamps: true,
    }
)

const songModal= mongoose.model("song",songSchema);

module.exports=songModal;