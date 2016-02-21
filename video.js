/**
 * Created by Bharath on 20/02/16.
 */
"use-strict";

function video(){};

video.prototype.getDetails=function(url,hostName){
    if(hostName==='www.youtube.com'){
        var ID=YouTubeGetID(url);
        
        console.log(ID);
    }


};


function YouTubeGetID(url){
    var ID = '';
    url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if(url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
    }
    else {
        ID = url;
    }
    return ID;
}

module.exports=new video();
