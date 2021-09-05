const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now}
})

//Ciframos la contraseña
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
}

UserSchema.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', UserSchema);