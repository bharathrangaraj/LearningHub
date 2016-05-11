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
var https=require("follow-redirects").https;
var embed=require("./embedHtml.js");
var http=require("follow-redirects").http;


var URL=require ('url-parse');

var test_url=decodeURIComponent("https://www.youtube.com/watch?v=UrxCwYc5h2Q");



var scrape=require('/Users/Bharath/WebstormProjects/LearningHub/public/js/scrape.js');




scrape.getInfo(test_url,function(res){
console.log(res);
    console.log(embed.embedPdf(res));

});





