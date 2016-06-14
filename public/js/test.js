/**
 * Created by Bharath on 22/03/16.
 */
var url=require('url-parse');
var isImageUrl = require('is-image-url');
var h2js=require('html-to-json');
var js2h = require('json-to-html');
var meta = require('metatags');
var og=require('og-parser');
var request=require('request');
var validUrl = require('valid-url');
var favicon = require('favicon');
var https=require("follow-redirects").https;
var embed=require("./embedHtml.js");
var http=require("follow-redirects").http;
var URL=require ('url-parse');
var image=require('./image.js');
var test_url=decodeURIComponent("https://www.youtube.com/watch?v=UrxCwYc5h2Q");
var scrape=require('/Users/Bharath/WebstormProjects/LearningHub/public/js/scrape.js');
var read = require('node-read');


scrape.getInfo("https://color.adobe.com/create/color-wheel/?base=2&rule=Monochromatic&selected=1&name=My%20Color%20Theme&mode=rgb&rgbvalues=0.11235955056179775,0.5,0.47090311638757915,0.5247191011235954,1,0.9643246905273797,0.2247191011235955,1,0.9418062327751583,0.2623595505617977,0.5,0.48216234526368984,0.1797752808988764,0.8,0.7534449862201267&swatchOrder=0,1,2,3,4",function(error,details){
    if(error){
        console.log(error);
    }else{
        console.log(details);
    }

});














