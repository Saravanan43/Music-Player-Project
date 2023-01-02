const router= require('express').Router();
const album= require('../../Models/album');

router.get('/getAll',(req,res) => {
 return res.json({status:'album'})
 }
 )

 router.post('/add',async (req,res) => {
    const albumData = album({
        name:req.body.name,
        imageURL:req.body.imageURL
    });

    try {
        const saveData=await albumData.save();
        return res.json({status:'true',saveData});
    } catch (error) {
        return res.json({status:'false',error});
    }
})


router.get('/getOne/:_id', async (req,res) => {
    const getAlbum =await album.findOne({_id:req.params._id});

    try {
      return res.json({status:'true',getAlbum});
    } catch (error) {
      return res.json({status:'false',error});
    }
  })

  router.get('/getAllAlbum', async (req,res) => {
    const allAlbum =await album.find().sort({createdAt:-1});

    try {
      return res.json({status:'true',allAlbum});
    } catch (error) {
      return res.json({status:'false',error});
    }
  });  

  router.put('/update/:_id', async (req,res) => {
    

    const updatedData= await album.findOneAndUpdate(
        {
            _id:req.params._id
        },
        {
            name:req.body.name,
            imageURL:req.body.imageURL,
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
    const {name}= await album.findById({_id:req.params._id});
    await album.findByIdAndDelete({_id:req.params._id});
    try {
        return res.send(`${name} got deleted`);
    } catch (error) {
        return res.json({status:'false',error});
    }
})

 module.exports=router;