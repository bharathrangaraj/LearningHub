/**
 * Created by Bharath on 11/05/16.
 */
var https=require("follow-redirects").https;
var http=require("follow-redirects").http;
var URL=require ('url-parse');

function AggHelper(){}

AggHelper.prototype.get=function(ep,callback){
    var protocol=getprotocol(ep);
    if(protocol=="https:"){
        AggHelper.prototype.getHttps(ep,function(response){
            callback(response);

        });
    }else{
        AggHelper.prototype.getHttp(ep,function(response){
            callback(response);
        });

    }


};


AggHelper.prototype.getHttps=function(ep,callback){
    var oe_details="";
    https.get(ep,function(response){
        if(response.statusCode>=400){
            callback("error",null);
        }else{
            response.on('data',function(d){
                oe_details+=d;
            });
            response.on('end',function(){
                //console.log(JSON.parse(oe_details));
                if(oe_details){
                    if(oe_details==""){
                        callback("error",null);
                    }else if(oe_details=="Item not found"){
                        callback(null,"");
                    }
                    else{
                        callback(null,JSON.parse(oe_details))
                    }
                }else{
                    callback("error",null);
                }
            });
            response.on('error',function(e){
                console.log(e);
                //oe_details="";
                callback(oe_details);
            })
        }
    });
};

AggHelper.prototype.getHttp=function(ep,callback){
    var oe_details="";
    http.get(ep,function(response){
        if(response.statusCode>=400){
            callback("error",null);
        }else{
            response.on('data',function(d){
                oe_details+=d;
            });
            response.on('end',function(){
                //console.log(JSON.parse(oe_details));
                if(oe_details){
                    if(oe_details==""){
                        callback("error",null);
                    }else if(oe_details=="Item not found"){
                        callback(null,"");
                    }
                    else{
                        callback(null,JSON.parse(oe_details))
                    }
                }else{
                    callback("error",null);
                }
            });
            response.on('error',function(e){
                console.log(e);
                //oe_details="";
                callback(oe_details);
            })
        }
    })
};


function getprotocol(link){
    var url=new URL(link);
    return url.protocol;
};

module.exports=new AggHelper();

