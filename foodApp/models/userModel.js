//mongodb
const mongoose = require('mongoose');
const emailValidator = require("email-validator");
const bcrypt = require('bcrypt');

const db_link = 'mongodb+srv://arizeetbehera2001:VkDUCfNBO1XowG8I@cluster0.vxvxcg8.mongodb.net/'
mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
    console.log("db connected");
})
.catch(function(err){
    console.log(err);
})

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword:{
        type: String,
        required: true,
        minLength: 8,
        validate: function(){
            return this.confirmPassword == this.password;
        }
    }
});

//pre hooks
userSchema.pre('save', function(){
    this.confirmPassword = undefined;
});

userSchema.pre('save',function(){
    let salt = bcrypt.genSalt();
    let hashedString = bcrypt.hash(this.password,salt);
    console.log(hashedString);
})


//model

const userModel = mongoose.model('userModel',userSchema);
module.exports = userModel;
//post hooks
// userSchema.post('save', function(doc){
//     console.log("after saving in db",doc);
// });

// (async function createUser(){
//     let user = {
//         email: "zeel1@gmail.com",
//         name: "Zeel",
//         password: "Zeel@123",
//         confirmPassword: "Zeel@123"
//     };
//     let data = await userModel.create(user);
//     console.log(data);
// })();