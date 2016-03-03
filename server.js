/**
 * Created by Bharath on 25/02/16.
 */
var express=require('express');
var app=express();
var http=require('http');
var mongoose=require('mongoose');
var rootPath=require('app-root-path');
var morgan=require('morgan');
var bodyParser=require('body-parser');
var methodOverride=require('method-override');
var router=require(rootPath+'/Routes/hubroutes.js');




mongoose.connect("mongodb://localhost:27017/learningHub");
app.use(express.static(__dirname+'/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride());

app.use('/',router);

var server=http.createServer(app).listen(8080);

console.log("applistening to port 8080"+rootPath);










