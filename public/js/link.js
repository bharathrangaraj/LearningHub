/**
 * Created by Bharath on 08/04/16.
 */
var ogp=require('./ogp.js');
var meta=require('./meta.JS');
function Link(){};
var result={};
result.type='link';
var callback1;
var url;

Link.prototype.getInfo=function(url1,callback){
    callback1=callback;
    url=url1;
    ogp.getInfo(url1,ogTitle);
}

ogTitle=function(og_data){
    if(og_data.title){
        result.title=og_data.title;
        ogDescription(og_data);
    }else{
        meta.getTitle(url,metaTitle)
    }

}

metaTitle=function(meta_title){
    result.title=meta_title;
    ogDescription(og_data);
}

ogDescription=function(og_data){
    if(og_data.description){
        result.description=og_data.description;
        ogImage(og_data);

    }else{
        meta.getDescription(url,metaDescription)
    }
}

ogImage=function(og_data){
    if(og_data.image){
        result.image=og_data.image;
        callback1(result);
    }else{
        meta.getImage(url,metaImage)
    }

}
metaDescription=function(meta_description){
    result.description=meta_description;
    ogImage(og_data,callback);

}

metaImage=function(meta_image){
    result.image=meta_image
    console.log(meta);
    callback1(result)
}

module.exports=new Link();



