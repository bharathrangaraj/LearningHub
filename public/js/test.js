/**
 * Created by Bharath on 22/03/16.
 */
var url=require('url-parse');
var isImageUrl = require('is-image-url');
var h2js=require('html-to-json');
var js2h = require('json-to-html');
var meta = require('metatags');
var og=require('og-parser');
var test_url=decodeURIComponent("https://www.jetbrains.com/help/webstorm/2016.1/running-and-debugging-node-js.html?origin=old_help#Node.js_run");
console.log(test_url);


var scrape=require('/Users/Bharath/WebstormProjects/LearningHub/public/js/scrape.js');


//var s='<div class="col-xs-12"><div class=\'verse-player-embed\'><style>.verse-player-embed {position: relative; padding-bottom: calc(56.25% + 55px); height: 0; overflow: hidden; max-width: 100%; } .verse-player-embed iframe, .verse-player-embed object, .verse-player-embed embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><iframe src=\'https://verse.com/9c8de05799b1b1671c325b52372b39678837ea5a/299-water/\' frameborder=\'0\' allowfullscreen ></iframe></div></div>';
//
//console.log(s.replace(/\'/,"1"));

og("https://www.jetbrains.com/help/webstorm/2016.1/running-and-debugging-node-js.html?origin=old_help#Node.js_run", function(error, data) {
        if(error){
            console.log(error);
        }else{
            console.log(data);
            og_data.title=data.og.title;
            og_data.image=data.image.url;

        }
    }
);

//scrape.getInfo(test_url,function(res){
//console.log(res);
//
//});

