const Joi = require('joi');
const {
	ReasonPhrases,
	StatusCodes,
} =  require('http-status-codes');

let person = require('../../server.js');

const getMiddleware = (req , res , next) =>{
    if(typeof person == 'undefined'){
        let resObj = {
            status: StatusCodes.NOT_FOUND,
            message: "Data Not Found",
        }
        res.send(resObj);
    }
    next();
}

const postMiddleware = (req , res , next) =>{
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
    }
    if(Object.keys(person).length != 0){
        let resObj = {
            status: StatusCodes.BAD_REQUEST,
            message: "Data already present.",
            data: {},
        }
        res.send(resObj);
    }
    else{
        req.isPossible = true;
        next();
    }
}

const putMiddleware = (req , res , next) =>{
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
    }
    if(Object.keys(person).length == 0){
        let resObj = {
            status: StatusCodes.BAD_REQUEST,
            message: "Bad request : No data to update.",
            data: {},
        }
        res.send(resObj);
    }
    else{
        req.isPossible = true;
        next();
    }
}

const patchMiddleware = (req , res , next) =>{
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
    }
    if(Object.keys(person).length == 0){
        let resObj = {
            status: StatusCodes.BAD_REQUEST,
            message: "Bad request : No data to update",
            data: {},
        }
        res.send(resObj);
    }
    else{
        req.isPossible = true;
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
    }
    else{
        req.isPossible = true;
        next();
    }
}

module.exports = {
    getMiddleware,
    postMiddleware,
    putMiddleware,
    patchMiddleware,
    deleteMiddleware,
}