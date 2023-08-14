const getController = (req , res) =>{
    res.send(req.data);
}
const postController = (req , res) =>{
    res.send(req.data);
}
const putController = (req , res) =>{
    res.send(req.data);
}
const patchController = (req , res) =>{
    res.send(req.data);
}
const deleteController = (req , res) =>{
    res.send(req.data);
}

module.exports = {
    getController,
    postController,
    putController,
    patchController,
    deleteController,
}