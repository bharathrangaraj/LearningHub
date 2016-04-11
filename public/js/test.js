/**
 * Created by Bharath on 22/03/16.
 */
var url=require('url-parse');
var isImageUrl = require('is-image-url');
var h2js=require('html-to-json');
var js2h = require('json-to-html');
var meta = require('metatags');
var og=require('og-parser');
var validUrl = require('valid-url');
var favicon = require('favicon');
var URL=require ('url-parse');
var test_url=decodeURIComponent("https://www.youtube.com/watch?v=CuH3tJPiP-U");
console.log(test_url);


var scrape=require('/Users/Bharath/WebstormProjects/LearningHub/public/js/scrape.js');




favicon("https://www.jetbrains.com/help/webstorm/2016.1/running-and-debugging-node-js.html?origin=old_help#Node.js_run", function(err, favicon_url) {
    console.log(favicon_url);
});


scrape.getInfo(test_url,function(res){
console.log(res);

});

