/**
 * Created by Bharath on 22/03/16.
 */
var url=require('url-parse');
var isImageUrl = require('is-image-url');
var meta = require('metatags');
var test_url=decodeURIComponent("https://www.ted.com/talks/linus_torvalds_the_mind_behind_linux")
console.log(test_url);


var scrape=require('/Users/Bharath/WebstormProjects/LearningHub/public/js/scrape.js');

//console.log(isImageUrl("https://refslund.smugmug.com/Landscapes-and-people-1/Refslunds-Images/i-7LTDg6h"));
//meta('http://findanexpertonline.com/directory/sandra-dee-robinson-media-trainer-280.html', function(err, data){
//    console.log(data);
//});

//var s='<div class="col-xs-12"><div class=\'verse-player-embed\'><style>.verse-player-embed {position: relative; padding-bottom: calc(56.25% + 55px); height: 0; overflow: hidden; max-width: 100%; } .verse-player-embed iframe, .verse-player-embed object, .verse-player-embed embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><iframe src=\'https://verse.com/9c8de05799b1b1671c325b52372b39678837ea5a/299-water/\' frameborder=\'0\' allowfullscreen ></iframe></div></div>';
//
//console.log(s.replace(/\'/,"1"));

scrape.getInfo(test_url,function(res){
console.log(res);

});

