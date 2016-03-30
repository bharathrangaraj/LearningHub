/**
 * Created by Bharath on 30/03/16.
 */
var https=require("follow-redirects").https;
var http=require("follow-redirects").http;
var URL=require ('url-parse');

var oembed_list={
    'flickr':'https://www.flickr.com/services/oembed/',
    'flic':'https://www.flickr.com/services/oembed/,' ,
    'smugmug':'https://api.smugmug.com/services/oembed/',
    '23hq':'http://www.23hq.com/23/oembed',
    'hlip':'http://geo.hlipp.de/restapi.php/api/oembed',
    'germany':'http://geo.hlipp.de/restapi.php/api/oembed',
    'geograph':'http://www.geograph.org.gg/api/oembed',
    'instagram':'https://api.instagram.com/oembed',
    'instagr.am':'https://api.instagram.com/oembed',
    'sketchfab':'https://sketchfab.com/oembed',
    'infogram':'https://infogr.am/oembed',
    'infogr':'https://infogr.am/oembed',
    'chartblocks':'http://embed.chartblocks.com/1.0/oembed'
};

function Image(){};
function protocol(link){

    var url=new URL(link);
    return url.protocol;
};

Image.prototype.getDetails=function(url,current_link,callback) {
    var result = {};
    if (oembed_list[current_link]) {
        console.log(prepareoeURL(url, current_link));
        if(protocol(url)=='https:'){
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

        }else{
            http.get(prepareoeURL(url, current_link), function (response) {
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
}

function prepareoeURL(url,current_link){

    return oembed_list[current_link]+'?url='+encodeURIComponent(url)+'&format=json';
}

module.exports=new Image();
