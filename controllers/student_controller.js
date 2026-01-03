// Import studentSchema Module
const Student = require('../models/studentSchema');
// Import InterviewSchema Module
const Interview = require('../models/interviewSchema');


// To open the Student add form open Page

module.exports.add_form = function(req,res){
    if(req.isAuthenticated()){
        
        res.render('form_add_student',{
            title:'Pcell || Create Student'
        });
    }else{

        res.xredirect('/users/sign-in');
    }
}

// Add Student in Student List page
module.exports.create= async function(req,res){
    const { name, email, batch, college, placement, contact, dsa, webd, react } = req.body;
	try {
		const student = await Student.findOne({ email });

		if (student) {
			console.log('Email already exists');
			return res.redirect('back');
		}

		await Student.create({
			name,
			email,
			college,
			batch,
			placement,
			contact,
			dsa,
			webd,
			react,
		});
		return res.redirect('/');
	} catch (error) {
		console.log(`Error in creating student: ${error}`);
		return res.redirect('back');
	}
}


// Delete Student from student list

module.exports.delete = async function(req,res){
    const { id } = req.params;
	try {
		// find the student using id in params
		const student = await Student.findById(id);

		// find the companies for which interview is scheduled
		// and delete student from company interviews list
		if (student && student.interviews.length > 0) {
			for (let item of student.interviews) {
				const interview = await Interview.findOne({ name: item.company });
				if (interview) {
					for (let i = 0; i < interview.students.length; i++) {
						if (interview.students[i].student.toString() === id) {
							interview.students.splice(i, 1);
							interview.save();
							break;
						}
					}
				}
			}
		}
		await Student.findByIdAndDelete(id);
		res.redirect('back');
	} catch (error) {
		console.log('Error in deleting student',error);
		return res.redirect('back');
	}
}