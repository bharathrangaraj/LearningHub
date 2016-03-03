var mongoose=require('mongoose');

var hubSchema= new mongoose.Schema();

var commentSchema=new mongoose.Schema();

commentSchema.add({
    commentId:{type:mongoose.Schema.Types.ObjectId},
    userId:{type:Number},
    comment:{type:String},
    isDeleted:{type:Boolean},
    dateAdded:{type: Date},
    dateUpdated:{type: Date},

});

commentSchema.pre('save',function(next){
    var now =new Date();
    this.dateUpdated=now;
    if(!this.dateAdded){
        this.dateAdded=now;
    }
    next();
});


commentSchema.pre('update',function(next){
    var now=new Date();
    this.dateUpdated=now;
    next();
});

hubSchema.add({
    courseId:{type:Number, required: true},
    postId:{type: mongoose.Schema.Types.ObjectId},
    title:{type:String,required: true},
    content:{type:String,required:true},
    description:{type:String},
    isDeleted:{type: Boolean},
    dateAdded:{type: Date},
    dateUpdated:{type: Date},
    comments:[commentSchema],
    tags:[{type:String}]
});


hubSchema.pre('save',function(next){
    var now =new Date();
    this.dateUpdated=now;
    if(!this.dateAdded){
        this.dateAdded=now;
    }
    next();
});


hubSchema.pre('update',function(next){
   var now=new Date();
    this.dateUpdated=now;
    next();
});

var agg=mongoose.model('hubSchema',hubSchema);
module.exports=agg;
