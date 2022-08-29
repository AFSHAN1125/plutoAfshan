const mid1 = function (req,res,next){
    if (!req.headers.isfreeappuser)
    res.send({msg:"Request is missing"})
next()
}


module.exports.mid1=mid1