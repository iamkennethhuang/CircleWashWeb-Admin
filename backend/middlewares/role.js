function authRole(role){
    return (req, res, next) => {
        if(req.user.role === role){
            next();
        }
        else{
            return res.status(401).send({message: "user's role is not allowed"});
        }
    }
}

module.exports = {
    authRole
}