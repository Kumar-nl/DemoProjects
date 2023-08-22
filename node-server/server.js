const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const {encrypt, decrypt} = require("./encryptionHandler");

const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'password',
    database:'passwordManager'
});

const app = express();
app.use(cors());
app.use(express.json())
const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Hello world!")
})

app.get("/showPasswords", (req, res) => {
    db.query("SELECT * FROM passwords;", (err, result) => {
        if(err){
            console.log("Error: ", err);
        } else {
            res.send(result);
        }
    })
})

app.post("/addPassword",(req, res) => {
    const {password, title} = req.body;
    const hashedPassword = encrypt(password);
    db.query("INSERT INTO passwords (password, title, iv) VALUES (?,?,?)", [hashedPassword.password, title, hashedPassword.iv], (err, result) => {
        if(err){
            console.log("Error:", err);
        } else {
            res.send({message:"Success"});
        }
    })
})

app.post("/decryptPassword",(req, res) => {
    const payload = req.body;
    res.send(decrypt(payload));

    // db.query("INSERT INTO passwords (password, title, iv) VALUES (?,?,?)", [hashedPassword.password, title, hashedPassword.iv], (err, result) => {
    //     if(err){
    //         console.log("Error:", err);
    //     } else {
    //         res.send({message:"Success"});
    //     }
    // })
})

app.listen(PORT, () => {
    console.log(`server is running on port ${5000}`);
})
