const shortid = require('shortid');
const Url = require('../models/url');


const handleGenerateShortID = async (req, res) => {
    const body = req.body;        
    if (!body || !body.redirectUrl) {
        return res.status(400).json({ error: "URL is required" });
    }
    const shortID = shortid()
    await Url.create({
        shortID: shortID,
        redirectUrl: body.redirectUrl,
        visitHistory: [],
        createdBy: req.user._id.toString()
    })
    res.render("home",{id: shortID});
}


const handleAnalytics = async (req, res) => {
    const shortID = req.params.shortID;
    const result = await Url.findOne({shortID})
    if (!result) {
        return res.status(404).json({ error: "Short ID not found" });
    }
    res.status(200).json({
       Clicks: result.visitHistory.length,
       Analytics: result.visitHistory
    })
}


const handleGetAllUrls = async (req, res) => {
    const urls = await Url.find({});
    res.render("home", { urls });
}



module.exports = {
    handleGenerateShortID,
    handleAnalytics,
    handleGetAllUrls
}