//Zane Taylor
//CIS 234
//Project 2
//Weather App Server JavaScript file

//create server
const express = require('express')

//create app in server
const app = express()

//create ejs variable to let us use ejs
const ejs = require('ejs')

//set view engine to ejs
app.set('view engine', 'ejs')

//allow access to static files (aka files in the public folder)
const path = require('path')
app.use(express.static('public'))
app.set('views',path.join(__dirname, './public/views'))

//body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//create variables to allow us to interact with MongoDB (the database)
//const mongodb = require('mongodb')
const mongoose = require('mongoose')
const { MongoClient, ServerApiVersion } = require('mongodb');
//I originally used a connection string for my mongodb atlas cluster, but I took out that string when this project
// was uploaded to GitHub. The string below is the string used for any local host, so it is safe to share. To learn how
// to connect your mongodb atlas cluster to a project, go to https://www.mongodb.com/docs/atlas/driver-connection/
const uri = "mongodb://localhost:27017/";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

//Create models to use when querying the collections in the database
const new_record = require('./models/new_forecast_record.js')
const new_lenox_temperature_data = require('./models/new_lenox_temperatures')

//start server
app.listen(1000,()=>{
    console.log("App for Weather App listening on port 1000")
})

//Access index page. Typing either '/' or '/index' will work
app.get("/",(req, res) => {
    //Render the index page
    res.render('index')
})
app.get("/index",(req, res) => {
    //Render the index page
    res.render('index')
})

//access temperature date lookup page
app.get("/lookup",(req, res) => {
    //Render the lookup page
    res.render('lookup')
})
//look up a temperature date, send query to server, render a similar looking page with the query results
app.post("/lookup/query",async(req, res) => {
    //Query the myTemperatureCollection collection in the database, finding one date that matches the date
    //entered by the user. As every date in this collection is unique, there won't be any duplication issues.
    new_lenox_temperature_data.findOne({date: req.body.date}, function (err, result) {
        //Throw error if an error
        if (err) throw err;

        //findOne returns null if there is no result, and ejs doesn't like that, so we check for it
        if (!result) {
            //To prevent errors, create a JSON object and set everything to 0 or an empty string.
            //Only the empty string in date will be looked at when there are no results for the query.
            let empty_result = {date: '', high_temperture: 0, low_temperature: 0, average_temperature: 0}

            //Render the lookup_result page, sending over the JSON object and the dateStringReformat object created
            //at the bottom of the file.
            res.render('lookup_result', {query_result: empty_result, dateStringReformat})

        } else {
            //Render the lookup_result page, sending over the result of the query and the dateStringReformat object
            //(located at the bottom of this file).
            res.render('lookup_result', {query_result:result, dateStringReformat})
        }
    })
})

//access monthly temperature display page
app.get("/monthly",(req, res) => {
    //Render the monthly page
    res.render('monthly')
})
//select a month, send query to server, render a similar looking page with the query results
app.post("/monthly/query",async(req, res) => {
    //Create a string to hold the name of the month, and use a switch case with the submitted month number to
    //set the string to the correct value
    let monthString;
    switch(req.body.month){
        case "1":
            monthString = "January 2022"
            break;
        case "2":
            monthString="February 2022"
            break;
        case "3":
            monthString="March 2022"
            break;
        case "4":
            monthString="April 2022"
            break;
        default:
            monthString="2022"
            break;
    }
    //Query the myTemperatureCollection in the database for all dates in the month chosen by the user.
    // No need to worry about year as only dates from 2022 are in this collection.
    const all_records = await new_lenox_temperature_data.find({month: req.body.month})

    //Render the monthly_result page, sending over the result of the query, the month string, and the
    // dateStringReformat object (located at the bottom of this file).
    res.render('monthly_result', {all_records, monthTitle: monthString, dateStringReformat})
})

//access your forecast records page and load all forecast records to the table
app.get("/your_data", async (req, res) => {
    //Query the new_forecast_records collection in the database for all records
    const all_records = await new_record.find({})

    //Render the your_data page, sending over the result of the query and the dateStringReformat object
    //(located at the bottom of this file).
    res.render('your_data', {all_records, dateStringReformat})
})
//Save your forecast record to the database and refresh page
app.post('/records/save', async(req,res) =>{
    //Create a new record using the user's data from the form and save it to the new_forecast_records collection
    //in the database
    await new_record.create(req.body)

    //Refresh the page by using the redirect on your_data.
    res.redirect('/your_data')
})
//Delete all forecast records from the database and refresh page
app.post('/records/clear_all', async(req,res) =>{
    //Query the new_forecast_records collection in the database for all records and delete them all.
    const all_records = await new_record.deleteMany({})

    //Refresh the page by using the redirect on your_data.
    res.redirect('/your_data')
})
//Delete one forecast record from the database and refresh page
app.post('/records/remove_one', async(req,res) =>{
    //Query the new_forecast_records collection in the database for the record with the object id submitted by the user
    //and delete that record.
    new_record.findOneAndDelete({_id: req.body._id}, (error, any_error) =>{console.log(error, any_error)})
    /* Note for above: Putting await in front of new_record will crash nodemon and reset the server,
    creating a mongoose error: "Query was already executed" */

    //Refresh the page by using the redirect on your_data.
    res.redirect('/your_data')
})
//Use the record's object id to query the database for the rest of that record's data, then send the data to a
//different page where the record can be edited.
app.post("/records/edit_one",async(req, res) => {
    //Query the new_forecast_records collection in the database for the record with the object id submitted by the user.
    new_record.findOne({_id:req.body._id}, function(err, result) {
        //Throw error if an error
        if (err) throw err;

        //Create a JSON object using the data obtained from the query.
        const record_to_edit ={temperature: result.temperature, weather_pattern:result.weather_pattern, location: result.location, _id: req.body._id, date:result.date}

        //Render the your_data_edit page, sending over the JSON object.
        res.render('your_data_edit', {record_to_edit})
    });
})
//Update the original record in the database with the changed data and return to the your_data page
app.post('/records/edit_save', async(req,res) =>{
    //Query the new_forecast_records collection in the database for the record that is being edited, by using the object id
    //sent by the form, and then update the collection's record using the rest of the data sent by the form.
    new_record.findByIdAndUpdate(req.body._id,{temperature: req.body.temperature, weather_pattern:req.body.weather_pattern, location: req.body.location, date:req.body.date},(error, any_error) =>{console.log(error, any_error)})

    //return to the your_data page by using redirect
    res.redirect('/your_data')

    /* Note: If async isn't used, deleting a record after saving an edited one will not refresh the page but the record
    will still be deleted. */
})

//Function that takes a string containing a YYYY-MM-DD date and converts it to a string with a MM-DD-YYYY date. This
//new string is then returned to the location where the function was called. The YYYY-MM-DD string is the parameter.
//The function will be sent to other ejs pages when rendered and used there to convert dates. I can't store the dates
//in the database in the MM-DD-YYYY format because then they won't be compatible with the date picker. No matter what,
//something would be reformatted. And using an actual date object also messes with the date picker, so I can't use that.
//Plus those would need to be reformatted too. If this was a fully functioning program meant to be released, I probably
//would use a date object, but I don't have time for that. Honestly, all this in less than a week is pretty good.
dateStringReformat= (receivedDateString) => {
    //Slice the year from the received date and store it in a variable.
    let dateYear = receivedDateString.slice(0, 4);

    //Slice the month, the hyphen, and day from the received date and store it in a variable.
    let dateMonthDay = receivedDateString.slice(5, 10);

    //Attach a hyphen to the end of the dateMonthDay variable and then attach the dateYear variable after the hyphen.
    //This creates a date string in the MM-DD-YYYY format that matches the received string. Store the newly created
    //string in a variable.
    let newDateString = dateMonthDay + "-" + dateYear;

    //Return the new date string
    return(newDateString);
}
