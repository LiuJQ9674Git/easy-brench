var express = require('express');
var router = express.Router();

var comments = require('../models/comments').comments;
router.list = function(req, res){
    res.json(comments);
};
router.get = function(req, res){
    if(comments.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No comment found');
    }
    var q = comments[req.params.id];
    res.json(q);
};
router.delete = function(req, res){
    if(comments.length <= req.params.id) {
        res.statusCode = 404;
        return res.send('Error 404: No comment found');
    }
    comments.splice(req.params.id, 1);
    res.json(true);
};

router.update = function(req, res){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    for(var i=0;i<comments.length;i++){
        if(comments[i].author==req.body.author){
            comments[i] = req.body;
            res.send({status:"success", message:"update comment success"});
            console.log(comments);
        }
    }

};

router.add = function(req, res){
    if(!req.body.hasOwnProperty('author') ||
        !req.body.hasOwnProperty('text')) {
        res.statusCode = 400;
        return res.send('Error 400: Post syntax incorrect.');
    }

    var newComment = {
        author : req.body.author,
        text : req.body.text
    };

    comments.push(newComment);
    res.json(true);
};

module.exports = router;