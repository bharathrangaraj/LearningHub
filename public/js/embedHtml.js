/**
 * Created by Bharath on 08/04/16.
 */
var S=require('string');
var _=require('lodash');

function EmbedHtml(){};

//Embed code for videos
EmbedHtml.prototype.embedVideo=function(url,description){
var video_html='<div class="col-lg-7">' +
        '<iframe src="'+url+'" width="100%" height="300"></iframe>'+
    '</div>'+
    '<div class="col-md-5 hidden-md hidden-sm hidden-xs">'+
        '<div class="description">Description</div>'+
        '<p class="text-justify">'+description+'</p>'+
    '</div>';
    return video_html;
};
//Embed code for stories
EmbedHtml.prototype.embedStory=function(html){
    var escaped= html.replace(/(\r|\n|\n\r|\r\n)/gm,"");
    var story_html='<div class="col-xs-12">'+
            escaped+
            '</div>';
    return story_html;
};
//Embed code for audios
EmbedHtml.prototype.embedAudio=function(raw_html){
    var html= raw_html.replace(/(\r|\n|\n\r|\r\n)/gm,"");
    var audio_html='<div class="col-xs-12">'+
        html+
        '</div>';
    return audio_html;
};
//Embed code for docs
EmbedHtml.prototype.embedDocs=function(raw_html){
    var html= raw_html.replace(/(\r|\n|\n\r|\r\n)/gm,"");
    var doc_html='<div class="col-xs-12">'+
        html+
        '</div>';
    return doc_html;
};

module.exports=new EmbedHtml();
