const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    name:{
        type:String,
        
    },
    students:[
        {
            student:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Student'
            },
            date:{
                type:String,
                required:true
            },
            result:{
                type:String,
                enum:['On Hold','Selected', 'Pending', 'Not Selected','Did not Attempt']
            }
        }
    ]
},
{
    timestamps:true
});

const Interview  = mongoose.model('Interview', interviewSchema );

module.exports = Interview;