const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")

mongoose.Promise = Promise
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true}, ()=>{
  console.log("Mongoose up");
})
const User = require("./models/user")

var app = express();
const port = 3002;

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(express.static(__dirname)); //pozwala na hostowanie plików

app.get("*", function(req, res, next) {
  next();
});

app.get("/api/getUser", async (req, res)=>{
  const {login} = req.body;
  try {
    res.send(await User.findOne({login: login}));
  } catch (error) {
    res.send({message: "Błąd przy dodawaniu" })
  }
})
app.get("/api/users", async (req, res)=>{
  try {
    res.send(await User.find({}));
  } catch (error) {
    res.send({message: "Błąd przy wybieraniu" })
  }
})

app.put("/api/updateUser", async (req, res)=>{
  const {login, email, password, quote} = req.body;
  try {
    res.send(await User.updateOne({login: login}, {$set: {login, email, password, quote}}));
  } catch (error) {
    console.log(error);
    res.send({message: "Błąd przy aktualizacji" })
  }
})

app.delete("/api/deleteUser", async (req, res)=>{
  const {login} = req.body;
  try {
    await User.deleteOne({login: login}, (err)=>{
      res.send({message: err})
    });    
  } catch (error) {
    res.send({ message: "Błąd usuwania" })
  }
})

app.post("/api/createUser", async (req, res)=>{
  const {login, email, password, quote} = req.body;
  const user = new User({
    login,
    email,
    password,
    quote
  })
  try {
    await user.save();
  } catch (error) {
    res.json({message: "Błąd tworzenia"})
  } 
  res.json({message: "Utworzono"})
})


var server = app.listen(port, function() {
  var host = server.address().address;
  console.log("Example app listening at http://%s:%s", host, port);
});
