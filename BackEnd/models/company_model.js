import mongoose from "mongoose";

const company_model = new mongoose.Schema({
    company_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    logo:{
        type:String // url from cloudenarly images in utils
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true});

const Company = mongoose.model("Company", company_model);
export default Company;