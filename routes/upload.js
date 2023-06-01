var express = require("express");
var router = express.Router();


// 登录校验
router.get("/", function (req, res) {
     res.render("upload", {title:"Avatar"})
});

module.exports = router;