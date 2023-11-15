// Require mongoose
const mongoose = require("mongoose");
// create schema contains a single field named 'name.'
// the 'name' field is of type String
const TodoSchema = new mongoose.Schema({ name: String });
// Export the mongoose model with the collection name "Todo"
module.exports = mongoose.model("Todo", TodoSchema);
