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

//Embed code for pdf
//conten.title,content.description,content.image
EmbedHtml.prototype.embedPdf=function(content){
    //var description=content.description.slice(0,497)+'...';
    var src=content.src+'&embedded=true';
    var image=content.thumbnail;
    var html='<div class="col-xs-12">'+
            '<div class="col-xs-6">'+
                '<a href="'+src+'">'+
                '<img src="'+
                image+
                '"'+
                'height="500px" width="100%">'+
                '</a>'+
            '</div>'+
            '<div class="col-xs-6">'+
                '<iframe src="'+
                 src+
                '"'+
                'height="500px" width="100%">'+
            '</iframe>'+
            '</div>'+
            '</div>';
    return html;

};

EmbedHtml.prototype.embedSlide=function(raw_html){
    //var html=norm_iframe(raw_html.replace(/(\r|\n|\n\r|\r\n)/gm,""));
    console.log("inside")
    var slide_html='<div class="col-xs-12">'+
        raw_html+
        '</div>';
    return slide_html;

};
//Embed code for image
EmbedHtml.prototype.embedImage=function(raw_html){
    var html= raw_html.replace(/(\r|\n|\n\r|\r\n)/gm,"");
    var audio_html='<div class="col-xs-12">'+
        html+
        '</div>';
    return audio_html;
};
//Embed code for links
EmbedHtml.prototype.embedLink=function(result){
    var link_html="";
    if(result.image!=""){
        link_html='<div class="col-xs-12">'+
            '<img src="'+result.image+'">'+
            '</div>'+
            '<div class="col-xs-12 pull left">'+
                '<img src="'+
                result.favicon+
                '" width="12px" height="12px"><span>'+
            result.name+
            '</span>'+
                '</div>'+
            '<div class="col-xs-12 desc">'+
            '<p>'+
            result.description+
                '</p>'+
            '<p>'+
                ' Read this on <span><a href="'+
                result.url+
            '"></a>'+
                result.name+
                '</span>'+
                '</p></div></div>';
        return link_html;


    }else{
        link_html='<div class="col-xs-12 pull left">'+
        '<img src="'+
        result.favicon+
        '" width="12px" height="12px"><span>'+
        result.name+
        '</span>'+
        '</div>'+
        '<div class="col-xs-12 desc">'+
        '<p>'+
        result.description+
        '</p>'+
        '<p>'+
        ' Read this on <span><a href="'+
        result.url+
        '"></a>'+
        result.name+
        '</span>'+
        '</p></div></div>';
        return link_html;
    }

};

module.exports=new EmbedHtml();
