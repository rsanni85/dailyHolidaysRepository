async function viewHolidays() {
    const today = new Date();
    const todayDate = "" + today.getDate();
    const todayMonth = "" + (today.getMonth() + 1);
    const todayYear = "" + today.getFullYear();
    // let country = document.getElementById("country").value;
    const countries = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Botswana",
        "Brazil",
        "British Virgin Islands",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cayman Islands",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo",
        "Congo Democratic Republic",
        "Cook Islands",
        "Costa Rica",
        "Cote d’Ivoire",
        "Croatia",
        "Cuba",
        "Curaçao",
        "Cyprus",
        "Czechia",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "East Timor",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "eSwatini",
        "Ethiopia",
        "Falkland Islands",
        "Faroe Islands",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kosovo",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macau",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "North Korea",
        "North Macedonia",
        "Northern Mariana Islands",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Reunion",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Helena",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Martin",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Sint Maarten",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Korea",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "St. Barts",
        "Sudan",
        "Suriname",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "The Bahamas",
        "Togo",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Uruguay",
        "US Virgin Islands",
        "Uzbekistan",
        "Vanuatu",
        "Vatican City (Holy See)",
        "Venezuela",
        "Vietnam",
        "Wallis and Futuna",
        "Yemen",
        "Zambia",
        "Zimbabwe"
    ];

    displayString = "<table border='1'><th>Country</th><th>Holiday</th><th>Type</th>";
    const apiKey = "<%= holidayApiKey %>";
    countries.forEach(country => {
        const apiURL = `https://holidays.abstractapi.com/v1/?api_key=${apiKey}&country=${country}&year=${todayYear}&month=${todayMonth}&day=${todayDate}`;
        let holidayData = fetchHolidayInfo(apiURL, todayYear, todayMonth, todayDate);

        holidayData
            .then(result => {
                //console.log("RESULT: " + JSON.stringify(result));
                console.log("H");
                if (Array.isArray(result)) {
                    JSON.parse(JSON.stringify(result)).forEach(holiday =>
                        displayString += `<tr><td>${holiday.location}</td><td>${holiday.name}</td><td>${holiday.type}</td></tr>`);
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

    });
    displayString += `</table><br><button onclick="viewHolidays()">View holiday(s)</button>`;
    document.getElementById("displayHolidays").innerHTML = displayString;

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