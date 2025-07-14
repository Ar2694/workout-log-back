const { APIError, STATUS_CODES } = require("src/utils/app-errors");
const { ExerciseModel } = require("src/database/models");

//Database operations
class ExcerciseRepository {

  async Exercises(query) {
    const pageIndex = parseInt(query.pageIndex, 10) || 1;
    const pageSize = parseInt(query.pageSize, 10) || 0;

    try {

      const exercises = await ExerciseModel.find().limit(pageSize).skip((pageIndex - 1) * pageSize);
      const countDocuments = await ExerciseModel.find().countDocuments({}).exec()
      const pageCount = Math.ceil(countDocuments / pageSize);
      return { exercises, pageSize, pageIndex, pageCount };

    }
    catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Get Exercises");
    }
  }

  async GetWorkouts(query) {

    const pageIndex = parseInt(query.pageIndex, 10) || 1;
    const pageSize = parseInt(query.pageSize, 10) || 0;

    try {
      const workouts = await WorkoutModel.find().limit(pageSize).skip((pageIndex - 1) * pageSize);
      const countDocuments = await WorkoutModel.find().countDocuments({}).exec()
      const pageCount = Math.ceil(countDocuments / pageSize) ?? 0;
      return { workouts, pageSize, pageIndex, pageCount };
    }
    catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Get Workouts");
    }
  }

  async ExerciseBodyParts() {
    try {
      const bodyparts = await ExerciseModel.aggregate([{ $group: { _id: '$bodyPart' } }]);
      return { bodyparts };
    }
    catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Get Exercises");
    }
  }


  async GetExerciseById(query) {
    try {
      const [exercise] = await ExerciseModel.find(query);
      return { exercise };
    }
    catch (err) {
      throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Get exercise");
    }
  }
}

module.exports = ExcerciseRepository;