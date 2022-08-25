const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://Afshan1125:CTJmINoi8uaUXeRX@cluster0.drhptc9.mongodb.net/AFSHA-Middlewear?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use (
    function (req, res, next) {
        console.log ("inside GLOBAL MW");
        next();
  }
  );

 app.use('/', route);
// app.use (
//     function (req, res, next) {
//         let dmy = moment().format('DD-MM-YYYY, HH:mm:ss');
//         let ipAddress = req.ip;
//         let url = req.originalUrl
//         console.log (dmy +" , "+ipAddress+" , "+url);
//         next();
//     }
// );


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
