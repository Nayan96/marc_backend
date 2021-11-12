require("dotenv").config();
var express = require("express");
var router = express.Router();
const Web3 = require("web3");

const {
  tokenContractAddress,
  abi
} = require("../db/data");

const {QuestionAnswers, Chapter, Question, User, UserChapter, ChapterQuestions, Option } = require("../db/models");

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

const checkUserOwning = async (chapters, user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = new Web3(process.env.ETHERUM_PROVIDER);
        let contract = await new web3.eth.Contract(abi, tokenContractAddress);
        for await (const chapter of chapters){
          const chapterToken = chapter.token;
          const userTokenAddress = user.userAddress;
          const balance = await contract.methods
            .balanceOf(userTokenAddress, chapterToken)
            .call();
          const owned = balance > 0 ? true : false;
          const exists = await UserChapter.exists({
            user: user.id,
            chapter: chapter.id,
          });
          if (exists) {
            await UserChapter.findOneAndUpdate({user:user.id,chapter:chapter.id},{owned,count:balance});
          } else {
            const userChapter = new UserChapter({
              user: user.id,
              chapter: chapter.id,
              owned,
            });
            await userChapter.save();
          }
        }
        return resolve();
      } catch (err) {
        return reject(err);
      }
    });
  };
  

router.post("/", async (req, res) => {
  const { userAddress } = req.body;
  try {
    const user = await getUser(userAddress);
    const chapters = await Chapter.find({});
    await checkUserOwning(chapters, user);
    const result_userChapters = await UserChapter.find({
      userId: user.id,
    }).populate('chapter', null, null, { sort: { 'title': -1 } })
    return res.json({ ok: true, rows:result_userChapters, message: null });
  } catch (err) {
    console.log(err);
    return res.json({ ok: false, rows: [], message: err });
  }
});

router.post('/:id/questions',async(req,res)=>{
  try{
    const chapterId = req.params.id;
    const {userId} = req.body;
    const user = await User.findById(userId);
    const userChapter = await UserChapter.find({user:userId,chapter:chapterId});
    console.log(userChapter);
    const chapter = await Chapter.findById(chapterId);
    const questions = await ChapterQuestions.find({
      chapter:chapterId,
      user:userId,
    }).
    populate(
      {
        path:'questions',
        model:QuestionAnswers,
        populate:[
          {
            path:'question',
            model:Question
          },
          {
            path:'options',
            model:Option
          },
          {
            path:'userResponse',
            model:Option,
          }
        ]
      }
    )

    if(questions.length===0){
        const questions = await Question.find({}).populate({
          path:'options',
          model:Option
        })
        let _questions = [];
        for await ( const question of questions){
          const options = question.options.map(q=>q.id);
          console.log(options);
          const questionAnswer = new QuestionAnswers({
            question:question.id,
            options
          });
          await questionAnswer.save();
          _questions.push(questionAnswer);
        }
        const chapterQuestion = new ChapterQuestions({
          user:user.id,
          chapter:chapter.id,
          questions:_questions
        })
        await chapterQuestion.save();
        const db_questions = await ChapterQuestions.find({
          chapter:chapterId,
          user:userId,
        })
        .
        populate(
          {
            path:'questions',
            model:QuestionAnswers,
            populate:[
              {
                path:'question',
                model:Question
              },
              {
                path:'options',
                model:Option
              },
              {
                path:'userResponse',
                model:Option,
              }
            ]
          }
        )
        return res.json({ok:true,rows:[...db_questions],message:null});
    }
    return res.json({ok:true,rows:questions,message:null});
  }catch(err){  
    console.log(err);
    return res.json({ok:false,message:err,rows:[]});
  }
}) 



module.exports = router;
