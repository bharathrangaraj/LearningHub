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
var test_url=decodeURIComponent("https://community-cdn-digitalocean-com.global.ssl.fastly.net/assets/tutorials/images/large/NODE_js_tw.png?1426699784");
console.log(test_url);


var scrape=require('/Users/Bharath/WebstormProjects/LearningHub/public/js/scrape.js');


scrape.getInfo(test_url,function(res){
console.log(res);

});





