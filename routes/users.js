var express = require('express');
var router = express.Router();
const {User} = require('../db/models')
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/',async(req,res)=>{
  const {userAddress} = req.body;
  try{
    if(await User.exists({userAddress})){
      const user = await User.find({userAddress})
      return res.json({ok:true,message:null,rows:user})
    }else{
      const user = await User.create({userAddress});
      return res.json({ok:true,message:null,rows:user})
    }
    
  }catch(err){
    console.log(err);
    return res.json({ok:false,message:err,rows:null})
  }
})

module.exports = router;
