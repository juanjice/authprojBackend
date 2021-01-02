const mongoose = require("mongoose");


/*const sessionSchema =new mongoose.Schema({
    entryDate:{type:Date,required:false},
    exitDate:{type:Date,required:false}
})
*/
const userSchema= new mongoose.Schema({
    email:{type: String,required:true,unique:true},
    password:{type:String,required:true,minlength:5}, 
    displayName:{type:String},
    adminUser:{type:Boolean,required:true},
    //sessions:{type:[sessionSchema],required:false}
});
module.exports= User=mongoose.model("user",userSchema);
//module.exports= Session=mongoose.model("session",sessionSchema);