const User = require('../models/user');


module.exports.getRegisterForm = (req, res) => {
    res.render('users/register');
}

module.exports.registerUser = async(req, res) => {
    try {
        const {email, username, password} = req.body;
        const user = new User({email, username})
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash("success", "Welcome to Gym Addict!");
            res.redirect('/gyms');
        })
        } catch(e) {
            req.flash('error', e.message);
            res.redirect('register');
        } 
    
    }

    module.exports.getLoginForm = (req,res)=>{
        res.render('users/login')
    }

    module.exports.postLogin = (req,res)=>{
        req.flash('success', 'welcome back!');
        const redirectUrl = req.session.returnTo || '/gyms';
        delete req.session.returnTo;
        res.redirect(redirectUrl);
    }

    module.exports.logOut = ( req, res, next) => {
   
        req.logout(function(err){
            if (err) {
                return next(err);
            }
            req.flash('success', "goodbye!");
            res.redirect('/gyms')
        })
    }