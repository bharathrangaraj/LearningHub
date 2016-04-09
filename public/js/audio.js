/**
 * Created by Bharath on 07/04/16.
 */

var https=require("follow-redirects").https;
var http=require("follow-redirects").http;
var URL=require ('url-parse');
var ogp=require("./ogp.js");
var embed=require("./embedHtml.js");
function Audio(){};
var oembed_list={
   'audiosnaps':'http://audiosnaps.com/service/oembed',
    'soundcloud':'https://soundcloud.com/oembed',
    'mixcloud':'https://www.mixcloud.com/oembed/',
    'clyp':'https://api.clyp.it/oembed/',
    'huffduffer':'https://huffduffer.com/oembed'

};

Audio.prototype.getDetails=function(url,host_name,callback){
    var result={};
    console.log("in"+host_name);
    result.type='audio';
    if(protocol(url)=="https:"){
        if (oembed_list[host_name]) {
            console.log(prepareoeURL(url, host_name));
            https.get(prepareoeURL(url, host_name), function (response) {
                var oe_details = "";
                response.on('data', function (d) {
                    oe_details += d;

                });
                response.on('end', function () {
                    //console.log("raw"+oe_details);
                    var audio_json = JSON.parse(oe_details);
                    result.title=audio_json.title;
                    result.html=embed.embedAudio(audio_json.html);
                    callback(result);
                });
                response.on('error', function (err) {
                    console.log(err)
                })
            });

        }
    }else{
        if (oembed_list[host_name]) {
            console.log(prepareoeURL(url, host_name));

            http.get(prepareoeURL(url, host_name), function (response) {
                var oe_details = "";
                response.on('data', function (d) {
                    oe_details += d;

                });
                response.on('end', function () {
                    //console.log("raw"+oe_details);
                    var audio_json = JSON.parse(oe_details);
                    result.title=audio_json.title;
                    result.html=embed.embedAudio(audio_json.html);
                    callback(result);
                });
                response.on('error', function (err) {
                    console.log(err)
                })
            });

        }
    }
}

function prepareoeURL(url,host_name){
    return oembed_list[host_name]+'?url='+encodeURIComponent(url)+'&format=json';
};

function protocol(link){

    var url=new URL(link);
    return url.protocol;
};


module.exports=new Audio();

