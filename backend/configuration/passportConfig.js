const User = require('../models/user');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;
const Staff = require('../models/staff');

function initializePassport(passport) { 
    passport.use('user-local', new localStrategy({
        usernameField: 'email'},
        (email, password, done) => {
        User.findOne({email: email}, async (err, user) => {  
            if(err) throw err;
            if(!user){
                return done(null, false, {message: 'no such user'});
            }//null is the err and false is the user, also mean no such user
            else{
                await bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                    return done(null, user);
                    }
                    else{
                        return done(null, false, {message: 'password incorrect'}); //password incorrect
                    }
                })
            }
        })}
    ));

    passport.use('staff-local', new localStrategy({
        usernameField: 'email'},
        (email, password, done) => {
        Staff.findOne({email: email}, async (err, staff) => {  
            if(err) throw err;
            if(!staff){
                return done(null, false, {message: 'No such staff account'});
            }//null is the err and false is the user, also mean no such user
            else{
                await bcrypt.compare(password, staff.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                    return done(null, staff);
                    }
                    else{
                        return done(null, false, {message: 'Password Incorrect'}); //password incorrect
                    }
                })
            }
        })}
    ));

    //this function will be called when initializePassport finish running and store user.id at the session
    passport.serializeUser((user, done) => { 
        if(user instanceof User){
            done(null, {id: user.id, type: "User"}); 
        }
        if(user instanceof Staff){
            done(null, {id: user.id, type: "Staff"}); 
        }
    }); //stores a cookie inside of the browser

    //each time a user send a request to any route, passport session will call deserializeUser and return the user object by id
    passport.deserializeUser(({id, type}, done) => {
        if(type === "User"){
            User.findOne({_id: id}, (err, user) => {
                done(err, user);
            });
        }
        if(type === "Staff"){
            Staff.findOne({_id: id}, (err, staff) => {
                done(err, staff);
            });
        }
    }); // takes the cookie and unravels it and return a user from it
};

module.exports = initializePassport;