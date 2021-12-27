const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const jwt = require("jsonwebtoken")

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "sayas_db"
});
app.use(
    session({
      key: "userId",
      secret: "subscribe",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 60 * 60 * 24,
      },
    })
  );
app.get('/dashboard',verifyJWT,(req,res)=>{
    res.send("YOU ARE AUTHENTICATED CONGRATS");
})
 const verifyJWT = (req, res , next)=>{
     const token = req.headers["x-access-token"]
     if(!token){
         res.send("we need a token");
     }else{
         jwt.verify(token, "jwtSecret",(err,decoded)=>{
             if(err){
                 res.json({auth:false, message: "U failed to autenticate"});
             }else{
                 req.userId = decoded.id;
                 next();

             }
         });
     }
 }
app.get("/login", (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false });
    }
  });
  
  app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    db.query(
      "SELECT * FROM users WHERE username = ?;",
      username,
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
  
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
             const id = result[0].id;
             const token = jwt.sign({i},"jwtSecret",{
                 expiresIn:300,
             })
             rep.session.user = result;
              res.json({auth: true , token:token , result : result});
            } else {
                res.json({auth:false ,message:"wrong username/password combination"});;
            }
          });
        } else {
          res.json({auth: false , message:"no user exists"});
        }
      }
    );
  });
  
  app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
  
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      }
  
      db.query(
        "INSERT INTO users (username, password,email,firstname,lastname) VALUES (?,?,?,?,?)",
        [username, hash],
        (err, result) => {
          console.log(err);
        }
      );
    });
  });
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({extended: true}));

// app.get("/", (req, res) => {
//     const sqlInsert = "INSERT INTO test_table(id, name, email, contact) VALUES('001','saad','sd@gmail','tanger')";
// db.query(sqlInsert, (err, result) =>{
//     console.log("error", err);
//     console.log("result", result);
//     res.send("Hello SAYAS!");
// } )
    
// })

app.listen(5000, () => {
    console.log("Server is runing on port 5000");
})