const mongoose = require('mongoose');
const { Schema } = mongoose;


const optionSchema = new Schema({
    value:String,
    label:String
})

const Option = mongoose.model('Options',optionSchema);

const chapterSchema = new Schema({
    name:String,
    title:String,
    token:String,
    href:String
})
const Chapter = mongoose.model('Chapters', chapterSchema);


const questionSchema = new Schema({
    question:String,
    answer:{
        type:Schema.Types.ObjectId,
        ref:Option
    },
})
const Question = mongoose.model('Questions',questionSchema);


const UserSchema = new Schema({
    userAddress:String,
})
const User = mongoose.model('User',UserSchema);

///////////////////////////
//advance




const userChapterSchema = new Schema({
    chapter:{type:mongoose.Types.ObjectId,ref:Chapter},
    user:{type:mongoose.Types.ObjectId,ref:User},
    owned:{ type:Boolean,default:false },
    count:{type:Number,default:0},
    progress:{type:Number,default:0},
    lastAttempt:{type:Date,default:null}
})

const QuestionAnswerSchema = new Schema({
    question:{
        type:Schema.Types.ObjectId,
        ref:Question
    },
    userResponse:{
        type:Schema.Types.ObjectId,
        ref:Option,
        default:null
    },
})

const QuestionAnswers = mongoose.model('QuestionAnswers',QuestionAnswerSchema);

const ChapterQuestionSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:User
    },
    chapter:{
        type:Schema.Types.ObjectId,
        ref:Chapter
    },
    questions:[{
        type:Schema.Types.ObjectId,
        ref:QuestionAnswers
    }],
})

const ChapterQuestions = mongoose.model('ChapterQuestion',ChapterQuestionSchema);


const UserChapter = mongoose.model('UserChapter',userChapterSchema);

module.exports = {ChapterQuestions,QuestionAnswers,Chapter,Option,User,Question,UserChapter}