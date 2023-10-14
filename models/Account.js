const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({
	mint: { type: String, unique: true, required: true},
    owner: { type: String, required: true},
    status: { type: Number, default: 0}
});

const Account = mongoose.model('Account', AccountSchema);
module.exports = Account;