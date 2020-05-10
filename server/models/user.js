const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;

let userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            validate: value => {
                if (!validator.isEmail(value)) {
                    throw new Error({error: 'Invalid Email Address'})
                }
            }
        },
        password: {
            type: String,
            required: true,
            minLength: 10
        },
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
})

userSchema.pre("save", async function (next) {
    const user = this;
    const salt = 10;
    
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, salt);
    }
    next();
})

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY, { expiresIn : "12h" });
    // limits to 5 tokens for user
    const MAX_TOKENS = 5;

    if (user.tokens.length >= MAX_TOKENS) 
        user.tokens.splice(0, 1);
    
    user.tokens = user.tokens.concat({token});

    await user.save();

    return token;
    
}

const User = mongoose.model('User', userSchema);

module.exports = User;