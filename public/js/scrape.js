/**
 * Created by Bharath on 20/02/16.
 */
"use strict";
var URL=require ('url-parse');

var video=require('/Users/Bharath/WebstormProjects/LearningHub/public/js/video.js');
var slide=require('/Users/Bharath/WebstormProjects/LearningHub/public/js/slide.js');
var image=require('/Users/Bharath/WebstormProjects/LearningHub/public/js/image.js')
var sb=require('/Users/Bharath/WebstormProjects/LearningHub/public/js/safeBrowsing.js');
function scrape(){};
var current_link="";
var videos=['youtube','gfycat','viddler','hulu','vimeo','dotsub','animoto','ted','sapo','mobypicture','moby','dailymotion','circuitlab','coub','kickstarter'];
var slides=['slideshare','speakerdeck'];
var images=['flickr','flic','smugmug','23hq','hlip','germany','geograph','instagram','instagr.am','sketchfab','infogram','infogr','chartblocks'];
function hostName(link){

    var url=new URL(link);
    return url.hostname;
};
scrape.prototype.getInfo=function(link,callback){

    checkUrl(link,function(legit){
        if(legit){

            var hostname=hostName(link);
            if(contains(videos,hostname)){

                video.getDetails(link,current_link,
                    function(res){
                        callback(res);
                    });
            }else if(contains(slides,hostname)){
                slide.getDetails(link,current_link,
                    function(res){
                        callback(res);
                    });
            }else if(contains(images,hostname)){
                image.getDetails(link,current_link,
                    function(res){
                        callback(res);
                    });
            }


        }else{
            console.log(legit);
        }
    });
};
function contains(videos,hostname) {
    for (var i = 0; i < videos.length; i++) {
        var sub_str=videos[i];
        if(hostname.indexOf(sub_str)>-1){
            current_link=videos[i];
            return true;
        }
    }
    return false;
}
function checkUrl(link,callback){

    sb.checkUrl(link,function(legit){
        console.log(legit);
        callback(legit);
    });
}
module.exports= new scrape();





