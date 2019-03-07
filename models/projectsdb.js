const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
    {
        id: Number,
        address: String,
        images: [String],
        price: Number,
        status: String,
        description: String
    },

    { timestamps: true }
);

module.exports = mongoose.model("Projects", ProjectSchema, "projects")