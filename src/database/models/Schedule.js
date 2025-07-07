
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WorkoutModel = require("src/database/models/Workout");

const ScheduleSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    userId: { type: Schema.Types.ObjectId },
    date: { type: Object },
    workout: { type: Schema.Types.ObjectId, ref: WorkoutModel },
    color: { type: String }

}, { collection: "schedule" });

module.exports = mongoose.model("Schedule", ScheduleSchema);
