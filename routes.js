require("dotenv").config()
const express = require("express")
const app = require("./app/config.js");
const hbs = require("express-handlebars");
const { marked } = require("marked");
const path = require("path");
const IpGeolotation = require("./infra/ip.js");
const User = require("./models/Users.js");
const Date = require("./infra/Date.js");
const formatUser = require("./user/formatUser.js");
// const nodemailer = require("nodemailer");
// const sendEmail = require("./email/sendEmail.js");
// const { transporter } = require("./infra/email.js");

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

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
    <button type='button' class='btn btn-sm bt-outline-dark' onclick="location.href='/login'">Entrar</button>
    <button type='button' class='btn btn-sm btn-dark' onclick="location.href='/cadastro'">Cadastrar</button>
    `
    res.render("home", {
      buttons
    })
  }
  else{
    const buttons = `
    <a href="/@${user["nome"]}" class="text-muted">${user["nome"]}</a>
    `
    res.render("home", {
      buttons
    })
  }
})
app.get('/cadastro', async(req, res)=>{
  const ip = await IpGeolotation()

  const user = await User.findOne({
    where: {
      ip: ip.ip
    }
  })
  
  if(user === null){
    const buttons = `
    <button type='button' class='btn btn-sm bt-outline-dark' onclick="location.href='/login'">Entrar</button>
    <button type='button' class='btn btn-sm btn-dark' onclick="location.href='/cadastro'">Cadastrar</button>
    `
    res.render("cadastro", {
      buttons
    })
  }else{
    res.redirect('/')
  }
})
app.post('/cadastro', async(req, res)=>{
  const ip = await IpGeolotation()
  const date = Date()
  const { email, senha } = req.body
  const biografia = marked("##### Olá mundo")
  const nome = formatUser(req.body.nome)

  const findUser = await User.findOne({
    where: {
      nome,
      email
    }
  })
  if(findUser === null){
    await User.create({
      nome,
      email,
      senha,
      biografia,
      ip: ip.ip,
      data: date
    })
    res.redirect('/')
  }else{
    res.render("cadastro", {
      message: `
      <div class="alert alert-danger" role="alert">
        Já existe um usuário com este nome ou email.
      </div>      
      `
    })
  }
  
})
app.get('/login', async(req, res)=>{
  const ip = await IpGeolotation()
  const user = await User.findOne({
    where: {
      ip: ip.ip
    }
  })
  
  if(user === null){
    const buttons = `
    <button type='button' class='btn btn-sm bt-outline-dark' onclick="location.href='/login'">Entrar</button>
    <button type='button' class='btn btn-sm btn-dark' onclick="location.href='/cadastro'">Cadastrar</button>
    `
    res.render("login", {
      buttons
    })
  }else{
    res.redirect('/')
  }
})