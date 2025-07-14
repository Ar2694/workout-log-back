
module.exports = {
    databaseConnection: require('src/database/connection'),
    WorkoutRepository: require('src/database/repository/workout-repository'),
    ExerciseRepository: require("src/database/repository/exercise-repository"),
    ScheduleRepository: require('src/database/repository/schedule-repository'),
    UserRepository: require("src/database/repository/user-repository"),
}