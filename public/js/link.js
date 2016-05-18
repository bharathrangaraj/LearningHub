/**
 * Created by Bharath on 08/04/16.
 */
var ogp=require('./ogp.js');
var meta=require('./meta.JS');
var URL=require ('url-parse');
var favicon = require('favicon');
var validUrl = require('valid-url');
function Link(){}
//result object initialization
var result={
    type:'link',
    title:"",
    description:"",
    image:"",
    url:"",
    html:"",
    favicon:"",
    name:""
};
//get the information of the general link
//looks for the ogp data and the meta information
Link.prototype.getInfo=function(url,callback){
    result.url=url;
    ogp.getInfo(url,function(data) {
        if (data.og) {
            if (data.og.title) {
                result.title = data.og.title;

            } else {
                if (data.title) {
                    result.title = data.title.replace(/(\r|\n|\n\r|\r\n)/gm, "");
                }
            }

            if (data.og.image) {
                result.image = data.og.image.url;

            } else {
                if (data.images) {
                    result.image = getImageUrl(data.images, url)
                }
            }

            if (data.og.description) {
                result.description = data.og.description;
                result.name=getName(url);
                getFavicon(url, function (favicon) {
                    result.favicon = favicon;
                    callback(result);
                });
            } else {

                    result.description=getDescription(url,function(description){
                        result.description=description;
                        result.name=getName(url);
                        getFavicon(url, function (favicon) {
                            result.favicon = favicon;
                            callback(result);
                        });
                    });
            }

        } else {
            if (data.title) {
                result.title = data.title.replace(/(\r|\n|\n\r|\r\n)/gm, "");
            }
            if (data.images) {
                result.image = getImageUrl(data.images, url);
            }

                result.description= getDescription(url,function(description){

                        result.description=description;
                    result.name=getName(url);
                    getFavicon(url, function (favicon) {
                        result.favicon = favicon;
                        callback(result);
                    });

                });
        }

    });
};
//get the correct url for image-image url can be of these three types
//protocol://hostname/path
//*://hostname/path
//*://*/path
function getImageUrl(images,url){

    var final_url=get_thumbnail(images);

    if(final_url!=""){
        var parse_image_url=new URL(final_url,true);
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
    return "";

};
//to get the favicon of the website
function getFavicon(url,callback){
    favicon(url, function(err, favicon_url) {
        callback(favicon_url);
    });
}
//to check whether image URL is valid
function validURI(URI){
    return validUrl.is_web_uri(URI);
}
//get the description from the meta tags
function getDescription(url,callback){
    meta.getDescription(url,function(description){
        var des="";
        if(description){
            des=description;

        }
        callback(des.replace(/(\r|\n|\n\r|\r\n)/gm, ""));

    })
}
//get the name of the URl without www
function getName(url){
var url_name=new URL(url);
    var hostname=url_name.host;
    return hostname.includes("www.")?hostname.replace("www.",""):hostname;
}

function get_thumbnail(images){

    var min_size=5000;
    var aspect_ratio=3;
    var max_size=0;
    var src="";
    images.sort(compare);

    images.forEach(function(img,index){
        if(img.src){

            if(img.width && img.height){
                var size= img.width*img.height;
                var ratio=(img.width/img.height);
                if((size>=min_size)&&(ratio<aspect_ratio)){
                    if(size>max_size){
                        src=img.src;
                    }
                }
            }
        }
    });
    return src;
};

function compare(a,b) {
    if (a.src < b.src)
        return -1;
    else if (a.src > b.src)
        return 1;
    else
        return 0;
}

module.exports=new Link();


