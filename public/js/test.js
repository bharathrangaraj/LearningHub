/**
 * Created by Bharath on 22/03/16.
 */
var url=require('url-parse');
var test_url="http://www.chartblocks.com/en/";

var scrape=require('/Users/Bharath/WebstormProjects/LearningHub/public/js/scrape.js');

scrape.getInfo(test_url,function(res){
console.log(res);
});

