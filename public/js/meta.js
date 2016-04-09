/**
 * Created by Bharath on 08/04/16.
 */
var meta = require('metatags');
function Meta(){};


Meta.prototype.getTitle=function(url,callback){
    Meta.prototype.getInfo(url,function(meta_data){
       callback(meta_data.title);
    });

};

Meta.prototype.getDescription=function(url,callback){
    Meta.prototype.getInfo(url,function(meta_data){
        callback(meta_data.description);
    });

};
Meta.prototype.getImage=function(url,callback){
    Meta.prototype.getInfo(url,function(meta_data){
        callback(meta_data.image);
    });

}

Meta.prototype.getInfo=function(url,callback){
    var meta_data={};
    meta(url,function(err,data){
        meta_data.title=data.title;
        meta_data.description=data.description;
        meta_data.image=data.otherimages[(data.otherimages.length)/2];
        callback(data);
    })
}

module.exports=new Meta();
