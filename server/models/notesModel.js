const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    title:{
        type:String,
        required:[true,"Please Enter title"],
    },
    description:{
        type:String,
        required:[true,"Please Enter Description"],       
    },    
},{
    timestamps: true,
}
);

const Notes = mongoose.model('Note',userSchema);
module.exports= Notes;