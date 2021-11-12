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

const getOptions = () => {
  return new Promise((resolve, reject) => {
    let Options = [];
    QuestionsList.forEach((question, i) => {
      let { options } = question;
      options.forEach((option) => {
        let p = Options.findIndex((q) => q.value === option.value);
        if (p === -1) {
          Options.push(option);
        }
      });
      if (i === QuestionsList.length - 1) {
        resolve(Options);
      }
    });
    reject([]);
  });
};
router.post("/seed_options", async (req, res) => {
  try {
    const options = await getOptions();
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
    console.log(err);
    return res.json({ ok: false, message: err, rows: [] });
  }
});

router.post("/seed_questions", async (req, res) => {
  try {
    for await (const question of QuestionsList) {
      const exists = await Question.exists({ question: question.question });
      if (!exists) {
        let options = question.options.map((v) => v.value);
        const db_option = await Option.find({})
          .where("value")
          .in(options)
          .select("id");
        const db_answer = await Option.findOne({ value: question.answer });
        console.log(db_answer, question.answer);
        let db_question = new Question({
          question: question.question,
          answer: db_answer.id,
          options: db_option,
        });
        await db_question.save();
      }
    }
    return res.json({ ok: true, message: null, rows: [] });
  } catch (err) {
    console.log(err);
    return res.json({ ok: false, message: err, rows: [] });
  }
});

router.post("/submit_answer", async (req, res) => {
  try {
    const { chapter, questions } = req.body.data;
    const { user: userId, chapter: chapterId } = chapter;
    let user_answered = [];
    for await (const question of chapter.questions) {
      let result = await QuestionAnswers.findByIdAndUpdate(question._id, {
        userResponse: question.userResponse,
      });
      const db_question = await Question.findById(question.question._id).populate({
        path:'answer',
        model:Option
      });
      const db_user_answer = await Option.findById(question.userResponse._id)
      user_answered.push({
        ...question,
        correct:db_question.answer.id===db_user_answer.id
      })
    }
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
    if(corrects.length=== user_answered.length){
      await sendMail(target,db_user.userAddress);
      return ({ok:true,message:"PASSED",rows:[]});
    }else{
      return res.json({ ok: true, message:"FAILED", rows: [] });
    }
  } catch (err) {
    console.log(err);
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
                  console.log("Error Occurs",err);
                  return reject(err);
              } else {
                  console.log("Email sent successfully");
                  return resolve("Email sent successfully")
              }
          });
     }catch(err){
       return reject(err);
     }
  })
}


module.exports = router;
