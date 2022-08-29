const orderModel = require("../models/orderModel")
const productmodel = require("../models/productModel")
const userModel = require("../models/userModel")


const createorder = async function (req,res){
    let data = req.body
    let user= req.body.userId
    let product = req.body.productId


    //checking for validations(Id)
    if (!user) {return res.send ({msg:"userId is compulsory" })}
    else if (!product) res.send ({msg:"productId is compulsory"})
    let isFree = req.headers.isfreeappuser     // taking isFreeAppUser from header
    
    if(isFree == 'true'){
    
        let data = req.body
        data["amount"] = 0
        let freeUser = await orderModel.create(data)
        console.log(freeUser)
        res.send({msg : freeUser, data :"this is free product"})
        
    }
    else if (isFree !='true'){
        let probalance= await productmodel.findById(product).select({price:1,_id:0})
        let productamount= probalance.price
        let userbalance = await userModel.findById(user).select({balance:1,_id:0})
        let finalbalance= userbalance.balance
        //if userbalance is more than product balance
        if (finalbalance >= productamount) 
        {
            let usernewbalance = finalbalance - productamount
            console.log (usernewbalance)
            let updatedata = await userModel.findByIdAndUpdate({_id:user},{$set :{balance : usernewbalance }})
            updatedata.amount=productamount
            updatedata.isfreeappuser=isFree
            res.send({msg:updatedata})
        }
        else res.send ({msg:"insufficient balance"})
    }


//     let saveddata= await orderModel.create(data)

// res.send (saveddata)


}
module.exports.createorder=createorder

