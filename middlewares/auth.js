const { getUser } = require("../service/auth")


//validate the user
const restrictloggedInUsers = async (req, res, next) => {
    const sessionID = req.cookies?.uid
    if(!sessionID){
       return res.redirect("login")
    }
    const user = getUser(sessionID)
    if(!user){
        res.render("login")
    }
    req.user = user
    next()
}


const checkAuth = async (req,res,next) => {
    const sessionID = req.cookies?.uid
    const user = getUser(sessionID)
    req.user = user
    next()
}


module.exports = {
    restrictloggedInUsers,
    checkAuth              
}