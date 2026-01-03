// Import studentSchema Module

const Student = require('../models/studentSchema');

// To Open Student List / Home Page
module.exports.home = async function(req,res){
    const students = await Student.find({});

    res.render('student_list',{
        title: "Pcell || Home",
        students:students
    });

}