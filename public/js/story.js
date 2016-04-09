/**
 * Created by Bharath on 07/04/16.
 */

var https=require("follow-redirects").https;
var http=require("follow-redirects").http;
var embedHtml=require('./embedHtml.js');
var URL=require ('url-parse');
var ogp=require("./ogp.js");
function Story(){};
var oembed_list={
    'verse':'https://verse.media/services/oembed/',
    'amcharts':'https://live.amcharts.com/oembed/',
    'chartblocks':'https://embed.chartblocks.com/1.0/oembed',
    repubhub:'http://repubhub.icopyright.net/oembed.act'
};




Story.prototype.getDetails=function(url,host_name,callback){
    var result={};
    console.log("in"+host_name);
    result.type='story';
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
                    var story_json = JSON.parse(oe_details);
                    result.title=story_json.title;
                    result.html=embedHtml.embedStory(story_json.html);
                    callback(result);
                });
                response.on('error', function (err) {
                    console.log(err)
                })
            });

        }else if(host_name=='silk'){
            ogp.getInfo(url,function(ogpData){
                result.title=ogpData.title;
                result.description=ogpData.description;
                result.html=prepareSilkhtml(url);
                callback(result);
            })

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
                    var story_json = JSON.parse(oe_details);
                    result.title=story_json.title;
                    result.html=embedHtml.embedStory(story_json.html);;
                    callback(result);
                });
                response.on('error', function (err) {
                    console.log(err)
                })
            });

        }
    }

};

function prepareoeURL(url,host_name){
    return oembed_list[host_name]+'?url='+encodeURIComponent(url)+'&format=json';
}

function prepareSilkhtml(url){
    var silk_html='<iframe src="'+url+'" width="100%" height="300"></iframe>'
    return  embedHtml.embedStory(silk_html);
}
function protocol(link){

    var url=new URL(link);
    return url.protocol;
};

module.exports=new Story();