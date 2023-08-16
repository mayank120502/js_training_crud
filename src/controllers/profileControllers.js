let person = require('../../server.js');
const express = require('express');
const {
	ReasonPhrases,
	StatusCodes,
} =  require('http-status-codes');

const getController = (req , res) =>{
    let resObj = {
        status: StatusCodes.OK,
        message: "Data successfully retrieved",
        data: person,
    }
    res.send(resObj);
}

const postController = (req , res) =>{
    if(req.isPossible){
        person.name = req.body.name;
        person.age = req.body.age;
        person.address = req.body.address;
        let resObj = {
            status: StatusCodes.CREATED,
            message: ReasonPhrases.CREATED,
            data: person,
        }
        res.send(resObj);
    }
}

const putController = (req , res) =>{
    if(req.isPossible){
        reqObj = req.body;
        for(let key of Object.keys(reqObj)){
            console.log(key);
            person[key] = reqObj[key];
        }
        let resObj = {
            status: StatusCodes.OK,
            message: "Data updated successfully : PUT",
            data: person,
        }
        res.send(resObj);
    }
}

const patchController = (req , res) =>{
    if(req.isPossible){
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
    }
}

const deleteController = (req , res) =>{
    if(req.isPossible){
        delete person.name;
        delete person.age;
        delete person.address;
        
        let resObj = {
            status: StatusCodes.OK,
            message: ReasonPhrases.OK,
            data: person,
        };
        res.send(resObj);
    }
}

module.exports = {
    getController,
    postController,
    putController,
    patchController,
    deleteController,
}