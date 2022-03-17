function authUser(req, res, next){
 if(req.isAuthenticated()){
    next();
 }
 else{
    return res.status(403).send({message: "User not log in"});
 }
}

module.exports = {
    authUser
}