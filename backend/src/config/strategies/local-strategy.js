// const passport = require('passport');
// const bcrypt = require ('bcrypt')
// const localStrategy = require('passport-local').Strategy;
// const connection = require('../../database')
// const User = connection('Users')

// passport.serializeUser(function(user, done) {
//    done(null, user);
//  });
 
//  passport.deserializeUser(function(user, done) {
//    done(null, user);
//  });

//  passport.use( new  localStrategy({
//    usernameField: 'email',
//    passwordField: 'password'
// },
   
//   async function (username, password, done) {

   
//      const [existeUser]= await User.select('email', 'password').where('email', username)
         
//       if(!existeUser ) {return done(null, false, {message: 'Email Incorrect'})}
      
         
      
//       if(existeUser.password != password ){return done(null,false, {message: 'Incorrect password'})}
//       return done(null,existeUser)
//    }
 


// ))