const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "sayas_db"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    const sqlInsert = "INSERT INTO test_table(id, name, email, contact) VALUES('001','saad','sd@gmail','tanger')";
db.query(sqlInsert, (err, result) =>{
    console.log("error", err);
    console.log("result", result);
    res.send("Hello SAYAS!");
} )
    
})

app.listen(5000, () => {
    console.log("Server is runing on port 5000");
})