const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StaffSchema = new Schema(
    {
        id: String,
        name: String,
        image: String,
        title: String
    }
);

module.exports = mongoose.model("Staff", StaffSchema, "staff")