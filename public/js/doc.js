/**
 * Created by Bharath on 08/04/16.
 */

var https=require("follow-redirects").https;
var http=require("follow-redirects").http;
var embed=require("./embedHtml.js");
var URL=require ('url-parse');

function Doc(){};

var oembed_list={
    'office':'https://mix.office.com/oembed',
    'docs':'https://docs.com/api/oembed'
};
var result={
    'type':"doc",
    'url':"",
    'title':"",
    'html':""
};

Doc.prototype.getDetails=function(url,host_name,callback){
    result.url=url;
    if(protocol(url)=="https:"){
        if (oembed_list[host_name]) {
            console.log(prepareoeURL(url, host_name));
            https.get(prepareoeURL(url, host_name), function (response) {
                var oe_details = "";
                response.on('data', function (d) {
                    oe_details += d;

                });
                response.on('end', function () {
                    var doc_json = JSON.parse(oe_details);
                    result.title=doc_json.title;
                    result.html=doc_json.html;
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
                    var doc_json = JSON.parse(oe_details);
                    result.title=doc_json.title;
                    result.html=doc_json.html;
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
};

function protocol(link){
    var url=new URL(link);
    return url.protocol;
};



module.exports=new Doc();