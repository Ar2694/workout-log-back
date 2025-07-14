const { ScheduleRepository } = require("src/database");
const { FormatData } = require("src/utils");
const { APIError } = require("src/utils/app-errors");

// All Business logic will be here
class ScheduleService {

    constructor() {
        this.repository = new ScheduleRepository();
    }

    async CreateSchedule(data) {
        try {
            const schedule = await this.repository.CreateSchedule(data);
            return FormatData(schedule)

        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async GetScheduledWorkouts() {
        try {
            const schedules = await this.repository.GetScheduledWorkouts();
            return FormatData(schedules)

        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async DeleteAllSchedules() {
        try {
            const schedules = await this.repository.DeleteAllSchedules();
            return FormatData(schedules)

        } catch (err) {
            throw new APIError('Data Not found')
        }
    }


    async DeleteScheduledWorkout(data) {
        try {
            const schedule = await this.repository.DeleteScheduledWorkout(data);
            return FormatData(schedule)

        } catch (err) {
            throw new APIError('Data Not found')
        }
    }
    async DeleteScheduleByWorkoutId(data) {
        try {
            const schedule = await this.repository.DeleteScheduleByWorkoutId(data);
            return FormatData(schedule)

        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async GetScheduleByWorkoutId(data) {
        try {
            const schedule = await this.repository.GetScheduleByWorkoutId(data);
            return FormatData(schedule)

        } catch (err) {
            throw new APIError('Data Not found: GetScheduleByWorkoutId')
        }
    }

    async GetScheduleById(data) {
        try {
            const schedule = await this.repository.GetScheduleById(data);
            return FormatData(schedule)

        } catch (err) {
            throw new APIError('Data Not found: GetScheduleById')
        }
    }

    async UpdateSchedule(data) {
        try {
            const schedule = await this.repository.UpdateSchedule(data);
            return FormatData(schedule)
        }
        catch (err) {
            throw new APIError('Data Not found: GetScheduleById');
        }
    }

}

module.exports = ScheduleService;