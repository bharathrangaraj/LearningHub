/**
 * Created by Bharath on 25/02/16.
 */
var rootpath=require('app-root-path');
var mongoose=require('mongoose');
var agg=require('/Users/Bharath/WebstormProjects/LearningHub/Routes/model/hubmodel.js');
var embed=require(rootpath+'/public/js/embedHtml.js');

function hubcontroller(){

}
//scrape the content
hubcontroller.prototype.scrape=function(url,callback){
    var scrape=require(rootpath+'/public/js/scrape.js');
    scrape.getInfo(url,function(error,res){
        if(error){
            callback(error,null);
        }else{
            callback(null,res);
        }
    });
};

hubcontroller.prototype.add=function(error,params,success){
    console.log(params);
    if(params.type=="video"){
        var newPost=new agg({
            courseId:002,
            postId:new mongoose.Types.ObjectId,
            title:params.title,
            url:params.url,
            description:params.description,
            type:params.type,
            isDeleted:false,
            tags:params.tags
        });
    }else if(params.type=="image"){
    var embedHtml=embed.embedImage(params.html);
    var newPost=new agg({
        courseId:002,
        postId:new mongoose.Types.ObjectId,
        title:params.title,
        url:params.url,
        embedHtml:embedHtml,
        type:params.type,
        isDeleted:false,
        tags:params.tags
    });

    }else if(params.type=="audio"){
        var newPost=new agg({
            courseId:002,
            postId:new mongoose.Types.ObjectId,
            title:params.title,
            url:params.url,
            embedHtml:embedHtml,
            type:params.type,
            isDeleted:false,
            tags:params.tags
        });

    }else if(params.type=="slide"){
        var newPost=new agg({
            courseId:002,
            postId:new mongoose.Types.ObjectId,
            title:params.title,
            url:params.url,
            embedHtml:embedHtml,
            type:params.type,
            isDeleted:false,
            tags:params.tags
        });

    }else if(params.type=="doc"){
        var newPost=new agg({
            courseId:002,
            postId:new mongoose.Types.ObjectId,
            title:params.title,
            url:params.url,
            embedHtml:embedHtml,
            type:params.type,
            isDeleted:false,
            tags:params.tags
        });

    }else if(params.type=="pdf"){
        console.log("inside params");
        console.log(params);
        var embedHtml=embed.embedPdf(params);
        var newPost=new agg({
            courseId:002,
            postId:new mongoose.Types.ObjectId,
            title:params.title,
            image:params.image,
            url:params.url,
            embedHtml:embedHtml,
            type:params.type,
            isDeleted:false,
            tags:params.tags
        });

    }else if(params.type=="story"){
        var embedHtml=embed.embedStory(params.html);
        var newPost=new agg({
            courseId:002,
            postId:new mongoose.Types.ObjectId,
            title:params.title,
            url:params.url,
            embedHtml:embedHtml,
            type:params.type,
            isDeleted:false,
            tags:params.tags
        });

    }else if(params.type=="link"){

        var embedHtml=embed.embedLink(params);
        var newPost=new agg({
            courseId:002,
            postId:new mongoose.Types.ObjectId,
            title:params.title,
            description:params.description,
            favicon:params.favicon,
            hostName:params.name,
            image:params.image,
            url:params.url,
            embedHtml:embedHtml,
            type:params.type,
            isDeleted:false,
            tags:params.tags
        });

    }


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
                    "comment":params.content,
                    "userName":params.userName
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

