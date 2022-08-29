const UserModel= require("../models/userModel")





const createUser= async function (req, res) {
    let data = req.body
    let isfreeappuser = req.headers['isfreeappuser']

    let x
        if ( isfreeappuser == ''){
            x = false
        }else{
            x = isfreeappuser
        }

        let element = {
            name : data.name,
            balance : data.balance, 
            address : data.address,
            age : data.age,
            gender : data.gender,
            isFreeAppUser : x
        }
    

        
        
    let savedata=await UserModel.create(element)
    res.send({msg:savedata})
}
    
    

module.exports.createUser= createUser
