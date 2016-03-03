/**
 * Created by Bharath on 25/02/16.
 */
var rootpath=require('app-root-path');
var mongoose=require('mongoose');
var agg=require('/Users/Bharath/WebstormProjects/LearningHub/Routes/model/hubmodel.js');


function hubcontroller(){

}
hubcontroller.prototype.scrape=function(url,callback){
    var scrape=require(rootpath+'/public/js/scrape.js');
    var details=scrape.getInfo(url,function(res){

        callback(res)
    });


}

hubcontroller.prototype.add=function(error,params,success){
    var newPost=new agg({
        courseId:001,
        postId:new mongoose.Types.ObjectId,
        title:params.title,
        content:params.url,
        description:params.description,
        isDeleted:false,
        tags:params.tags
    });

    newPost.save(function(err){
        if(err){
            error(err);
            return;

        }else{
            success(newPost);
        }
    })

};

hubcontroller.prototype.comment=function(error,params,success){


    agg.update(
        {postId:params.postId},
        {
            $push:{
                "comments":{
                    "commentId":new mongoose.Types.ObjectId,
                    "userId":params.userId,
                    "isDeleted":false,
                    "comment":params.content
                }


            }
        },
        function(err){
            if(err){
                error(err);
            }else{
                success();
            }
        }
    )

};


hubcontroller.prototype.getlinks=function(error,params,success){
    console.log(params.courseId);

    agg.find({courseId:params.courseId}).sort({'dateAdded':-1}).exec(function(error,posts){
        if(error){
            error(error);
            return;
        }else{
            success(posts);
            return;
        }
    })

}

//"comments.comment":params.content,
//    "comments.commentId":new mongoose.Types.ObjectId,
//    "comments.userId":params.userId,
//    "comments.isDeleted":false


module.exports=new hubcontroller();

