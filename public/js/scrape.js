/**
 * Created by Bharath on 20/02/16.
 */
"use strict";
var URL=require ('url-parse');
var isImageUrl = require('is-image-url');
var video=require('/Users/Bharath/WebstormProjects/LearningHub/public/js/video.js');
var slide=require('/Users/Bharath/WebstormProjects/LearningHub/public/js/slide.js');
var image=require('/Users/Bharath/WebstormProjects/LearningHub/public/js/image.js');
var link1=require('./link.js');
var audio=require('./audio.js');
var sb=require('/Users/Bharath/WebstormProjects/LearningHub/public/js/safeBrowsing.js');
var story=require('./story.js');
var pdf=require('./pdf.js');
var doc=require('./doc.js');
var https=require("follow-redirects").https;
var http=require("follow-redirects").http;
var current_link="";
var videos=['youtube','gfycat','viddler','hulu','vimeo','dotsub','animoto','ted','sapo','mobypicture','moby','dailymotion','circuitlab','coub','kickstarter','sketchfab'];
var slides=['slideshare','speakerdeck','sway','slides','emaze'];
var images=['flickr','flic','smugmug','23hq','hlip','germany','geograph','infogram','chartblocks','infogr'];
var stories=['silk','verse','amcharts'];
var audios=[,'soundcloud','mixcloud','clyp','huffduffer'];
var docs=['docs','office'];
function scrape(){};
function hostName(link){
    var url=new URL(link);
    return url.hostname;
};


function protocol(link){
    var url=new URL(link);
    return url.protocol;
}
scrape.prototype.getInfo=function(link,callback){

    checkUrl(link,function(legit){
        if(legit){

            var host_name=hostName(link);
            if(contains(videos,host_name)){

                video.getDetails(link,current_link,
                    function(res){
                        callback(res);
                    });
            }else if(contains(slides,host_name)){

                slide.getDetails(link,current_link,
                    function(res){
                        callback(res);
                    });
            }else if(contains(images,host_name)){
                image.getDetails(link,current_link,
                    function(res){
                        callback(res);
                    });
            }else if(isImageUrl(link)){

                image.getDetails(link,host_name,
                    function(res){
                        callback(res);
                    });
            }else if(contains(stories,host_name)){
                story.getDetails(link,current_link,
                    function(res){
                        callback(res);
                    });
            }else if(contains(audios,host_name)){
                console.log(inside);
                audio.getDetails(link,current_link,
                    function(res){
                        callback(res);
                    });
            }else if(contains(docs,host_name)){
                doc.getDetails(link,current_link,
                    function(res){
                        callback(res);
                    });

            }else if(isPdf(link,function(valid){
                    console.log(valid);
                    if(valid){

                        pdf.getInfo(link,function(res){
                            callback(res);
                        })
                    }
                    else{
                        link1.getInfo(link,function(res){
                            callback(res);
                        })
                    }
                })){

            }
        }
        else{
            console.log(legit);
        }
    });
};
function contains(list,hostname) {
    for (var i = 0; i < list.length; i++) {
        var sub_str=list[i];
        if(hostname.indexOf(sub_str)>-1){
            current_link=list[i];
            return true;
        }
    }
    return false;
}
function checkUrl(link,callback){

    sb.checkUrl(link,function(legit){

        callback(legit);
    });
}

function isPdf(url,callback){
    var proto=protocol(url);
    if(proto=="http:"){
        http.get(url,function(res,err){

            if(err){
                console.log(err);
            }

            if(res.headers['content-type']=='application/pdf'){
                callback(true);

            }else{

                callback(false);
            }
        });
    }else{
        https.get(url,function(res,err){

            if(err){
                console.log(err);
            }
            if(res.headers['content-type']=='application/pdf'){
                console.log('1');
                callback(true);
            }else{

                callback(false);
            }
        });
    }

}
module.exports= new scrape();





