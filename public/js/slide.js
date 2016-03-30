/**
 * Created by Bharath on 30/03/16.
 */
var https=require("follow-redirects").https;
var http=require("follow-redirects").http;

var oembed_list={
    'slideshare':'https://www.slideshare.net/api/oembed/2',
    'speakerdeck':' https://speakerdeck.com/oembed.json'
};

function Slide(){};

Slide.prototype.getDetails=function(url,current_link,callback) {
    var result = {};
    if (oembed_list[current_link]) {
        console.log(prepareoeURL(url, current_link));
        https.get(prepareoeURL(url, current_link), function (response) {
            var oe_details = "";
            response.on('data', function (d) {
                oe_details += d;

            });
            response.on('end', function () {
                //coubconsole.log(oe_details)
                var json = JSON.parse(oe_details);
                callback(json);
            });
            response.on('error', function (err) {
                console.log(err)
            })
        });

    }
}

function prepareoeURL(url,current_link){

        return oembed_list[current_link]+'?url='+encodeURIComponent(url)+'&format=json';
}

module.exports=new Slide();
