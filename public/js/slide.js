/**
 * Created by Bharath on 30/03/16.
 */
var ahelper=require("./aggHelper.js");
var h2js=require('html-to-json');
var ogp=require("./ogp.js");

var oembed_list={
    'slideshare':'https://www.slideshare.net/api/oembed/2',
    'speakerdeck':' https://speakerdeck.com/oembed.json',
    'sway':'https://sway.com/api/v1.0/oembed'
};

function Slide(){}
//init result variable
var slide_result={
    'type':"slide",
    'url':"",
    'title':"",
    'html':""
};

Slide.prototype.getDetails=function(url,host_name,callback) {
    slide_result.url=url;
    if (oembed_list[host_name]) {
        ahelper.get(prepareoeURL(url,host_name),function(d){
            slide_result.title=d.title;
            prepareOeHtml(slide_json.html,function(html){
                slide_result.html=html;
                callback(slide_result);
            });

        });
    }else if(host_name=="slides" || host_name=="emaze"){
        ogp.getInfo(url,function(ogp_data){
            slide_result.title=ogp_data.title;
            slide_result.description=ogp_data.description;
            slide_result.html=prepareHtml(url);
            callback(slide_result);

        })
    }
};
//prepare oe url
function prepareoeURL(url,current_link){

        return oembed_list[current_link]+'?url='+encodeURIComponent(url)+'&format=json';
}
//prepare HTMl for  oe slides
function prepareOeHtml(ht,callback){
    h2js.parse(ht, {
        'src': function ($doc) {
            return $doc.find('iframe').attr('src');
        }
    }, function (err, slide_result) {
        if(err){
            console.log(err);
        }else{
            var html='<iframe src="'+slide_result.src+'" scrolling="no" frameborder="0" width="100%" height="300" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
            callback(html)
        }

    });

}
//prepare HTML for other slides
function prepareHtml(url){
    return '<iframe src="'+url+'" scrolling="no" frameborder="0" width="100%" height="300" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
}

module.exports=new Slide();
