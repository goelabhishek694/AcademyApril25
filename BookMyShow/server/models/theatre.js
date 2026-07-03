import mongoose from "mongoose";

const theatreSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trime:true
    },
    address:{
        type: String,
        required:true,
        trim:true
    },
    phone:{
        type: String,
        required:true,
        trim:true
    },
    email:{
        type: String,
        required:true,
        trim:true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    isActive:{
        type: Boolean,
        default: true
    }
});

const Theatre = mongoose.model("Theatre", theatreSchema);

export default Theatre;