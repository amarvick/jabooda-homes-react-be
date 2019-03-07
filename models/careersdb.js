const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CareersSchema = new Schema(
    {
        id: Number,
        jobtitle: String,
        description: String,
        requirements: [String]
    },

    { timestamps: true }
);

module.exports = mongoose.model("Careers", CareersSchema, "careers")