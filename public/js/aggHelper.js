/**
 * Created by Bharath on 11/05/16.
 */
var https=require("follow-redirects").https;
var http=require("follow-redirects").http;

function AggHelper(){}

AggHelper.prototype.getHttps=function(ep,callback){
    var oe_details="";
    https.get(ep,function(response){
        response.on('data',function(d){
            oe_details+=d;
        });
        response.on('end',function(){
            //console.log(JSON.parse(oe_details));
            callback(JSON.parse(oe_details))
        });
        response.on('error',function(e){
            console.log(e);
            //oe_details="";
            callback(oe_details);
        })
    })

};

module.exports=new AggHelper();

