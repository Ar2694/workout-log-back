const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    userId: { type: Schema.Types.ObjectId },
    workoutName: { type: String },
    notes: { type: String },
    color: { type: String },
    user: {
        id: { type: Number },
        username: { type: String },
        initials: { type: String }
    },
    exerciseCount: { type: String },
    exercises: [{
        _id: false,
        id: { type: Number },
        exercise: { type: String },
        bodyPart: { type: String },
        numSets: { type: String },
        sets: [{
            _id: false,
            id: { type: Number },
            setNumber: { type: String },
            reps: { type: String },
        }]
    }],
    dateCreated: { type: Object },
    dateModified: { type: Object }

}, { collection: "workout" });

module.exports = mongoose.model("Workout", WorkoutSchema);