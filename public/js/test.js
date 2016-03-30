/**
 * Created by Bharath on 22/03/16.
 */
var url=require('url-parse');
var test_url="https://dotsub.com/view/99eaba09-787a-40a9-9125-27a729de71db";

var scrape=require('/Users/Bharath/WebstormProjects/LearningHub/public/js/scrape.js');

scrape.getInfo(test_url,function(res){
console.log(res);
});

