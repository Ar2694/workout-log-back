const mongoose = require('mongoose');
const { DB_URL } = require('src/config');

module.exports = async () => {
    try {
        await mongoose.connect(DB_URL, {
            dbName: "workoutdb",
        });
        console.log('Database Connected!');

    } catch (error) {
        console.log('Error ============')
        console.log(error);
        process.exit(1);
    }

};

