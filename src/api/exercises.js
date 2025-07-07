const { ExerciseService } = require("src/services");
const { APIError, STATUS_CODES } = require("src/utils/app-errors");

module.exports = (path, app) => {
  const service = new ExerciseService();

  // Get all exercises
  app.get(`${path}/exercises`, async (req, res, next) => {
    const query = {};

    for (const [key, value] of Object.entries(req.query)) {
      if (value !== undefined) {
        query[key] = value;
      }
    }

    try {
      const { data } = await service.GetExercises(query);
      return res.status(200).json(data);
    } catch (error) {
      const err = new APIError("API Error");
      err.logError = error.toString();

      next(err);
    }
  });

  // Get workout by id
  app.get(`${path}/exercises/view/:_id`, async (req, res, next) => {
    const params = {};

    for (const [key, value] of Object.entries(req.params)) {
      if (value !== undefined) {
        params[key] = value;
      }
    }

    try {
      const { data } = await service.GetExerciseById(params);
      return res.status(200).json(data);
    } catch (error) {
      const err = new APIError("API Error");
      err.logError = error.toString();

      next(err);
    }
  });

  // Get all exercise body parts
  app.get(`${path}/exercises/bodyparts`, async (req, res, next) => {
    try {
      const { data } = await service.GetExerciseBodyParts();
      return res.status(200).json(data);
    } catch (error) {
      const err = new APIError("API Error");
      err.logError = error.toString();

      next(err);
    }
  });

  // Get all exercise body parts
  app.get(`${path}/exercises/bodyparts/:bodyPart`, async (req, res, next) => {
    const bodypart = req.params;
    try {
      const { data } = await service.GetExercises(bodypart);
      return res.status(200).json(data);
    } catch (error) {
      const err = new APIError("API Error");
      err.logError = error.toString();

      next(err);
    }
  });
};
