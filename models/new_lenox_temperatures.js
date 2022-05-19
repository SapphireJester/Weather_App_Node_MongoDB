//Zane Taylor
//CIS 234
//Project 2
//Schema for the database collection named myTemperatureCollection
//Used with the new lenox temperature data in lookup.ejs and monthly.ejs
//JavaScript file

//Create variable to let us use mongoose
const mongoose = require('mongoose')

//Create variable to let us use mongoose schemas
const Schema = mongoose.Schema;

//Create the schema. Note: high temperature is misspelled on purpose, mostly because I made that mistake
//during a previous assignment and didn't bother to fix it when copy-pasting records from MySql to Mongodb
const new_lenox_temperatures_schema = new Schema({
    date: String,
    high_temperture: Number,
    low_temperature: Number,
    average_temperature: Number,
    month: Number
});

//Set the database collection to be myTemperatureCollection
new_lenox_temperatures_schema.set("collection", "myTemperatureCollection");

//Create the model using the schema
const new_lenox_temperature_record = mongoose.model('new_lenox_temperature_record',new_lenox_temperatures_schema);

//Export the model so other files can use it
module.exports = new_lenox_temperature_record;