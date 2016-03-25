/**
 * Created by Bharath on 22/03/16.
 */
var url=require('url-parse');
var test_url="https://www.youtube.com/watch?v=18KjJ3OJdck";
var scrape=require('/Users/Bharath/WebstormProjects/LearningHub/public/js/scrape.js');
scrape.getInfo(test_url,function(res){
    console.log(res);
});
