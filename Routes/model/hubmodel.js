var mongoose=require('mongoose');

var hubSchema= new mongoose.Schema();

hubSchema.add({
    courseId:{type:Number, required: true},
    postId:{type: mongoose.Schema.Types.ObjectId},
    title:{type:String,required: true},
    content:{type:String,required:true},
    description:{type:String},
    isDeleted:{type: Boolean},
    dateAdded:{type: Date},
    dateUpdated:{type: Date},
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
