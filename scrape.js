/**
 * Created by Bharath on 20/02/16.
 */
"use strict";
var URL=require ('url-parse');
var video=require('/Users/Bharath/WebstormProjects/LearningHub/video.js');
function scrape(){};
var videos=['www.youtube.com'];



scrape.prototype.hostName=function(link){
    var url=new URL(link);
    return url.hostname;
};

scrape.prototype.getInfo=function(link){
    var hostName=this.hostName(link);

    if(contains(videos,hostName)){
        console.log(hostName);
        var details=video.getDetails(link,hostName);
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





