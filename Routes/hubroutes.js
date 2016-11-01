/**
 * Created by Bharath on 25/02/16.
 */

var express=require('express');
var router=express.Router();
var rootpath=require('app-root-path');
var controller=require(rootpath+'/modules/aggregation.controller.js');




router.get('/api/scrape',function(req,res){
   controller.scrape(req.query.url,function(error,details){
       if(error){
           res.send("invalid link")
       }else{
           res.json(details);
       }
    });


});

router.post('/api/add',function(req,res){
    controller.add(function(err){
        console.log(err);
        return;
    },req.body
        ,function (post) {
            res.status(200).json({
                result: true, post: post
            });
    });

});

router.post('/api/personaladd', function(req, res){
    controller.personalAdd(function(err){
            console.log(err);
            return;
        },req.body
        ,function (post) {
            res.status(200).json({
                result: true, post: post
            });
        });

});

router.delete('/api/delete', function(req,res){
    console.log("body"+req.query.postId);
    controller.delete(req.query,
        function (data) {
        res.status(200).json({
            result: true
        })
    },
        function(err){
        res.status(400).json({
            result:false
        })
    })
});


router.put('/api/comment',function(req,res){



controller.comment(function(err){
    console.log(err);
    return;
},
    {
        content:req.body.content,
        userId:req.body.userId,
        postId:req.body.postId,
        userName:req.body.userName
    },
function(put){
    res.status(200).json(
        {
            result:true,
            put: put
        }
    )
});

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

    res.json(posts);
});

});

router.get('/',function(req,res){
    res.sendFile(rootPath+"/public/index.html");
});

module.exports=router;


