/**
 * Created by Bharath on 06/04/16.
 */

var google_viewer="https://drive.google.com/viewerng/viewer?url=";
var meta = require('metatags');



function Pdf(){};

var result={
    'type':"pdf",
    'url':"",
    'title':"",
    'image':"",
    'html':""
};


Pdf.prototype.getInfo=function(url,callback){

    result.url=google_viewer+encodeURI(url);
    console.log(result.src);
    meta(result.url, function(err, data){
        console.log(data);
        result.title=data.title;
        result.image="https:"+data.otherimages[0].src;
        result.html="";
        callback(result);
    });

};


module.exports=new Pdf();