/* Important */
process.stdin.setEncoding("utf8");

/* Setting up the webserver and writing HTML content in it*/
const http = require("http");
//const portNumber = 4000;
const httpSuccessStatus = 200;
const webServer = http.createServer((request, response) => {
  response.writeHead(httpSuccessStatus, { "Content-type": "text/html" });
  response.end();
});

/* Setting up Express */
const express = require("express"); /* Accessing express module */
const app = express();
const portNumber = process.env.PORT || 4000;
/* Access current path */
const path = require("path");
const { type } = require("os");

console.log(`Web server started and running at http://localhost:${portNumber}`);
/* Command line interpreter's prompt */
const prompt = "Stop to shutdown the server: ";
process.stdout.write(prompt);
/* Read information the user inputs into the command line and act accordingly:
1. Server stops when "stop" is entered using process.exit(0)
2. Server displays "Shutting down the server" upon stopping
3. Display specified message when user inputs command other than stop or itemsList  */
process.stdin.on("readable", () => {
  /* on equivalent to addEventListener */

  /* Parsing the given input */
  const dataInput = process.stdin.read();
  if (dataInput !== null) {
    const command = dataInput.trim();
    if (command === "stop") {
      console.log("Shutting down the server");
      process.exit(0); /* exiting */
    }
  }
});

/* MONGODB INFO */
require("dotenv").config({ path: path.resolve(__dirname, "credentials/.env") });

const uri = process.env.MONGO_CONNECTION_STRING;

/* Our database and collections */
const usersCollection = { db: "DailyHolidays", collection: "users" };

/****** DO NOT MODIFY FROM THIS POINT ONE ******/
const { MongoClient, ServerApiVersion } = require("mongodb");

const bodyParser = require("body-parser"); /* To handle post parameters */
/* Initializes request.body with post information */
app.use(bodyParser.urlencoded({ extended: true }));

/* directory where templates will reside */
app.set("views", path.resolve(__dirname, "templates"));

/* view/templating engine */
app.set("view engine", "ejs");

/* Default page routes to the login page */
app.get("/", (request, response) => {
  const variables = {
    portNumber: portNumber,
    loginStatus: "",
  };
  response.render("login-page", variables);
});

app.get("/registration", async (request, response) => {
  const variables = {
    portNumber: portNumber,
  };
  response.render("registration", variables);
});

app.post("/process-registration", async (request, response) => {
  userName = request.body.name;
  userEmail = request.body.email;
  userPassword = request.body.password;

  const variables = {
    portNumber: portNumber,
    loginStatus: "",
  };
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();
    /* Inserting one person */
    let person = { name: userName, email: userEmail, password: userPassword };
    await client
      .db(usersCollection.db)
      .collection(usersCollection.collection)
      .insertOne(person);
    response.render("login-page", variables);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
});

app.get("/login-page", async (request, response) => {
  const variables = {
    portNumber: portNumber,
  };
  response.render("login-page", variables);

  //   const variables = {
  //     portNumber: portNumber,
  //     userEmail: request.body.email,
  //     userPassword: request.body.password,
  // }

  // let inputEmail = request.body.email;
  // let inputPassword = request.body.password;
  // //console.log("password: " + inputPassword + " password type: " + typeof inputPassword);
  // //console.log("email: " + inputEmail + " email type: " + typeof inputEmail);
  // const client = new MongoClient(uri, {serverApi: ServerApiVersion.v1 });
  // try {
  //     await client.connect();

  //     /* Checks if the user's email/password combo is in the database */
  //     let filter = {email: inputEmail, password: inputPassword};
  //     let result = await client.db(usersCollection.db)
  //                         .collection(usersCollection.collection)
  //                         .findOne(filter);
  //     //console.log("RESULT IS: " + result);
  //    if (result) {
  //         console.log("Successfully logged in.")
  //         response.render("login-page", variables);
  //    } else {
  //         response.status(400).send(`<a href="http://localhost:${portNumber}/login-page">We couldn't verify this account. Please try again.</a>`);
  //    }

  // }catch (e){
  //   console.error(e);
  // }finally {
  //   await client.close();
  // }

  // const variables = {
  //     portNumber: portNumber,
  // }

  // userEmail = request.body.email;
  // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  // try {
  //     await client.connect();

  //     /* Checks if the user's email is in the database */
  //     let filter = {email: userEmail};
  //     let result = await client.db(usersCollection.db)
  //                         .collection(usersCollection.collection)
  //                         .findOne(filter);

  //    if (result) {
  //         console.log("Going to the password section");
  //         response.render("login-page", variables);
  //    } else {
  //         //response.status(400).send(`<a href="http://localhost:${portNumber}/index">We couldn't verify this email address. Please make sure you've entered it correctly and try again.</a>`);
  //    }

  // }catch (e){
  //   console.error(e);
  // }finally {
  //   await client.close();
  // }
});

app.post("/home-page", async (request, response) => {
  const apiKey = process.env.DAILY_HOLIDAYS_API_KEY;

  let variables = {
    portNumber: portNumber,
    userEmail: request.body.email,
    userPassword: request.body.password,
    holidayApiKey: apiKey
  };

  let inputEmail = request.body.email;
  let inputPassword = request.body.password;
  // console.log(
  //   "password: " + inputPassword + " password type: " + typeof inputPassword
  // );
  // console.log("email: " + inputEmail + " email type: " + typeof inputEmail);
  const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
  try {
    await client.connect();

    /* Checks if the user's email/password combo is in the database */
    let filter = { email: inputEmail, password: inputPassword };
    let result = await client
      .db(usersCollection.db)
      .collection(usersCollection.collection)
      .findOne(filter);
    //console.log("RESULT IS: " + result);
    if (result) {
      console.log("Successfully logged in.");
      response.render("home-page", variables);
    } else {
      let alertString = `Incorrect email and/or password. Please try again.`;

      const failVariables = {
        portNumber: portNumber,
        loginStatus: alertString,
      };

      //response.status(400).send(`<a href="/login-page">We couldn't verify this account. Please try again.</a>`);
      //response.status(400).send(alertString);
      response.render("login-page", failVariables);
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
});

app.get("/home-page", (req, res) => {
  const apiKey = process.env.DAILY_HOLIDAYS_API_KEY;

  const variables = {
    holidayApiKey: apiKey,
    portNumber: portNumber,
  };
  res.render("home-page", variables);
});

app.get("/view-favorite-holidays", async (request, response) => {
  const variables = {
    portNumber: portNumber,
  }
  response.render("view-favorite-holidays", variables)
});

app.get("/other-days", (request, response) => {
  const apiKey = process.env.DAILY_HOLIDAYS_API_KEY;
  const variables = {
    portNumber: portNumber,
    holidayApiKey: apiKey,
  }
  response.render("other-days", variables);
});

app.get("/account-home", (request, response) => {
  const variables = {
    portNumber: portNumber,
  };
  response.render("home-page", variables);
});

app.listen(portNumber, () => {
  console.log(`Started on port ${portNumber}`);
});
