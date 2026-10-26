const mongoose = require("mongoose")
const { Schema } = mongoose

const schema = new Schema({
    id: { type: String, required: true, unique: true },
    uid: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    dueDate: { type: String, default: "" },
    description: { type: String, default: "" },
    priority: { type: String, default: "" },
    status: { type: String, default: "active" },
    isCompleted: { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model("task", schema)