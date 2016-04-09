/**
 * Created by Bharath on 30/03/16.
 */
var og=require('og-parser');

function Ogp(){};


Ogp.prototype.getOgDescription=function(url,callback){
    Ogp.prototype.getInfo(url,function(og_data){
       callback(og_data.description);
    });
};
Ogp.prototype.getOgTitle=function(url,callback){
    Ogp.prototype.getInfo(url,function(og_data){
        callback(og_data.title);
    });
};
Ogp.prototype.getOgImage=function(url,callback){
    Ogp.prototype.getInfo(url,function(og_data){
        callback(og_data.image);
    });
};

Ogp.prototype.getInfo=function(url,callback){
    var og_data={};
    og(url, function(error, data) {
            if(error){
                console.log(error);
            }else{
                og_data.description=data.og.description;
                og_data.title=data.og.title;
                og_data.image=data.og.image.url;
                callback(og_data);
            }
        }
    );
};

module.exports=new Ogp();