const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    userName: { type: String, required: true, unique: true },
    userProject: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    userTickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }],
    userAuthority: String
})

//Model
const User = mongoose.model('User', userSchema);

module.exports = User;