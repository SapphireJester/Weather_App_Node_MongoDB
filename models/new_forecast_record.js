//Zane Taylor
//CIS 234
//Project 2
//Schema for the database collection named new_forecast_records
//Used for the user-entered records created in your_data.ejs
//JavaScript file

//Create variable to let us use mongoose
const mongoose = require('mongoose')

//Create variable to let us use mongoose schemas
const Schema = mongoose.Schema;

//Create the schema.
const forecast_record_schema = new Schema({
    date: String,
    temperature: Number,
    location: String,
    weather_pattern: String
});

//Set the database collection to be new_forecast_records
forecast_record_schema.set("collection", "new_forecast_records");

//Create the model using the schema
const new_forecast_record = mongoose.model('new_forecast_record',forecast_record_schema);

//Export the model so other files can use it
module.exports = new_forecast_record;