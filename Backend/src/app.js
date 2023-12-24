const express = require("express");
const path = require("path");
const app = express();
require("./db/conn");
const Register = require("./models/registers");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));

app.get("/", (req,res) => {
    res.send("Welcome to Neogym")
});

app.get("/register", (req,res) => {
    res.render("register");
})


app.post("/register", async (req,res) => {
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
            const registerUser = new Register({
                name : req.body.name,
                email : req.body.email,
                phone : req.body.phone,
                age : req.body.age,
                password : password,
                confirmpassword : cpassword

            })

            const registered = await registerUser.save();
            res.status(201).render("index");

        }else{
            res.send("Passwords are not matching")
        }



        console.log(req.body.name);
        res.send(req.body.name);

    }catch(error){
        res.status(400).send(error);
    }
})


app.listen(port, () => {
    console.log(`Server running at port number ${port}`);
})