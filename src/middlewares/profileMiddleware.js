const Joi = require('joi');
const {
	ReasonPhrases,
	StatusCodes,
} =  require('http-status-codes');

let person = require('../../server.js');

const getMiddleware = (req , res , next) =>{
    let resObj = {
        status: StatusCodes.OK,
        message: "Data successfully retrieved",
        data: person,
    }
    res.send(resObj);
}

const postMiddleware = (req , res , next) =>{
    if(Object.keys(person).length != 0){
        let resObj = {
            status: StatusCodes.BAD_REQUEST,
            message: "Data already present.",
            data: {},
        }
        res.send(resObj);
        next();
        return;
    }
    const schema = Joi.object().keys({
        name:Joi.string().required(),
        age:Joi.number().required(),
        address:Joi.string().required()
    });
    const{error} = schema.validate(req.body);
    if(error){
        let resObj = {
            status: StatusCodes.BAD_REQUEST,
            message: error.message,
            data: {},
        }
        res.send(resObj);
        next();
    }
    else{
        person.name = req.body.name;
        person.age = req.body.age;
        person.address = req.body.address;
        let resObj = {
            status: StatusCodes.CREATED,
            message: ReasonPhrases.CREATED,
            data: person,
        }
        res.send(resObj);
        next();
    }
}

const putMiddleware = (req , res , next) =>{
    if(Object.keys(person).length == 0){
        let resObj = {
            status: StatusCodes.BAD_REQUEST,
            message: "Bad request : No data to update.",
            data: {},
        }
        res.send(resObj);
        next();
        return;
    }
    const schema = Joi.object().keys({
        name:Joi.string().required(),
        age:Joi.number().required(),
        address:Joi.string().required()
    });
    const {error} = schema.validate(req.body);
    if(error){
        let resObj = {
            status: StatusCodes.BAD_REQUEST,
            message: error.message,
            data: {},
        }
        res.send(resObj);
        next();
    }
    else{
        reqObj = req.body;
        for(let key of Object.keys(reqObj)){
            console.log(key);
            person[key] = reqObj[key];
        }
        let resObj = {
            status: StatusCodes.OK,
            message: "Data updated successfully : PATCH",
            data: person,
        }
        res.send(resObj);
        next();
    }
}

const patchMiddleware = (req , res , next) =>{
    if(Object.keys(person).length == 0){
        let resObj = {
            status: StatusCodes.BAD_REQUEST,
            message: "Bad request : No data to update",
            data: {},
        }
        res.send(resObj);
        next();
        return;
    }
    const schema = Joi.object().keys({
        name:Joi.string(),
        age:Joi.number(),
        address:Joi.string()
    });
    const{error} = schema.validate(req.body);
    if(error){
        let resObj = {
            status: StatusCodes.BAD_REQUEST,
            message: error.message,
            data: {},
        }
        res.send(resObj);
        next();
    }
    else{
        reqObj = req.body;
        for(let key of Object.keys(reqObj)){
            person[key] = reqObj[key];
        }
        let resObj = {
            status: StatusCodes.OK,
            message: "Data updated successfully : PATCH",
            data: person,
        }
        res.send(resObj);
        next();
    }
}

const deleteMiddleware = (req , res , next) =>{
    if(Object.keys(person).length == 0){
        let resObj = {
            status: StatusCodes.BAD_REQUEST,
            message: "cant delete , coz data is not present",
            data: person
        };
        res.send(resObj);
        return;
    }
    person = {};
    let resObj = {
        status: StatusCodes.OK,
        message: ReasonPhrases.OK,
        data: person
    };
    res.send(resObj);
}

module.exports = {
    getMiddleware,
    postMiddleware,
    putMiddleware,
    patchMiddleware,
    deleteMiddleware,
}