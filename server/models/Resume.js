import mongoose from "mongoose";

const resumeSchema = mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    title : {type: String, default: "Untitled resume"},
    public : {type: Boolean, default: false},
    template : {type: String, default: "classic"},
    accent_color : {type: String, default: "#14B8A6"},
    professional_summary : {type: String, default:""},
    skills : [{type: String}],
    personal_info : {
        full_name : {type: String, default: ""},
        email : {type: String, default: ""},
        phone : {type: String, default: ""},
        location : {type: String, default: ""},
        linkedin : {type: String, default: ""},
        website : {type: String, default: ""},
        profession : {type: String, default: ""},
        image : {type: String, default: ""},
    },
    experience : [
        {
            company : {type:String},
            position : {type:String},
            start_date : {type:String},
            end_date : {type:String},
            description : {type:String},
            is_current : {type:Boolean,default:false}
        }
    ],
    education : [
        {
            institution : {type: String},
            degree : {type: String},
            field : {type: String},
            graduation_date : {type: String},
            gpa : {type: String},
        }
    ],
    project : [
        {
            name : {type: String},
            type : {type: String},
            description : {type: String},
        }
    ]
},{timestamps:true, minimize: false})


const Resume = mongoose.model("Resume",resumeSchema)

export default Resume