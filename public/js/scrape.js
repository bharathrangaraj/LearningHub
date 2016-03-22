/**
 * Created by Bharath on 20/02/16.
 */
"use strict";
var URL=require ('url-parse');

var video=require('/Users/Bharath/WebstormProjects/LearningHub/public/js/video.js');
var sb=require('/Users/Bharath/WebstormProjects/LearningHub/public/js/safeBrowsing.js');
function scrape(){};
var videos=['www.youtube.com'];
function hostName(link){

    var url=new URL(link);
    return url.hostname;
};
scrape.prototype.getInfo=function(link,callback){

    checkUrl(link,function(legit){
        if(legit){

            var hostname=hostName(link);
            if(contains(videos,hostname)){

                video.getDetails(link,hostname,
                    function(res){
                        callback(res);
                    });
            }
        }else{
            console.log(legit);
        }
    });
};
function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
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





