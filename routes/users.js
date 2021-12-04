var express = require('express');
var router = express.Router();
const {User} = require('../db/models')
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/',async(req,res)=>{
  const {userAddress} = req.body;
  try{
    const user = await getUser(userAddress);
    return res.json({ok:true,message:null,rows:user})
  }catch(err){
    return res.json({ok:false,message:err,rows:null})
  }
})


const getUser = async (userAddress) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ userAddress });
      if (user) {
        return resolve(user);
      } else {
        const _user = new User({ userAddress });
        await _user.save();
        return resolve(_user);
      }
    } catch (err) {
      reject(err);
    }
  });
};


module.exports = router;
