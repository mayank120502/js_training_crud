const express = require('express');
const {PORT} = require('./src/helpers/constants');
const {
    router : profileRouter,
} = require('./src/routes/profileRouter');

const app = express();

app.set('x-powered-by', 'ASP.NET');

let person = {};

app.use('/profile' , profileRouter);
app.use(express.json());

app.listen(PORT , (err)=>{
    if(err){
        console.error(err.message);
    }
    else{
        console.log(`Listening to port http::/localhost:${PORT}.`);
    }
});

module.exports = person;