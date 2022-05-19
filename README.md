# Weather_App_Node_MongoDB
A coding project I made for my CIS234 class. A simple temperature-related web application using HTML, CSS, JavaScript, BootStrap, Node.JS, Express, EJS, and MongoDB. It is being uploaded to GitHub so future CIS234 classes can use it as an example if one is needed. Since this is a public repository, anyone else who wants to look at it for whatever reason can do that too. As this program was made for a class assignment, it is by no way a fully furnished website ready for launch, just a collection of pages that demonstate working code.

The web app has 4 main html pages: a home page and three other pages that perform a specific task.

The lookup page lets the user lookup a date and return either temperature data on that date (high, low, and average temperature) or a message stating there is no data for that date. Only date from January 2022 through April 2022 have data, but only February has authentic data (the other months are copypastes of February). The user is taken to a second page to view the results the first time a date is looked up, but future lookups can be done and viewed on that second  page.

The monthly page allows the user to look up one of four months (January 2022 through April 2022) and display every date in the chosen month and its temperature data. The user is taken to a second page to view the results the first time a month is chosen, but future month queries can be done and viewed on that second  page. Both the lookup and monthly pages use the same MongoDB database collection, called myTemperatureCollection.

The final page, your_data, allows users to create their own forecast records (consisting of a date, temperature, location, and weather pattern) and then save them to a  MongoDB database collection called new_forecast_records. The page will also display all the records the user created, allow the user to edit and delete individual records, or mass delete all records. When editing a record, the user is taken to a seperate page, and once the record is either saved or has its changes canceled, the user will be taken back to the original your_data page.

There is also a companion project in anothe repository of mine, that has the same appearance and does all the same stuff, except it uses JavaScripy arrays and LocalStorage to store data instead of MongoDB Atlas database. It is found at https://github.com/SapphireJester/Weather_App_LocalStorage

This application is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License. More information on that license can be found at https://creativecommons.org/licenses/by-sa/4.0/

Thank you for reading.
