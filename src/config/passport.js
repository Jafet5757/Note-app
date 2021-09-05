const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User')

//Usamos passport local porque la autenticación es de esta pagina
//si usamos un servicio externo usamos otro complemento
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done)=>{
    const user = await User.findOne({ email})
    //su no devuelve nada se esta intentando autenticar sin permiso
    if(!user){
        return done(null, false, {message: 'Not user found'})
    }else{
        const match = await user.matchPasswords(password)
        if(match){
            return done(null, user);
        }else{
            return done(null, false, {message: 'Incorrect password'})
        }
    }
}))

passport.serializeUser((user, done)=>{
    done(null, user.id);
})

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        done(err, user);
    })
})