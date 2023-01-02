const router= require('express').Router();
const artist= require('../../Models/artist');
    router.get('/getAll',async(req,res) => {
    return res.json({status:'artist'})
    }
    )

    router.post('/add',async (req,res) => {
        const artistData = artist({
            name:req.body.name,
            imageURL:req.body.imageURL,
            instagaram:req.body.instagaram
        });

        try {
            const saveData=await artistData.save();
            return res.json({status:'true',saveData});
        } catch (error) {
            return res.json({status:'false',error});
        }
    })

    router.get('/getOne/:_id', async (req,res) => {
      const getArtist =await artist.findOne({_id:req.params._id});

      try {
        return res.json({status:'true',getArtist});
      } catch (error) {
        return res.json({status:'false',error});
      }
    })
   
    router.get('/getAllArtist', async (req,res) => {
      const allArtist =await artist.find().sort({createdAt:-1});

      try {
        return res.json({status:'true',allArtist});
      } catch (error) {
        return res.json({status:'false',error});
      }
    });


    router.put('/update/:_id', async (req,res) => {
    

        const updatedData= await artist.findOneAndUpdate(
            {
                _id:req.params._id
            },
            {
                name:req.body.name,
                imageURL:req.body.imageURL,
                instagaram:req.body.instagaram,
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
        const {name}= await artist.findById({_id:req.params._id});
        await artist.findByIdAndDelete({_id:req.params._id});
        try {
            
            return res.send(`${name} got deleted`);
        } catch (error) {
            return res.json({status:'false',error});
        }
    })
    module.exports=router;