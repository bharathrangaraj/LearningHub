/**
 * Created by Bharath on 20/02/16.
 */
"use strict";
var URL=require ('url-parse');

var video=require('/Users/Bharath/WebstormProjects/LearningHub/public/js/video.js');
function scrape(){};
var videos=['www.youtube.com'];





function hostName(link){

    var url=new URL(link);
    return url.hostname;
};

scrape.prototype.getInfo=function(link,callback){
    var hostname=hostName(link);
    var result={};


    if(contains(videos,hostname)){

        video.getDetails(link,hostname,
            function(res){
                callback(res);
        });
    }

};


function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

module.exports= new scrape();





