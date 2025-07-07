const { ExerciseRepository } = require("src/database");
const { FormatData } = require("src/utils");
const { APIError } = require("src/utils/app-errors");

// All Business logic will be here
class ExerciseService {

    constructor() {
        this.repository = new ExerciseRepository();
    }

    async GetExercises(query) {
        try {
            const exercises = await this.repository.Exercises(query);
            return FormatData(exercises)

        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async GetExerciseById(query) {
        try {
            const excercise = await this.repository.GetExerciseById(query);
            return FormatData(excercise)

        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async GetExerciseBodyParts(query) {
        try {
            const exercises = await this.repository.ExerciseBodyParts();
            return FormatData(exercises)
        } catch (err) {
            throw new APIError('Data Not found')
        }

    }
}

module.exports = ExerciseService;