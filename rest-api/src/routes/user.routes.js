const express = require("express");
const { isUserAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.get("/user/auth",isUserAuthenticated,(req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.send("401");
  }
});


module.exports = router;