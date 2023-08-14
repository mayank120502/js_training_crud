const express = require('express');
const {
	ReasonPhrases,
	StatusCodes,
} =  require('http-status-codes');
const {
    getMiddleware,
    postMiddleware,
    putMiddleware,
    patchMiddleware,
    deleteMiddleware,
} = require('../middlewares/profileMiddleware');

const {
    getController,
    postController,
    putController,
    patchController,
    deleteController,
} = require('../controllers/profileControllers');

const router = express.Router();
router.use(express.json());

router.get(
    '/get' ,
    getMiddleware ,
    getController
);

router.post(
    '/post' ,
    postMiddleware ,
    postController
);

router.patch(
    '/patch' ,
    patchMiddleware ,
    patchController
);

router.put(
    '/put' ,
    putMiddleware ,
    putController
);

router.delete(
    '/delete' ,
    deleteMiddleware ,
    deleteController
);

module.exports = {
    router,
};