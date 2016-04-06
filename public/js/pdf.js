/**
 * Created by Bharath on 06/04/16.
 */



var google_viewer="https://drive.google.com/viewerng/viewer?url=";
var meta = require('metatags');


function Pdf(){};




Pdf.prototype.getInfo=function(url,callback){
    var result={};
    result.html=google_viewer+encodeURI(url);
    meta(result.html, function(err, data){
        result.title=data.title;
        result.thumbnail=data.otherimages[0].src;
        callback(result);
    });

}


module.exports=new Pdf();