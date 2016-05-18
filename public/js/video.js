/**
 *Created by Bharath on 20/02/16.
 */
"use-strict";

var https=require("follow-redirects").https;
var http=require("follow-redirects").http;
var ogp=require('./ogp.js');
var ahelper=require("./aggHelper.js");
var h2js=require('html-to-json');
var ytCreditials={
    'API_URL':"https://www.googleapis.com/youtube/v3/videos?",
    'API_kEY':"AIzaSyAj_omzCHA7TT6YBIJtECHwVQnU8UuzgdU"
};
var oembed_list={
    'vimeo':'https://vimeo.com/api/oembed.json',
    'dotsub':'https://dotsub.com/services/oembed',
    'ted':'https://www.ted.com/services/v1/oembed.json',
    'sapo':'https://videos.sapo.pt/oembed',
    'dailymotion':'https://www.dailymotion.com/services/oembed',
    'circuitlab':'https://www.circuitlab.com/circuit/oembed/',
    'coub':'https://coub.com/api/oembed.json',
    'kickstarter':'https://www.kickstarter.com/services/oembed'
};
//init of the return variable
var result={
    'type':"video",
    'url':"",
    'description':"",
    'title':"",
    'html':""
};
//video prototype
function Video(){};
//get the video details
Video.prototype.getDetails=function(url,host_name,callback) {
    result.url = url;
    var prepared_url = "";
    //prepare the url
    if (oembed_list[host_name]) {
        prepared_url = prepareoeURL(url, host_name);
    } else if (host_name == 'youtube') {
        var ID = YouTubeGetID(url);
        prepared_url = prepareytURL(ID)
    }
    //use the helper to tget the JSON data
    ahelper.getHttps(prepared_url, function (d) {
        if (d =="") {


        } else {
            if (host_name === 'youtube') {
                console.log("d" +d);
                result.title = d.items[0].snippet.title;
                result.description = d.items[0].snippet.description;
                result.html = prepareytHtml(url.replace("watch?v=", "embed/"));
                callback(result);
            } else {
                result.title = d.title;
                result.html = d.html;
                videoDescription(d, function (des) {
                    result.description = des;
                    prepareHtml(result.html, result.description, function (html) {
                        result.html = html;
                        callback(result);
                    });

                });
            }

        }
    });
};
//get the ID of the youTube video from its URL
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
//preparing youTube url
function prepareytURL(ID){
    var ytURL=ytCreditials.API_URL+"id="+ID+"&key="+ytCreditials.API_kEY+"&part=snippet";
    return ytURL;
}
//preparing oembed url
function prepareoeURL(url,host_name){
        return oembed_list[host_name]+'?url='+encodeURIComponent(url);
}
//prepare html for oembed video sites
function prepareHtml(ht,description,callback){
    h2js.parse(ht, {
        'src': function ($doc) {
            return $doc.find('iframe').attr('src');
        }
    }, function (err, result) {
        if(err){
            console.log(err);
            callback(ht);
        }else{
            var html='<iframe ng-src="'+result.src+'" width="100%" height=300px></iframe>';
            callback(html);
        }

    });

}
//get description
function videoDescription(d,callback){
    if (!d.description) {
        ogp.getOgDescription(result.url, function (des) {
            callback(des.replace(/(\r\n|\n|\r)/gm, ""))
        });
    }else
        {
            callback(d.description.replace(/(\r\n|\n|\r)/gm, ""));
        }
}

function prepareytHtml(url){
  return '<iframe src="'+url+'" width="100%" height=300px></iframe>';
};
module.exports= new Video();


