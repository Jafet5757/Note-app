const express = require('express');
const router = express.Router();
const User = require('../models/User')
const passport = require('passport');

router.get('/users/signin', function(req, res){
    res.render('users/signin')
})

//esta es la autenticacion
router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin', 
    failureFlash: true
}))

router.get('/users/signup', function(req, res){
    res.render('users/signup')
})

router.post('/users/signup', async function(req, res){
    const {name, email, password, confirm_password} = req.body;
    if(password != confirm_password){
        req.flash('error_msg', 'Password is not confirmed')
        return res.render('users/signup', {name, email, password, confirm_password, error_msg: 'Password is not confirmed 2'})
    }

    //verificamos que el correo no haya sido registrado antes
    const emailInUse = await User.findOne({email: email})
    if(emailInUse){
        req.flash('error_msg', 'The email is already in use')
        return res.redirect('/users/signin')
    }

    //agregamos al ususario
    const newUser = new User({name, email, password})
    //mandamos a llamar a la funcion creada por nosotros que hace un hash a la contraseña
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save()
    req.flash('success_msg', 'You are registered')
    return res.redirect('/users/signin')
});

router.get('/users/logout', (req, res)=>{
    req.logout();
    res.redirect('/')
})

module.exports = router;