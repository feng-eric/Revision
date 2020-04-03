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

    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({token});

    await user.save();

    return token;
    
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    
    if (!user) {
        throw new Error({ error: 'Invalid email address'});
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
        throw new Error({ error: 'Invalid password'});  
    }

    return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;