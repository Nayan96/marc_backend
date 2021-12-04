require("dotenv").config();
var express = require("express");
var router = express.Router();
const nodemailer = require('nodemailer');
const { Chapters, QuestionsList } = require("../db/data");
const {
  Chapter,
  Question,
  Option,
  ChapterQuestions,
  QuestionAnswers,
  UserChapter,
  User,
} = require("../db/models");
const { OptionList } = require("../db/option");


router.post("/seed_options", async (req, res) => {
  try {
    const options = OptionList;
    // await Option.insertMany(options);
    for await (const _option of options) {
      const exits = await Option.exists({ value: _option.value });
      if (!exits) {
        await Option.create(_option);
      }
    }
    return res.json({ ok: true, rows: "options seeded", message: null });
  } catch (err) {
    return res.json({ ok: false, rows: [], message: err });
  }
});

router.post("/seed_chapters", async (req, res) => {
  try {
    for await (const chapter of Chapters){
      const {title} = chapter;
        if((!(await Chapter.exists({title:chapter.title}))) && title.split(":")[1].includes("Chapter") ){ 
          await Chapter.create(chapter);
        }
    }
    return res.json({ ok: true, message: null, rows: [] });
  } catch (err) {
    return res.json({ ok: false, message: err, rows: [] });
  }
});

router.post("/seed_questions", async (req, res) => {
  try {
    for await (const question of QuestionsList) {
      const exists = await Question.exists({ question: question.question });
      if (!exists) {
      ``
        const db_answer = await Option.findOne({ value: question.answer });
        let db_question = new Question({
          question: question.question,
          answer: db_answer.id,
        });
        await db_question.save();
      }
    }
    return res.json({ ok: true, message: null, rows: [] });
  } catch (err) {
    return res.json({ ok: false, message: err, rows: [] });
  }
});

router.get("/options" , async(req, res) => {
try {
  const options = await Option.find({});

  return res.json({ ok: true, rows: options, message: null });
} catch (err) {
  return res.json({ ok: false, rows: [], message: err });
}
});

router.post("/submit_answer", async (req, res) => {
  try {
    const { chapter, user } = req.body.data;
    const { user: userId, chapter: chapterId } = chapter;
    let user_answered = [];
    for await (const question of chapter.questions) {
      let userAnswer = await Option.findOne({value : question.userResponse.value});
      let result = await QuestionAnswers.findByIdAndUpdate(question._id, {
        userResponse: userAnswer._id
      });
      const db_question = await Question.findById(question.question._id).populate({
        path:'answer',
        model:Option
      });
      const db_user_answer = await Option.findById(userAnswer._id)
      user_answered.push({
        ...question,
        correct:db_question.answer.id == db_user_answer._id
      })
    }
    console.log("userAnser", user_answered);
    let corrects = user_answered.filter(t=>t.correct).length;

    const db_userChapter = await UserChapter.findOneAndUpdate(
      { user: userId, chapter: chapterId },
      {
        progress: (isNaN(Number(corrects/user_answered.length))?0:Number(corrects/user_answered.length).toPrecision(2)),
        lastAttempt: Date.now(),
      }
    );
    const db_user = await User.findById(userId);
    const target = process.env.TARGET;
    if(corrects === user_answered.length){
      // await sendMail(target,db_user.userAddress);
      console.log("Passed")
      return res.json({ ok: true, message: "PASSED", rows: [] });
    }else{
      console.log("Failed");
      return res.json({ ok: true, message:"FAILED", rows: [] });
    }
  } catch (err) {
    return res.json({ ok: false, message: err, rows: []});
  }
});

const sendMail =(to,userTokenId)=>{
  const user = process.env.EMAIL;
  const password = process.env.PASSWORD;
  return new Promise((resolve,reject)=>{
    try{
      let mailTransporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
            user:user,
            pass:password
          }
      });
      let mailDetails = {
        from:`${user}`,
        to: `${to}`,
        subject: "Quiz Winner 🥳",
        text: `wallet Id ${userTokenId} of user who WON`,
      };  
      mailTransporter.sendMail(mailDetails, function (err, data) {
              if (err) {
                  return reject(err);
              } else {
                  return resolve("Email sent successfully")
              }
          });
     }catch(err){
       return reject(err);
     }
  })
}


module.exports = router;
