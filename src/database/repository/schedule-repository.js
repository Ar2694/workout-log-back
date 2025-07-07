const { ScheduleModel } = require("src/database/models");
const dayjs = require('dayjs')
const { APIError, STATUS_CODES } = require("src/utils/app-errors");

class ScheduleRepository {

    async CreateSchedule(data) {
        try {
            const newSchedule = new ScheduleModel({ ...data });
            const schedule = await ScheduleModel.create(newSchedule);
            return { schedule };
        }
        catch (err) {
            throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Create Schedule Workout");
        }
    }

    async GetScheduledWorkouts() {
        try {
            // this.RemovePastSchedules();
            const schedules = await ScheduleModel.find().populate('workout');

            return { schedules };
        }
        catch (err) {
            throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Get Schedule Workouts");
        }
    }

    async DeleteScheduledWorkout(data) {
        try {
            const schedule = await ScheduleModel.findOneAndDelete({ _id: data.id });
            return schedule;
        }
        catch (err) {
            throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Delete Schedule");
        }
    }

    async DeleteScheduleByWorkoutId(data) {
        try {
            const schedule = await ScheduleModel.findOneAndDelete({ workout: data.id });
            return schedule;
        }
        catch (err) {
            throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Delete Schedule");
        }
    }

    async GetScheduleByWorkoutId(data) {
        try {
            const schedule = await ScheduleModel.findOne({ workout: data.id });
            return { schedule };
        }
        catch (err) {
            throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to GET Schedule");
        }
    }

    async GetScheduleById(data) {
        try {

            const [schedule] = await ScheduleModel.find(data).populate('workout');
            return { schedule };
        }
        catch (err) {
            throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to GET Schedule");
        }
    }

    async UpdateSchedule(data) {
        try {
            const updatedSchedule = data;
            const schedule = await ScheduleModel.findOneAndUpdate({ _id: updatedSchedule._id }, updatedSchedule);
            return schedule;
        }
        catch (err) {
            throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Update schedule");
        }
    }
    async RemovePastSchedules(data) {
        try {
            const date = dayjs();
            const schedule = await ScheduleModel.deleteMany({ date: { "$lte": date.format() } });
            return schedule;
        }
        catch (err) {
            throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Remove Past Schedules");
        }
    }

    async DeleteAllSchedules(data) {
        try {

            const schedule = await ScheduleModel.deleteMany();
            return schedule;
        }
        catch (err) {
            throw new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Delete All Schedules");
        }
    }
}

module.exports = ScheduleRepository;