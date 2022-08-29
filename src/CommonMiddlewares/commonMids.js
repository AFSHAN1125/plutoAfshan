letAuth = function(req , res , next){
    lettoken = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
  
    //If no token is present in the request header return error. This means the user is not logged in.
    if (!token) returnres.send({ status:false, msg:"token must be present" });
  
    console.log(token);

    next();
}

module.exports.Auth = Auth

