const router= require('express').Router();
const song=require('../../Models/song');

router.get('/getAll',(req,res) => {
    return res.json({status:'song'})
    }
    )
    
router.post('/add',async (req,res) => {
        const songData = song({
            name:req.body.name,
            imageURL:req.body.imageURL,
            songURL:req.body.songURL,
            artist:req.body.artist
        });
    
        try {
            const saveData=await songData.save();
            return res.json({status:'true',saveData});
        } catch (error) {
            return res.json({status:'false',error});
        }
    })

    router.get('/getOne/:_id', async (req,res) => {
        const getSong =await song.findOne({_id:req.params._id});
    
        try {
          return res.json({status:'true',getSong});
        } catch (error) {
          return res.json({status:'false',error});
        }
      })

      router.get('/getAllSong', async (req,res) => {
        const allsong =await song.find().sort({createdAt:-1});
    
        try {
          return res.json({status:'true',allsong});
        } catch (error) {
          return res.json({status:'false',error});
        }
      });    


      router.put('/update/:_id', async (req,res) => {
    

        const updatedData= await song.findOneAndUpdate(
            {
                _id:req.params._id
            },
            {
                name:req.body.name,
                imageURL:req.body.imageURL,
                songURL:req.body.songURL,
                artist:req.body.artist,
                album:req.body.album,
                language:req.body.language
            },
            {
                new:true
            }
        );
    
        try {
            return res.send(updatedData);
        } catch (error) {
            return res.json({status:'false',error:error.message});
        }
    })
    
    router.delete('/delete/:_id',async (req,res) =>
{       
    const {name}= await song.findById({_id:req.params._id});
    await song.findByIdAndDelete({_id:req.params._id});
    try {
        return res.send(`${name} got deleted`);
    } catch (error) {
        return res.json({status:'false',error});
    }
})

    module.exports=router;