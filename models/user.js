const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
  },
});

userSchema.virtual('fullname').get(function(){
    return this.firstName +'' + this.lastName;
 });

 userSchema.methods.toPublic = function() {
    const user = this;
    const userObject = user.toObject();
   
    delete userObject.password;
    userObject.name = '${user.firstName} ${user.lastName}';
    
    return userObject;
   }
   userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
