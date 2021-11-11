var express = require('express');
var router = express.Router();
const {User} = require('../db/models')
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/',async(req,res)=>{
  const {userAddress} = req.body;
  console.log(userAddress);
  try{
    const user = await User.find({userAddress})
    return res.json({ok:true,message:null,rows:user})
  }catch(err){
    console.log(err);
    return res.json({ok:false,message:err,rows:null})
  }
})

module.exports = router;
