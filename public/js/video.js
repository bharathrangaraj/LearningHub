/**
 *Created by Bharath on 20/02/16.
 */
"use-strict";

var https=require("follow-redirects").https;
var http=require("follow-redirects").http;
var ytCreditials={
    'API_URL':"https://www.googleapis.com/youtube/v3/videos?",
    'API_kEY':"AIzaSyAj_omzCHA7TT6YBIJtECHwVQnU8UuzgdU"
};
var oembed_list={
    'viddler':' https://developers.viddler.com/documentation/oembed/',
    'hulu':'https://www.hulu.com/api/oembed.json',
    'vimeo':'https://vimeo.com/api/oembed.json',
    'dotsub':'https://dotsub.com/services/oembed',
    'animoto':'https://animoto.com/oembeds/create',
    'ted':'https://www.ted.com/services/v1/oembed.json',
    'sapo':'https://videos.sapo.pt/oembed',
    'mobypicture':'https://api.mobypicture.com/oEmbed',
    'moby':'https://api.mobypicture.com/oEmbed',
    'dailymotion':'https://www.dailymotion.com/services/oembed',
    'circuitlab':'https://www.circuitlab.com/circuit/oembed/',
    'coub':'https://coub.com/api/oembed.json',
    'kickstarter':'https://www.kickstarter.com/services/oembed',
};

function Video(){};

Video.prototype.getDetails=function(url,current_link,callback) {
    var result={};
    if(oembed_list[current_link]){
        console.log(prepareoeURL(url,current_link));
        https.get(prepareoeURL(url,current_link),function(response){
            var oe_details="";
            response.on('data',function(d){
                oe_details+=d;

            });
            response.on('end',function(){
                //coubconsole.log(oe_details)
                var json=JSON.parse(oe_details);
                callback(json);
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
        console.log(1);
        return oembed_list[current_link]+'?url='+encodeURIComponent(url)+"&format=json"
    }else{
        console.log(2);
        return oembed_list[current_link]+'?url='+encodeURIComponent(url);
    }

}
module.exports= new Video();


