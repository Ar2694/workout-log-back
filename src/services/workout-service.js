const { WorkoutRepository } = require("src/database");
const { FormatData } = require("src/utils");
const { APIError } = require("src/utils/app-errors");

// All Business logic will be here
class WorkoutService {

    constructor() {
        this.repository = new WorkoutRepository();
    }

    async CreateWorkout(data) {
        try {
            const workout = await this.repository.CreateWorkout(data);
            return FormatData(workout)

        } catch (err) {
            throw new APIError('Data Not found')
        }
    }
    async UpdateWorkout(data) {
        try {
            const workout = await this.repository.UpdateWorkout(data);
            return FormatData(workout)

        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async DeleteWorkout(data) {
        try {
            const workout = await this.repository.DeleteWorkout(data);
            return FormatData(workout)

        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async GetWorkouts(query) {
        try {
            const workouts = await this.repository.GetWorkouts(query);
            return FormatData(workouts)

        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async GetWorkoutById(query) {
        try {
            const workouts = await this.repository.GetWorkoutById(query);
            return FormatData(workouts)

        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

}

module.exports = WorkoutService;