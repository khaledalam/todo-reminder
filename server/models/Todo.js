const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const todoSchema = new mongoose.Schema({
    note: {type: String, default: ''},
    when: {type: Date, default: null},
    active: {type: Boolean, default: true}
}, {timestamps: true});

/**
 * Pre save middleware.
 */
// monitorSchema.pre('save', function save(next) {
//
// });

/**
 * Helper method
 */
// keySchema.methods.getFreePublicKey = function getFreePublicKey() {
//   return this._ > (Date.now());
// };

todoSchema.plugin(mongoosePaginate);

const Todo = mongoose.model('todo', todoSchema);
module.exports = Todo;
