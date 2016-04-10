/**
 * Created by Bharath on 06/04/16.
 */
var embed=require("./embedHtml.js");
var google_viewer="https://drive.google.com/viewerng/viewer?url=";
var meta = require('metatags');



function Pdf(){};




Pdf.prototype.getInfo=function(url,callback){
    var result={};
    result.src=google_viewer+encodeURI(url);
    console.log(result.src);
    meta(result.src, function(err, data){
        console.log(data);
        result.title=data.title;
        result.thumbnail="https:"+data.otherimages[0].src;
        result.html=embed.embedPdf(result);
        callback(result);
    });

}


module.exports=new Pdf();