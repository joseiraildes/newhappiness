const app = require("./app/config.js")
const port = process.env.PORT || 3000

require("./routes.js")

app.listen(port, (err)=>{
  if(err) throw err
  console.log(`Server running on port ${port}`)
})