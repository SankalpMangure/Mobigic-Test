const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({path:'./.env'})

const app = express();

const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
})

const publicDirectory = path.join(__dirname, './public'); 
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

db.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("connected success");
    }
});

app.set("view engine", 'hbs');

app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

app.get("/logout", function(req,res){
    return res.render("index" ,{})
})


app.listen(8082, () => {
    console.log("server started");
});