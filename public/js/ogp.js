/**
 * Created by Bharath on 30/03/16.
 */
var og=require('og-parser');

function Ogp(){};


Ogp.prototype.getOgDescription=function(url,callback){
    og(url, function(error, data) {
        if(error){
            console.log(error);
        }else{

            callback(data.og.description);
        }
    }
);
};

module.exports=new Ogp();