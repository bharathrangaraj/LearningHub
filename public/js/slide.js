/**
 * Created by Bharath on 30/03/16.
 */
var https=require("follow-redirects").https;
var http=require("follow-redirects").http;
var h2js=require('html-to-json');
var ogp=require("./ogp.js");

var oembed_list={
    'slideshare':'https://www.slideshare.net/api/oembed/2',
    'speakerdeck':' https://speakerdeck.com/oembed.json',
    'sway':'https://sway.com/api/v1.0/oembed'
};

function Slide(){};

Slide.prototype.getDetails=function(url,host_name,callback) {
    var result = {};
    result.type="slide";
    if (oembed_list[host_name]) {
        console.log(prepareoeURL(url, host_name));
        https.get(prepareoeURL(url, host_name), function (response) {
            var oe_details = "";
            response.on('data', function (d) {
                oe_details += d;

            });
            response.on('end', function () {
                var slide_json = JSON.parse(oe_details);
                result.title=slide_json.title;
                prepareOeHtml(slide_json.html,function(html){
                    result.html=html;
                })
                callback(result);
            });
            response.on('error', function (err) {
                console.log(err)
            })
        });

    }else if(host_name=="slides" || host_name=="emaze"){
        ogp.getInfo(url,function(ogp_data){
            result.title=ogp_data.title;
            result.description=ogp_data.description;
            result.html=prepareHtml(url)
            callback(result);
        })
    }
}

function prepareoeURL(url,current_link){

        return oembed_list[current_link]+'?url='+encodeURIComponent(url)+'&format=json';
}

function prepareOeHtml(ht,callback){
    h2js.parse(ht, {
        'src': function ($doc) {
            return $doc.find('iframe').attr('src');
        }
    }, function (err, result) {
        if(err){
            console.log(err);
        }else{
            var html='<iframe src="'+result.src+'" scrolling="no" frameborder="0" width="100%" height="300" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
            callback(html)
        }

    });

}

function prepareHtml(url){
    return '<iframe src="'+url+'" scrolling="no" frameborder="0" width="100%" height="300" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
}

module.exports=new Slide();
