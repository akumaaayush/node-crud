const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { urlencoded } = require("express");
const cors = require("cors");
const blogRoutes = require("./routes/blogRoutes");
require("dotenv").config();

//mongodb
const dbURI = process.env.DB_URL;

//connnecting mongoose
try {
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to database!");
} catch (error) {
  handleError(error);
}

//express app
const app = express();
app.use(cors());
const port = 1337;

//setting ejs as view engine
app.set("view engine", "ejs");
app.options("*", cors()); //cors

//app listen on the port
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//normal routes
app.get("/", (req, res) => {
  //redirecting
  res.redirect("/blogs");
});

//about and contact page
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//contact routes
app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact" });
});

//blogRoutes
app.use("/blogs", blogRoutes);

app.use("", (req, res) => {
  res.status(400).render("404");
});
