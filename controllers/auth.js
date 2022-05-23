
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const async = require("hbs/lib/async");

const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
})

exports.register = (req,res) => {

    const {name, email, password, passwordConfirm} = req.body;

    db.query("SELECT email from users WHERE email = ?", [email], async(err, results) => {
        if(err){
            console.log(err);
        }

        if(results.length >0 ){
            return res.render("register" ,{
                msg : "Email has been already taken"
            })
        }else if(password !== passwordConfirm){
            return res.render("register", {
                msg : "Confirm password not match"
            })
        }

        let hashedPassword = await bcrypt.hash(password,8)

        db.query("INSERT INTO users SET ? ", {name:name,email:email,password:hashedPassword}, (error, resultsI)=>{
            if(error){
                console.log(error);
            }else{
                return res.render("register", {
                    msg : "User registred successfully"
                })
            }
        })
    });
}