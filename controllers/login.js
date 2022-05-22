
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


exports.login = async(req,res) => {

    const {email, password} = req.body;

    db.query("SELECT * from users WHERE email = ?", [email], (err, results) => {
        if(err){
            console.log(err);
        }
        
        if(results.length >0 ){

            bcrypt.compare(password,results[0].password, (err1, data1) => {
                if (err1) console.log(err1);

                if(data1){
                    return res.render("index" ,{
                        msg : "Logged in success",
                        name : results[0].name,
                    })
                }else{
                    return res.render("login", {
                        msg : "Invalid credentials"
                    })
                }
            })
        }else{
            return res.render("login", {
                msg : "Invalid credentials"
            })
        }
    });
}
