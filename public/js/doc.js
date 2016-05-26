/**
 * Created by Bharath on 08/04/16.
 */
var ahelper=require("./aggHelper.js");
var URL=require ('url-parse');

function Doc(){}

var oembed_list={
    'office':'https://mix.office.com/oembed',
    'docs':'https://docs.com/api/oembed'
};


//doc details
Doc.prototype.getDetails=function(url,host_name,callback){
    //init doc result
    var doc_result={
        'type':"doc",
        'url':"",
        'title':"",
        'html':""
    };
    doc_result.url=url;
    if(oembed_list[host_name]){
        ahelper.get(prepareoeURL(url, host_name),function(d){
            doc_result.title=d.title;
            doc_result.html=d.html;
            callback(doc_result);

        });
    }

};
// prepare oe url
function prepareoeURL(url,host_name){
    return oembed_list[host_name]+'?url='+encodeURIComponent(url)+'&format=json';
};
// prepare protocol
function protocol(link){
    var url=new URL(link);
    return url.protocol;
};

module.exports=new Doc();