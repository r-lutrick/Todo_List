// Import mongoose
const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
	// name: {
	// 	type: String,
    //     minLength: [3, "Name must be 3 or more letters"]
	// },
	// books: {
	// 	type: Array
	// }
}, {timestamps: true})

module.exports = mongoose.model("Author", TodoSchema)