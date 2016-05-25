/**
 * Created by Bharath on 30/03/16.
 */
var https=require("follow-redirects").https;
var http=require("follow-redirects").http;
var URL=require ('url-parse');
var video=require("./video.js");
var h2js=require('html-to-json');
var embed=require('./embedHtml.js');

var oembed_list={
    'flickr':'https://www.flickr.com/services/oembed/',
    'flic':'https://www.flickr.com/services/oembed/,' ,
    '23hq':'http://www.23hq.com/23/oembed',
    'hlip':'http://geo.hlipp.de/restapi.php/api/oembed',
    'germany':'http://geo.hlipp.de/restapi.php/api/oembed',
    'geograph':'http://www.geograph.org.gg/api/oembed',
    'infogram':'https://infogr.am/oembed',
    'infogr':'https://infogr.am/oembed',
    'chartblocks':'https://embed.chartblocks.com/1.0/oembed'
};

function Image(){};
var image_result={
    'type':"image",
    'url':"",
    'title':"",
    'description':"",
    'html':""
};

//image details
Image.prototype.getDetails=function(url,host_name,callback){
     image_result.url=url;
        if(oembed_list[host_name]){
            ahelper.get(prepareoeURL(url, host_name),function(d){
                image_result.title=d.title;
                if(d.html){
                    image_result.html=d.html;
                    callback(image_result);
                } else if(d.url){
                    image_result.html=prepareHtml(d.url);
                    callback(image_result);
                }
                callback(image_result);
            });
        }else if(host_name=="smugmug"){
            ahelper.get('https://api.smugmug.com/services/oembed/'+'?url='+encodeURIComponent(url)+'&format=json',function(d){
                image_result.title=d.title;
                if(image_json.type=='video'){
                    image_result.type='video';
                    prepareSMHtml(image_json.html,function(html){
                        image_result.html=html;
                        callback(image_result);
                    })
                }else{
                    image_result.html=prepareHtml(image_json.url);
                    callback(image_result);
                }
                callback(image_result);
            });
        }else{
            image_result.html=embed.embedImage(prepareHtml(url));
            var title=host_name.split('.');
            image_result.title=title[title.length-2];
            callback(image_result);
        }
};
// prepare oe url
function prepareoeURL(url,current_link){

    return oembed_list[current_link]+'?url='+encodeURIComponent(url)+'&format=json';
}
//prepare html for images
function prepareHtml(url){
    return '<img src='+url+' style="width:100%;height:500px">';
}
//prepare HTML for smugmug
function prepareSMHtml(ht,callback){
    h2js.parse(ht, {
        'src': function ($doc) {
            return $doc.find('iframe').attr('src');
        }
    }, function (err, image_result) {
        if(err){
            console.log(err);
        }else{
            var html='<iframe src="'+image_result.src+'" scrolling="no" frameborder="0" width="100%" height="360" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
            callback(html)
        }

    });

}

module.exports=new Image();
