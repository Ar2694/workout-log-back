const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    id: { type: String },
    bodyPart: { type: String },
    equipment: { type: String },
    gifUrl: { type: String },
    name: { type: String },
    target: { type: String },
    secondaryMuscles: { type: Array },
    instructions: { type: Array }

}, { collection: "exercise" });

module.exports = mongoose.model("Exercise", ExerciseSchema);