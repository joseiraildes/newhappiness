const express = require("express")
const app = require("./app/config.js");
const hbs = require("express-handlebars");
const { marked } = require("marked");
const path = require("path");
const IpGeolotation = require("./infra/ip.js");
const User = require("./models/Users.js");


app.engine("hbs", hbs.engine({
  extname: ".hbs",
  defaultLayout: "main"
}))
app.set("view engine", "hbs");
app.set("views", path.join(__dirname + "/views"))

app.get("/", async(req, res)=>{
  const ip = await IpGeolotation()
  console.log(ip)
  const user = await User.findOne({
    where: {
      ip: ip.ip
    }
  })

  if(user === null){
    const buttons = `
    <button type='button' class='btn btn-sm btn-outline-light' onclick="location.href='/login'">Entrar</button>
    <button type='button' class='btn btn-sm btn-outline-warning' onclick="location.href='/register'">Cadastrar</button>
    `
    res.render("home", {
      buttons
    })
  }
  else{
    const buttons = `
    <a href="/@${user["nome"]}" class="text-white"><strong>@${user["nome"]}</strong></a>
    `
    res.render("home", {
      buttons
    })
  }
})