const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
var testList = require("./interface").testList;

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get("/", function(req, res) {
  res.sendFile(__dirname +  "/index.html");
});

function countNumerics(s) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    if (/[0-9]/.test(s[i])) {
      count++;
    }
  }
  return count;
}
var predict = [];
var user = "";

app.post("/", async function(req, res) {
  var username = req.body.firstName;
  user = username;
  var fullname = req.body.fullName;
  var desc = req.body.desc;
  var url = req.body.url;
  var following = req.body.following;
  var followers = req.body.followers;
  var posts = req.body.posts;
  var pro_pic = req.body.pro_pic;
  var pri = req.body.private;
  if(pro_pic === "on")
    pro_pic = "1";
  else pro_pic = "0";
  if(pri === "on")
    pri = "1";
  else pri = "0";

  if(url) url = 1;
  else url = 2;

  predict.push(parseInt(pro_pic));
  predict.push(countNumerics(username)/username.length);
  predict.push(fullname.length);
  predict.push(countNumerics(fullname)/fullname.length);
  predict.push((fullname == username) ? 1 : 0);
  predict.push(desc.length);
  predict.push(url);
  predict.push(parseInt(pri));
  predict.push(parseInt(posts));
  predict.push(parseInt(followers));
  predict.push(parseInt(following));
  let output = await testFunc(predict);
  if (output.dense_14.data[0] > output.dense_14.data[1])
    res.json({ isFake: true });
  else res.json({ isFake: false });

});

async function testFunc(predict) {
  let output = await testList(predict);
  console.log("in index");
  console.log(output);
}

app.listen(3000, function () {
  console.log("Started at 3000");
}); 