// Import studentSchema Module
const Student = require('../models/studentSchema');
// Import InterviewSchema Module
const Interview = require('../models/interviewSchema');

// To open the Interview List Page
module.exports.openInterviewPage =async function(req,res){

const students = await Student.find({});

  return  res.render('interview_list',{
      title:"Pcell || Interview List",
      students:students

    });
}


// To open the Interview form open Page

module.exports.open_form = async function(req,res){
  const students = await Student.find({});
  
  let array = [];

  for (let student of students) {
    array.push(student.batch);
  }
  // filter out duplicate batches
  array = [...new Set(array)];
console.log(`Accessed`);
console.log(` Array: ${array}`);
  return res.render('form_add_interview',{
    title:"Interview Form",
    students:students,
    array:array
  });
}

// To Assign THe Interview

module.exports.create = async (req, res) => {
try {
  console.log(req.body.name,req.body.date);
 
const existingCompany = await Interview.findOne({ name: req.body.company });
if(!existingCompany){
  const newInterview = await new Interview({
    name:req.body.company,
    students:[
      {
        student: req.body.name,
        date:req.body.date,
        result:'Pending',
      },
    ],
  });
  await newInterview.save();
}else{
  for(let student of existingCompany.students){
    if(student.student._id === req.body.id){
      console.log('Interview with this student already scheduled');
          return res.redirect('back');
    }
    existingCompany.students.push({
      student: req.body.name,
        date:req.body.date,
        result:'Pending',
    });
    existingCompany.save();
  }

  
}


Student.findById(req.body.name)
.then((student)=>{
 console.log(student);
student.interviews.push({
  company:req.body.company,
  date:req.body.date,
  result:'Pending',
});
student.save();
}) 



console.log('Interview Scheduled Successfully');

return res.redirect('/interviews/add')


} catch (error) {
  console.error('Error saving interview:', error);

}
};


// To Update THe Status of Interview

module.exports.update= async function(req,res){

  const { id } = req.params;
  const { companyName, companyResult } = req.body;
  try {
    const student = await Student.findById(id);
    if (student && student.interviews.length > 0) {
      for (let company of student.interviews) {
        if (company.company === companyName) {
          company.result = companyResult;
          student.save();
          break;
        }
      }
    }
    const interview = await Interview.findOne({ name: companyName });

    if (interview) {
      for (let std of interview.students) {
        /// compare student id and id passed in params
        if (std.student.toString() === id) {
          std.result = companyResult;
          interview.save();
        }
      }
    }
    console.log('Interview Status Changed Successfully');
    return res.redirect('back');
  } catch (error) {
    console.log(`Error in updating status: ${error}`);
    res.redirect('back');
  }
}
