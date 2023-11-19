const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.sendFile(__dirname +  "/index.html");
});

app.post("/", function(req, res) {
  const username = req.body.firstName;
  const desc = req.body.desc;
  const url = req.body.url;
  const following = req.body.following;
  const followers = req.body.followers;
  const posts = req.body.posts;
  var pro_pic = req.body.pro_pic;
  var private = req.body.private;
  if(pro_pic === "on")
    pro_pic = "1";
  else pro_pic = "0";
  if(private === "on")
    private = "1";
  else private = "0";
  
})

app.listen(3000, function () {
  console.log("Started at 3000");
}) 
