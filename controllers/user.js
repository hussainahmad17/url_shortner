const User = require("../models/user")
const {v4:uuidv4}  = require("uuid")
const {setUser} = require("../service/auth")

const handleUserSignUp = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        console.log("User created successfully:", { name, email });
        res.redirect("/");  
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).send("Internal Server Error");
    }
}

const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(404).render("login", { error: "Invalid email or password" });
        }
        const sessionId = uuidv4();
        setUser(sessionId, user);
        res.cookie("uid", sessionId)
        res.redirect("/");  
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    handleUserSignUp,
    handleUserLogin
}
