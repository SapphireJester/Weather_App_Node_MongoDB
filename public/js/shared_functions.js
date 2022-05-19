/*
Zane Taylor
CIS 234
Project 2
Shared Functions JavaScript File
(for all html pages)
The file name was more fitting when I had more than one public js file
 */

//Function to set the attribution information in the footer. Function based off professor's set_date function from
//his storage.js file in his local storage project. The attribution was originally a copyright string with fake copyright,
//but was changed prior to being placed on GitHub. An actual Creative Commons License was added to all footers on the
//html pages, requiring this change. The now larger footers also meant some code in this file and other files relating
//to footer padding also had to be adjusted.
function set_footer()
{
    //Create new Date object consisting of the current date.
    const currentDate = new Date();

    //Get the current year from the Date object.
    const currentYear = currentDate.getFullYear();

    //Create string variable that will be used to hold the attribution text.
    let attributionText = "";

    //Check if the current year is 2022 (the year this website was hypothetically launched).
    if (currentYear === 2022)
    {
        //Current year is 2022, set the string holding the attribution text with information,
        //including only the year 2020.
        attributionText = "Created by Zane Taylor, 2022";
    }
    else
    {
        //Current year is not 2022, set the string holding the attribution text with information,
        //including the year 2020 and the current year.
        attributionText = "Created by Zane Taylor, 2022 - " + currentYear;
    }
    //Set the footerTextDisplay element's inner HTML to be the attribution string. This will replace
    //the placeholder attribution text in the footer.
    document.getElementById("footerTextDisplay").innerHTML = attributionText;
}

//Function that sends the user to the your_data page. Used when clicking the cancel button on the
//your_data_edit page. All other redirects in the project instead involve the server file
function returnToYourData()
{
    window.location.href = "/your_data";
}

//Function called when loading the your_data page to adjust the footer padding and set the message in the
//key_length div. The parameter is the number of records to be loaded onto the page, which is done using the
//server file and ejs (aka not done here). Probably should have renamed this since most of this function's
//original purpose is gone now that there is no local storage.
function read_keys(key_len)
{
    // Call function to set the copyright text in the footer. onload can only take one function, so that's
    // why I have to cheat by calling the set_footer function inside of the function called by onload.
    set_footer();
    // check if there are any records to be displayed
    if (key_len !== 0)
    {
        // 1 Record
        if (key_len === 1)
        {
            // set the text for key_length div stating there is 1 record
            document.getElementById("key_length").innerHTML = "You have " + key_len + " record saved.";
            // adjust the top padding of the footer to account for the changed page height
            document.getElementById("yourFooter").style.paddingTop = "65.5px";
        }
        // more than 1 Record
        else
        {
            // set the text for key_length div stating the number of records there are
            document.getElementById("key_length").innerHTML = "You have " + key_len + " records saved.";
            if (key_len === 2)
            {
                // adjust the top padding of the footer to account for the changed page height
                document.getElementById("yourFooter").style.paddingTop = "25.5px";
            }
            else
            {
                // adjust the top padding of the footer to account for the changed page height
                document.getElementById("yourFooter").style.paddingTop = "25px";
            }

        }
    }
    else
    {
        // set the text for key_length div stating there are no records
        document.getElementById("key_length").innerHTML = "You have 0 records saved.";
        // make the table invisible
        document.getElementById("yourDisplayTable").style.display = "none";
    }
    // check if there are 4 or more records
    if (key_len >= 3)
    {
        // set the footer's bottom padding to keep the footer in the same position relative to the
        // bottom screen
        document.getElementById("yourFooter").style.paddingBottom = "25px";
    }
}