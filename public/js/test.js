/**
 * Created by Bharath on 22/03/16.
 */
var url=require('url-parse');
var isImageUrl = require('is-image-url');
var meta = require('metatags');
var test_url="http://listic.ru/jQuery_Cookbook.pdf";


var scrape=require('/Users/Bharath/WebstormProjects/LearningHub/public/js/scrape.js');

//console.log(isImageUrl("https://refslund.smugmug.com/Landscapes-and-people-1/Refslunds-Images/i-7LTDg6h"));
//meta('http://findanexpertonline.com/directory/sandra-dee-robinson-media-trainer-280.html', function(err, data){
//    console.log(data);
//});





scrape.getInfo(test_url,function(res){
console.log(res);

});

