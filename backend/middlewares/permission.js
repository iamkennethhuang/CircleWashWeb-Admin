function authPerm(perm){
    return (req, res, next) => {
        if(req.user.role === 'admin'){
            next();
        }
        const permissions = req.user.perms.map(perm => perm.name);
        if(permissions.includs(perm)){
            next();
        }
        else{
            return res.status(401).send({message: "user's permission is not allowed"});
        }
    }
}

module.exports = {
    authPerm
}