async function viewHolidays() {
    let today = document.getElementById("otherDate").value;
    console.log("retrieved today: " + today + " type: " + typeof today);
    const todayArr = today.split("-");
    const todayDate = todayArr[2];
    const todayMonth = todayArr[1];
    const todayYear = todayArr[0];
    let country = document.getElementById("country").value;

    const apiURL = `https://holidays.abstractapi.com/v1/?api_key=9ef7882199014c7eb5cdadc2b91c52f2&country=${country}&year=${todayYear}&month=${todayMonth}&day=${todayDate}`;
    let holidayData = fetchHolidayInfo(apiURL, todayYear, todayMonth, todayDate);

    displayString = "";
    holidayData
        .then(result => {
            //console.log("RESULT: " + JSON.stringify(result));
            console.log("H");
            if (Array.isArray(result)) {
                if (JSON.parse(JSON.stringify(result)).length == 0) {
                    displayString += "The chosen country has no holidays today. Check out the stats for another country!";
                    displayString += `<br><button onclick="viewHolidays()">View today's holiday(s)</button>`;
                    document.getElementById("displayHolidays").innerHTML = displayString;
                } else {
                    displayString = "<table border='1'><th>Holiday</th><th>Type</th>";
                    JSON.parse(JSON.stringify(result)).forEach(holiday =>
                    displayString += `<tr><td>${holiday.name}</td><td>${holiday.type}</td></tr>`);
                    displayString += `</table><br><button onclick="viewHolidays()">View today's holiday(s)</button>`;
                    document.getElementById("displayHolidays").innerHTML = displayString;
                }
                // JSON.parse(JSON.stringify(result)).forEach(holiday =>
                //     displayString += `<tr><td><input type="checkbox" name="favorite"></td><td>${holiday.name}</td><td>${holiday.type}</td></tr>`);
                // let checkedHolidays = [...document.querySelectorAll('input[name="favorite"]:checked')]
                //     .map(checkbox => checkbox.value);
                // let checkedHolidaysString = "";
                // if (checkedHolidays.length == 0) {
                //     displayString = `<p>The chosen country has no holidays today.</p>`;
                // }
                // checkedHolidays.forEach(h => checkedHolidaysString += h.name + " ");
                // //displayString += `<p name="checkedHolidayString">${checkedHolidaysString}</p>`;
                // console.log("checked string: " + checkedHolidaysString);
                // displayString += `</table><br><input type="button" onclick="location.href='/view-favorite-holidays'" value="Store favorites"><button onclick="viewHolidays()">View today's holiday(s)</button>`;
                // document.getElementById("displayHolidays").innerHTML = displayString;

                // //let checkedHolidays = document.querySelectorAll('input[type="favorite"]:checked');




                // checkedHolidays.forEach(holiday => {
                //     console.log("-------------")
                //     console.log(holiday); // Logs the checked status of each checkbox
                //     console.log("holiday is: " + typeof holiday);
                // });

            } else {
                console.log("E");
                console.log("Resolved value is not iterable:", result);
            }
        })
        .catch(error => {
            console.error("Error :", error);
        });

    //holidayDataArray = [...Object.values(holidayData)];
    //displayString = "<table border='1'><th>Holiday</th><th>Type</th>";
    //holidayData.forEach(holiday => displayString += `<tr><td>${holiday.name}</td><td>${holiday.type}</td></tr>`);
    //holidayData.forEach(holiday => console.log(`${holiday.name}`));
    //displayString += "</table>";
    //document.getElementById("displayHolidays").innerHTML = displayString;

}

async function fetchHolidayInfo(apiURL, year, month, day) {
    try {
        const options = { method: 'GET' };
        const response = await fetch(apiURL, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("in here");
        console.log(data);
        return data; // Return the data for further use
    } catch (err) {
        console.error('Error fetching holiday info:', err);
        return null; // Return null in case of an error
    }
}

//     fetch(`https://holidays.abstractapi.com/v1/?api_key=9ef7882199014c7eb5cdadc2b91c52f2&country=US&year=${todayYear}&month=${todayMonth}&day=${todayDate}`, options)
//         .then(response => response.json())
//         .then(response => console.log(response))
//         .catch(err => console.error(err));