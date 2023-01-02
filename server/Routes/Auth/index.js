const router= require('express').Router();
const admin=require('../../config/firebase.config');

const user=require('../../Models/user');

router.get('/login',async (req,res) =>
 {
   if(!req.headers.authorization)
    return res.status(505).send({Status:'Invalid'});
   
   // Extracting token
   const token=req.headers.authorization.split(" ")[1];
   
   try {
      // checking token by admin
      const decodeValue= await admin.auth().verifyIdToken(token);
      if(!decodeValue)
      return res.status(505).json({Status:error.message});
      else{
         
         // User Exist
         const userExist=await user.findOne({user_id:decodeValue.user_id});
         
         if(!userExist)
         {
            userCreateFn(decodeValue,req,res);
         }
         
         else
         {
             userUpadateFn(decodeValue,req,res);
         }
        
      }
   } catch (error) {
      return res.status(505).json({Status:error.message});
   }
 })

 const userCreateFn = async(decodeValue,req,res) =>{
   try {
      const userData = new user({
         name:decodeValue.name,
         email:decodeValue.email,
         imageURL:decodeValue.picture,
         user_id:decodeValue.user_id,
         email_verified:decodeValue.email_verified,
         role:"member",
         auth_time:decodeValue.auth_time,
      });

      const saveUser= await userData.save();
      return res.status(200).json(saveUser);
      
   } catch (error) {
      return res.status(500).json({Error:error.message});
   }
 }

 const userUpadateFn = async (decodeValue,req,res) => {
   

   try {
   const filter={user_id:decodeValue.user_id}
   const update={auth_time:decodeValue.auth_time}
   const options={new:true,upsert:true}
      const updatedData= await user.findOneAndUpdate(filter,update,options);
      return res.status(200).send(updatedData);
   } catch (error) {
      return res.status(500).json({Error:error.message});
   }
 }

 router.get('/getAll',async (req,res) => {
   const getAllUsers= await user.find().sort({createdAt:-1});

   try {
      return res.send({status:'true',getAllUsers});
   } catch (error) {
      return res.send(error);
   }
 })

 router.put('/updateRole/:_id', async (req,res) => {
   const {_id}=req.params;
   const role=req.body.role;

   try {
      const data= await user.findByIdAndUpdate(
         {
            _id:_id
         },
         {
            role:role
         },
         {
            new:true
         }
         
      )
      return res.status(200).send({status:true,data});
   } catch (error) {
      return res.status(200).send({status:false});
   }
 })

 router.delete('/delete/:_id',async (req,res) => {
   const {_id}=req.params
   try {
      const data = await user.findByIdAndDelete({_id});
      return res.status(200).send({status:true,data});
   } catch (error) {
      return res.status(500).send({status:false});
   }
 })

module.exports=router;