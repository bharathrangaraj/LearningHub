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
function protocol(link){

    var url=new URL(link);
    return url.protocol;
};

Image.prototype.getDetails=function(url,host_name,callback) {
    var result = {};
    result.type="image";

    if (oembed_list[host_name]) {
        console.log(prepareoeURL(url, host_name));
        if(protocol(url)=='https:'){
            https.get(prepareoeURL(url,host_name), function (response) {
                var oe_details = "";
                response.on('data', function (d) {
                    oe_details += d;

                });
                response.on('end', function () {
                    //coubconsole.log(oe_details)
                    var image_json = JSON.parse(oe_details);
                    result.title=image_json.title;
                    if(image_json.html){
                        result.html=embed.embedImage(image_json.html);
                        callback(result);
                    } else if(image_json.url){
                        result.html=embed.embedImage(prepareHtml(image_json.url));
                        callback(result);
                    }

                });
                response.on('error', function (err) {
                    console.log(err)
                })
            });

        }else{
            http.get(prepareoeURL(url, host_name), function (response) {
                var oe_details = "";
                response.on('data', function (d) {
                    oe_details += d;

                });
                response.on('end', function () {
                    //coubconsole.log(oe_details)
                    var image_json = JSON.parse(oe_details);
                    result.title=image_json.title;
                    if(image_json.html){
                        result.html=embed.embedImage(image_json.html);
                        callback(result);
                    } else if(image_json.url){
                        result.html=embed.embedImage(prepareHtml(image_json.url));
                        callback(result);
                    }
                });
                response.on('error', function (err) {
                    console.log(err)
                })
            });
        }
    }else if(host_name=="smugmug"){

        https.get('https://api.smugmug.com/services/oembed/'+'?url='+encodeURIComponent(url)+'&format=json', function (response) {
            var oe_details = "";
            response.on('data', function (d) {
                oe_details += d;

            });
            response.on('end', function () {
                //coubconsole.log(oe_details)
                var image_json = JSON.parse(oe_details);
                result.title=image_json.title;
                if(image_json.type=='video'){
                    result.type='video';

                    prepareSMHtml(image_json.html,function(html){
                        result.html=embed.embedImage(html);
                        callback(result);
                    })
                }else{
                    result.html=embed.embedImage(prepareHtml(image_json.url));
                    callback(result);
                }

            });
            response.on('error', function (err) {
                console.log(err)
            })
        });
    }else{
        result.html=embed.embedImage(prepareHtml(url));
        var title=host_name.split('.');
        result.title=title[title.length-2];
        callback(result);
    }
}

function prepareoeURL(url,current_link){

    return oembed_list[current_link]+'?url='+encodeURIComponent(url)+'&format=json';
}

function prepareHtml(url){
    return '<img src='+url+' style="width:100%;height:500px">';
}

function prepareSMHtml(ht,callback){
    h2js.parse(ht, {
        'src': function ($doc) {
            return $doc.find('iframe').attr('src');
        }
    }, function (err, result) {
        if(err){
            console.log(err);
        }else{
            var html='<iframe src="'+result.src+'" scrolling="no" frameborder="0" width="100%" height="360" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
            callback(html)
        }

    });

}

module.exports=new Image();
