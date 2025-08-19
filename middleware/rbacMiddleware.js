
const rbac = (allowdRoles = [], requiredPermissions =[]) =>{

  return (req,res,next) =>{
    const {role, permissions, sub} = req.user;
    
    if(!allowdRoles.includes(role)){
      return res.status(403).send({message: "Access denied: Role"});
    }

    const hashPerm = requiredPermissions.every((p)=> permissions.includes(p));

    if(!hashPerm){
      return res.status(403).send({message: "Access denied: Permissions"});
    }

    req.userId = sub ;
    next();
  }
}

module.exports = rbac;