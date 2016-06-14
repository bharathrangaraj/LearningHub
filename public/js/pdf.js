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
    meta(pdf_result.url, function(err, data){
        if(err){
            callback(err,null);
        }else{
            pdf_result.title=data.title;
            pdf_result.image="https:"+data.otherimages[0].src;
            pdf_result.html=prepareHtml(pdf_result.url);
            callback(pdf_result);
        }
    });

};

function prepareHtml(url){
    url=url+'&embedded=true';
    return '<iframe src="'+url+'" scrolling="no" frameborder="0" width="100%" height="500" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
}

module.exports=new Pdf();