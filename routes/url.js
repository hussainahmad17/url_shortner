const express = require('express');
const { handleGenerateShortID, handleAnalytics, handleGetAllUrls } = require('../controllers/url');
const router = express.Router();


router.post("/", handleGenerateShortID)
router.get("/analytics/:shortID", handleAnalytics)
// router.get("/", handleGetAllUrls)

module.exports = router;