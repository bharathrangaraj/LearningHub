/**
 *Created by Bharath on 20/02/16.
 */
"use-strict";

var https=require("follow-redirects").https;
var http=require("follow-redirects").http;
var embedHtml=require('./embedHtml.js');
var ogp=require('/Users/Bharath/WebstormProjects/LearningHub/public/js/ogp.js');
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
    'kickstarter':'https://www.kickstarter.com/services/oembed',
};

function Video(){};

Video.prototype.getDetails=function(url,current_link,callback) {
    var result={};
    result.type="video";
    if(oembed_list[current_link]){
        https.get(prepareoeURL(url,current_link),function(response){
            var oe_details="";
            response.on('data',function(d){
                oe_details+=d;

            });
            response.on('end',function(){
                var json=JSON.parse(oe_details);
                result.title=json.title;
                result.html=json.html;
                if(json.description){
                    result.description=json.description.replace(/(\r\n|\n|\r)/gm,"");
                    prepareHtml(result.html,result.description,function(html){
                        result.html=html;
                        callback(result);
                    });
                }else{
                    result.description=ogp.getOgDescription(url,function(des){
                        result.description=des;
                        prepareHtml(result.html,result.description,function(html){
                            result.html=html;
                            callback(result);
                        });
                    });
                }
            });
            response.on('error',function(err){
                console.log(err)
            })
        });

    }else if (current_link === 'youtube') {
        var ID = YouTubeGetID(url);
        var yt_details = "";
         https.get(prepareytURL(ID), function (response) {
            response.on('data', function (d) {
                yt_details += d;
            });
            response.on('end', function () {
                var json = JSON.parse(yt_details);
                result.title = json.items[0].snippet.title;
                result.description = json.items[0].snippet.description;
                callback(result);
            });
        });
    }
}

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

function prepareytURL(ID){
    var ytURL=ytCreditials.API_URL+"id="+ID+"&key="+ytCreditials.API_kEY+"&part=snippet";

    return ytURL;
}

function prepareoeURL(url,current_link){

    if((current_link=="moby")||(current_link=="mobypicture")){

        return oembed_list[current_link]+'?url='+encodeURIComponent(url)+"&format=json"
    }else{

        return oembed_list[current_link]+'?url='+encodeURIComponent(url);
    }

}
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
            var html=embedHtml.embedVideo(result.src,description);
            callback(html);
        }

    });

}
module.exports= new Video();


