const { ScheduleService } = require("src/services");
const { APIError } = require("src/utils/app-errors");


module.exports = (path, app) => {
    const service = new ScheduleService();

    app.get(`${path}/schedule`, async (req, res, next) => {
        try {
            const { data } = await service.GetScheduledWorkouts()
            return res.status(200).json(data);

        } catch (error) {
            const err = new APIError("API Error");
            err.logError = error.toString();

            next(err);
        }

    });

    app.post(`${path}/schedule/create`, async (req, res, next) => {

        const schedule = {}

        for (const [key, value] of Object.entries(req.body)) {
            if (value !== undefined) {
                schedule[key] = value
            }
        }

        try {
            const { data } = await service.CreateSchedule(schedule);
            return res.status(200).json(data);

        } catch (error) {
            const err = new APIError("API Error");
            err.logError = error.toString();

            next(err);
        }

    });

    // Delete schedule by id
    app.post(`${path}/schedule/delete`, async (req, res, next) => {
        const schedule = {}

        for (const [key, value] of Object.entries(req.body)) {
            if (value !== undefined) {
                schedule[key] = value
            }
        }

        try {
            const { data } = await service.DeleteScheduledWorkout(schedule)
            return res.status(200).json(data);

        } catch (error) {
            const err = new APIError("API Error");
            err.logError = error.toString();

            next(err);
        }

    });

    // Delete all schedule
    app.post(`${path}/schedule/deleteAll`, async (req, res, next) => {

        try {
            const { data } = await service.DeleteAllSchedules()
            return res.status(200).json(data);

        } catch (error) {
            const err = new APIError("API Error");
            err.logError = error.toString();

            next(err);
        }

    });

    // Get schedule by id
    app.get(`${path}/schedule/edit/:_id`, async (req, res, next) => {
        const params = {}

        for (const [key, value] of Object.entries(req.params)) {
            if (value !== undefined) {
                params[key] = value
            }
        }

        try {
            const { data } = await service.GetScheduleById(params)
            return res.status(200).json(data);

        } catch (error) {
            const err = new APIError("API Error");
            err.logError = error.toString();

            next(err);
        }

    });

    app.post(`${path}/schedule/update`, async (req, res, next) => {

        const schedule = {}

        for (const [key, value] of Object.entries(req.body)) {
            if (value !== undefined) {
                schedule[key] = value
            }
        }

        try {
            const { data } = await service.UpdateSchedule(schedule);
            return res.status(200).json(data);

        } catch (error) {
            const err = new APIError("API Error");
            err.logError = error.toString();

            next(err);
        }

    });
}