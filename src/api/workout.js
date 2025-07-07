const { WorkoutService, ScheduleService } = require("src/services");
const { APIError } = require("src/utils/app-errors");

module.exports = (path, app) => {
    const service = new WorkoutService();
    const scheduleService = new ScheduleService();

    app.get(`${path}/workouts`, async (req, res, next) => {
        const query = {}

        for (const [key, value] of Object.entries(req.query)) {
            if (value !== undefined) {
                query[key] = value
            }
        }
        try {
            const { data } = await service.GetWorkouts(query)
            return res.status(200).json(data);

        } catch (error) {
            const err = new APIError("API Error");
            err.logError = error.toString();

            next(err);
        }

    });

    // Get workout by id
    app.get(`${path}/workouts/edit/:_id`, async (req, res, next) => {
        const params = {}

        for (const [key, value] of Object.entries(req.params)) {
            if (value !== undefined) {
                params[key] = value
            }
        }



        try {
            const { data } = await service.GetWorkoutById(params)
            const test = data.workout;
            return res.status(200).json(data);

        } catch (error) {
            const err = new APIError("API Error");
            err.logError = error.toString();

            next(err);
        }

    });

    // Delete workout by id
    app.post(`${path}/workouts/delete`, async (req, res, next) => {
        const workout = {}

        for (const [key, value] of Object.entries(req.body)) {
            if (value !== undefined) {
                workout[key] = value
            }
        }

        try {
            const { data } = await service.DeleteWorkout(workout)
            const { data: scheduleData } = await scheduleService.GetScheduleByWorkoutId(workout);

            if (scheduleData.schedule !== null) {
                await scheduleService.DeleteScheduleByWorkoutId(workout)
            }

            return res.status(200).json(data);

        } catch (error) {
            const err = new APIError("API Error");
            err.logError = error.toString();

            next(err);
        }

    });

    app.post(`${path}/workouts/create`, async (req, res, next) => {

        const workout = {}
        for (const [key, value] of Object.entries(req.body)) {
            if (value !== undefined) {
                workout[key] = value
            }
        }

        try {
            const { data } = await service.CreateWorkout(workout);
            return res.status(200).json(data);

        } catch (error) {
            const err = new APIError("API Error");
            err.logError = error.toString();

            next(err);
        }

    });

    app.post(`${path}/workouts/update`, async (req, res, next) => {

        const workout = {}

        for (const [key, value] of Object.entries(req.body)) {
            if (value !== undefined) {
                workout[key] = value
            }
        }
        try {
            const { data } = await service.UpdateWorkout(workout);
            return res.status(200).json(data);

        } catch (error) {
            const err = new APIError("API Error");
            err.logError = error.toString();

            next(err);
        }

    });
}