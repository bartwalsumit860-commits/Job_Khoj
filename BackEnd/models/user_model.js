import mongoose, { trusted } from "mongoose";

const user_schema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['student','recruiter'],//more than two option so use enum
        required:true
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},//url to resume file
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,
                 ref:'Company'},
        profilePhoto:{
            type:String,
            default:""
        }
    }
},
    {timestamps:true}
);

const User = mongoose.model("User",user_schema);
export default User;