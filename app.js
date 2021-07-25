const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }))

// -------------Serving Static Page-----------
app.use(express.static(__dirname + "/public"));

// -----------Setting up view engine to ejs-------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// ----------Get method calls---------------------
app.get("/", function (req, res) {
  res.render("home");
})
app.get("/index",(req,res)=>{
  res.render("index")
})

app.get("/about", function (req, res) {
  res.render("about");
})

app.get('/status', function(req,res){
  let connection = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "",
    database:"imstrial"
  });
  connection.connect();
  console.log('connected to db');

  connection.query("SELECT * FROM userapplications", function(err,result){
    if(err) throw err;
    
    
    res.render("status",{data:result});
  });
  connection.end()
})


// --------------Connecting to database from signUp page-----------
app.get("/login", function (req, res) {
  res.render("login");
})
app.get('/signup',(req,res)=>{
  res.render('Signup')
})
app.post('/signup', (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  let data = {}
  if (password == confirmPassword) {
    data = {
      name: name,
      phone: phone,
      email: email,
      password: password
    }
    // connect to database
    let connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "imstrial"
    });

    connection.connect();
    console.warn("db connected")

    connection.query("INSERT INTO authenticate SET ? ", data,
      function (error, result, fields) {
        if (error) throw error;
        console.warn("insertion successful");
      });

    connection.end();
    res.render("login");
  } else {
    res.render("Signup");
    console.log('Error');
  }
})



// -------------------Login authentication--------------------------
// app.get('/loginPage', (req,res)=>{
//   res.render('login');
// })
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "imstrial"
  });
  connection.connect();
  console.log("db connected");

  connection.query("SELECT email, password FROM authenticate where email=?", email,
    function (error, result) {
      if (error) {
        throw error;
      } else {
        if (result.length == 0) {
          console.log('name not available');
          res.render("Signup");
        } else if (result[0].password == password) {
          console.log("loging succesful");
          res.render("home");
        } else {
          console.log('invalid user and password');
          res.render("login", {error:'Invalid email address. Please try again!'});
        }
      }
    });
  connection.end();
})


// ------------Accepting User Applications-------------
app.get('/apply', (req,res)=>{
  res.render('apply');
})
app.post("/apply", (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const password = req.body.password;
  const education = req.body.education;
  const design = req.body.design;
  const userView = req.body.userView;
  const status = 0;
  let userData = {
    name :name,
    phone: phone,
    email: email,
    education: education,
    design: design,
    userView: userView,
    status: status
  }

  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "imstrial"
  });
  connection.connect();
  console.log("db connected");

  connection.query("SELECT email, password FROM authenticate where email=?", email,
    function (error, result) {
      if (error) {
        throw error;
      } else {
        if (result.length == 0) {
          console.log('name not available');
          res.render("applyFailure");
          connection.end();
        } else if (result[0].password == password) {
          console.log(userData);
          connection.query("INSERT INTO userapplications SET ? ", userData,
            function (error, result, fields) {
              if (error){
                throw error;
              } 
              else{
                console.warn("insertion successful");
                res.render("applySuccess");
              }
              connection.end();   
            });
        } else {
          console.log('invalid user and password');
          res.render("apply", {error: "Invalid username and password"});
          connection.end();
        }
      }
    });
    console.log('im out');
})


// -----------Admin Page-------------------------
app.get('/admin', function(req,res){
  let connection = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "",
    database:"imstrial"
  });
  connection.connect();
  console.log('connected to db');

  connection.query("SELECT * FROM userapplications", function(err,result){
    if(err) throw err;
    
    res.render("admin",{data:result});
  });
  connection.end()
})


//reject
app.get("/users/edit/current=accept/(:id)/(:s)", function (req, res) {
  var id = req.params.id; // get the id from FE
  var stat = req.params.s;

  
  stat = "Rejected";
  
  // connect to db
  var mysql = require("mysql");
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "imstrial",
    
  });
  connection.connect();
  // query to accept or reject

  let udata = [stat, id];
  connection.query(
    "UPDATE userapplications SET status=? WHERE id=?",
    udata,
    function (err, res) {
      if (err) throw err;
      console.log("updated");
      // refreshData();
    }
  );
  connection.end();
  res.redirect(req.get("referer"));
});

// --for accepting-
app.get("/users/edit/current=reject/(:id)/(:s)", function (req, res) {
  var id = req.params.id; // get the id from FE
  var stat = req.params.s;

  
  stat = "selected";
  
  // connect to db
  var mysql = require("mysql");
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "imstrial",
  });
  connection.connect();
  // query to accept or reject

  let udata = [stat, id];
  connection.query(
    "UPDATE userapplications SET status=? WHERE id=?",
    udata,
    function (err, res) {
      if (err) throw err;
      console.log("updated");
      
    }
  );
  connection.end();
  res.redirect(req.get("referer"));
});
























// --------------Listening Port--------------------
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})