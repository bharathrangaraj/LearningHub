/**
 * Created by Bharath on 20/02/16.
 */
"use strict";
var URL=require ('url-parse');
var isImageUrl = require('is-image-url');
var video=require('/Users/Bharath/WebstormProjects/LearningHub/public/js/video.js');
var slide=require('/Users/Bharath/WebstormProjects/LearningHub/public/js/slide.js');
var image=require('/Users/Bharath/WebstormProjects/LearningHub/public/js/image.js')
var sb=require('/Users/Bharath/WebstormProjects/LearningHub/public/js/safeBrowsing.js');
function scrape(){};
var current_link="";
var videos=['youtube','gfycat','viddler','hulu','vimeo','dotsub','animoto','ted','sapo','mobypicture','moby','dailymotion','circuitlab','coub','kickstarter','sketchfab'];
var slides=['slideshare','speakerdeck','sway','slides','emaze'];
var images=['flickr','flic','smugmug','23hq','hlip','germany','geograph','instagram','instagr.am','infogram','infogr','chartblocks'];
function hostName(link){

    var url=new URL(link);
    return url.hostname;
};
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
module.exports= new scrape();





