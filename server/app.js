require('dotenv/config')
const express= require('express');
const app= express();

const cors= require('cors');
app.use(cors({origin:true}));

//json
app.use(express.json());

const { default: mongoose } = require('mongoose');

// Routes
 const auth=require('./Routes/Auth/index');
 app.use('/api/user',auth);

 const artist=require('./Routes/Artist/index');
 app.use('/api/artist',artist);

 const album=require('./Routes/Album/index');
 app.use('/api/album',album);

 const song=require('./Routes/Song');
const { json } = require('express');
 app.use('/api/song',song);




app.get('/',(req,res) =>{
    return res.json({Status:'Working'})
}
);

mongoose.connect(process.env.DB_STRING,
    {
        useNewUrlParser: true
    }
    )
    .then((msg) => console.log('DB Working'))
    .catch((err) => console.log(`Error`))


app.listen(process.env.PORT || 4000,()=> console.log('Running'));