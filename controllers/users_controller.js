// Import userSchema Module
const User = require('../models/userSchema');
// Import studentSchema Module
const Student = require('../models/studentSchema');



// Sign in Page

module.exports.sign_in = function(req,res){
    res.render('user_signin',{
        title:"Pcell || Sign In"
    });
}

//  Sign up Page

module.exports.sign_up = function(req,res){
    res.render('user_signup',{
        title:"Pcell || Sign Up"
    });
}

// Create Account of User
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        console.log('error accesssed')
        // req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }


    try {
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (!user) {
                    User.create(req.body)
                        .then((user) => {
                            console.log('accesssed')
                            // req.flash('success', 'You have signed up, login to continue!');
                            return res.redirect('/users/sign-in');
                        })
                        .catch((err) => {
                            if (err) { req.flash('error', err); return }
                        })
                } else {
                    console.log('Already User');
                    return res.redirect('back');
                }
            })


    } catch (error) {
        console.log("error in module User_controller create");
    }

}


// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    
    return res.redirect('/');
}

// To  Sign Out
module.exports.destroySession = function (req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}

