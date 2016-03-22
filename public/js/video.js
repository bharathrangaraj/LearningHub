/**
 * Created by Bharath on 20/02/16.
 */
"use-strict";

var https=require("https");
var ytCreditials={
    'API_URL':"https://www.googleapis.com/youtube/v3/videos?",
    'API_kEY':"AIzaSyAj_omzCHA7TT6YBIJtECHwVQnU8UuzgdU"
};

function Video(){};

Video.prototype.getDetails=function(url,hostName,callback) {
    var result={};
    if (hostName === 'www.youtube.com') {
        var ID = YouTubeGetID(url);


        var details = "";


        var request = https.get(prepareytURL(ID), function (response) {

            response.on('data', function (d) {

                details += d;

            });

            response.on('end', function () {

                var json = JSON.parse(details);

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
module.exports= new Video();


