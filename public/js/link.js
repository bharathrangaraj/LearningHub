/**
 * Created by Bharath on 08/04/16.
 */
var ogp=require('./ogp.js');
var meta=require('./meta.JS');
var URL=require ('url-parse');
var favicon = require('favicon');
var validUrl = require('valid-url');
function Link(){};

//result object initialization
var result={
    type:'link',
    title:"",
    description:"",
    image:"",
    url:"",
    html:"",
    favicon:""
};
//get the information of the general link
//looks for the ogp data and the meta information
Link.prototype.getInfo=function(url,callback){
    result.url=url;
    ogp.getInfo(url,function(data) {
        console.log(data);
        if (data.og) {
            console.log('in data.og');
            if (data.og.title) {
                result.title = data.og.title;

            } else {
                if (data.title) {
                    result.title = data.title.replace(/(\r|\n|\n\r|\r\n)/gm, "");
                }
            }
            if (data.og.description) {
                result.description = data.og.description;
            } else {
                if (data.description) {
                    result.description= data.description.replace(/(\r|\n|\n\r|\r\n)/gm, "");
                }
            }
            if (data.og.image) {
                result.image = data.og.image.url;


            } else {
                if (data.images) {
                    result.image = getImageUrl(data.images[0].src, url)
                }
            }
        } else {
            if (data.title) {
                result.title = data.title.replace(/(\r|\n|\n\r|\r\n)/gm, "");
            }
            if (data.description) {
                result.description= data.description.replace(/(\r|\n|\n\r|\r\n)/gm, "");
            }
            if (data.images) {
                result.image = getImageUrl(data.images[0].src, url)
            }
        }
        getFavicon(url, function (favicon) {
            result.favicon = favicon;
            callback(result);
        })
    });
}



function getImageUrl(image_url,url){
    var final_url=image_url;
var parse_image_url=new URL(image_url,true);
var parse_link_url=new URL(url,true);
   var protocol=parse_link_url.protocol;
    var hostname=parse_link_url.hostname;
    if(validURI(final_url)){
        return final_url;
    }
    if(parse_image_url.protocol){
        return final_url;
    }else{
        final_url=protocol+image_url;
        if(validURI(final_url)){
            return final_url;
        }else{
            final_url=protocol+hostname+image_url;
            return final_url;
        }
    }
}

function getFavicon(url,callback){
    favicon(url, function(err, favicon_url) {
        callback(favicon_url);
    });
}

function validURI(URI){
    return validUrl.is_web_uri(URI);
}


module.exports=new Link();


