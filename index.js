const express = require("express");
const app = express();
const path = require("path");
const flash = require("express-flash");
const session = require("express-session");


const indexRouter = require("./routes/index");


const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs"); // Template engine
app.use(express.static("public")); // For Public Css Js and other lib

app.use(session({
    resave:false, // if value not change that time data not saved on server
    saveUninitialized:false, // if data have no name that time data not saved on server
    secret: "Checkingggggg"
}));

app.use(flash()); // Error flashing

app.use(indexRouter);


app.listen(PORT);
