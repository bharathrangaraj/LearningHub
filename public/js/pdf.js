/**
 * Created by Bharath on 06/04/16.
 */

var google_viewer="https://drive.google.com/viewerng/viewer?url=";
var meta = require('metatags');

function Pdf(){}

var pdf_result={
    'type':"pdf",
    'url':"",
    'title':"",
    'image':"",
    'html':""
};
Pdf.prototype.getInfo=function(url,callback){

    pdf_result.url=google_viewer+encodeURI(url);
    console.log(pdf_result.src);
    meta(pdf_result.url, function(err, data){
        pdf_result.title=data.title;
        pdf_result.image="https:"+data.otherimages[0].src;
        pdf_result.html="";
        callback(pdf_result);
    });

};


module.exports=new Pdf();