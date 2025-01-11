const express = require("express")
const app = require("./app/config.js");
const hbs = require("express-handlebars");
const { marked } = require("marked");
const path = require("path")


app.engine("hbs", hbs.engine({
  extname: ".hbs",
  defaultLayout: "main"
}))
app.set("view engine", "hbs");
app.set("views", path.join(__dirname + "/views"))

app.get("/", async(req, res)=>{
  res.render("home")
})