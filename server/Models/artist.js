const mongoose=require('mongoose');

const artistSchema= mongoose.Schema(
    {
         name:{
            type: String,
            required : true,
         },
         imageURL:{
            type: String,
            required : true,
         },
         instagaram:{
            type: String,
         },
    },
    {
        timestamps: true,
    }
)

const artistModal= mongoose.model("artist",artistSchema);

module.exports=artistModal;