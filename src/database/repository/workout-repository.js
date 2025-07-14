const { APIError, STATUS_CODES } = require("src/utils/app-errors");
const { WorkoutModel } = require("src/database/models");

//Database operations
class WorkoutRepository {

    async CreateWorkout(data) {
        try {
            const newWorkout = new WorkoutModel({ ...data });
            const workout = await WorkoutModel.create(newWorkout);
            return workout;
        }
        catch (err) {
            throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Create Workout");
        }
    }

    async UpdateWorkout(data) {
        try {
            const updatedWorkout = data;
            const workout = await WorkoutModel.findOneAndUpdate({ _id: updatedWorkout._id }, updatedWorkout);
            return workout;
        }
        catch (err) {
            throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Update Workout");
        }
    }

    async DeleteWorkout(data) {
        try {
            const workout = await WorkoutModel.findOneAndDelete({ _id: data.id });
            return workout;
        }
        catch (err) {
            throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Delete Workout");
        }
    }

    async GetWorkouts(query) {

        const pageIndex = parseInt(query.pageIndex, 10) || 1;
        const pageSize = parseInt(query.pageSize, 10) || 0;

        try {
            const workouts = await WorkoutModel.find().limit(pageSize).skip((pageIndex - 1) * pageSize);
            const countDocuments = await WorkoutModel.find().countDocuments({}).exec()
            const pageCount = Math.ceil(countDocuments / pageSize);
            return { workouts, pageSize, pageIndex, pageCount };
        }
        catch (err) {
            throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Get Workouts");
        }
    }

    async GetWorkoutById(query) {
        try {
            const [workout] = await WorkoutModel.find(query);
            return { workout };
        }
        catch (err) {
            throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Get workouts");
        }
    }


}

module.exports = WorkoutRepository;