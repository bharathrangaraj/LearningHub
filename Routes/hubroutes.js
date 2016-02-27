/**
 * Created by Bharath on 25/02/16.
 */

var express=require('express');
var router=express.Router();
var rootpath=require('app-root-path');
var controller=require(rootpath+'/modules/aggregation.controller.js');




router.get('/api/scrape',function(req,res){

    var details=controller.scrape(req.query.url,function(details){

        res.json(details);
    });


});

router.post('/api/add',function(req,res){
    controller.add(function(err){
        console.log(err);
        return;
    },
        {
            title:req.body.title,
            description:req.body.description,
            url:req.body.url

        },function (post) {
            res.status(200).json({
                result: true, post: post
            });
    })

});

router.get('/api/posts',function(req,res){
controller.getlinks(function(err){
        console.log(err);
        return;
    },
    {
        courseId:req.query.courseId
    },
    function(posts){
        console.log("inside get posts");
    console.log(posts);
    res.json(posts);
});

});

router.get('/',function(req,res){
    res.sendFile(rootPath+"/public/index.html");
});

module.exports=router;


