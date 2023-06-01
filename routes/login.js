var express = require("express");
var router = express.Router();
const GPController = require("../controllers/GPController"); ;

// 登录校验
router.post("/", GPController.login);

// 退出登录（销毁session)
router.get('/logout',GPController.logout)

router.get('/', function(req, res, next) {
     res.render('login',{title: "MOGUSH VETERINARY CLINIC"} )
})

module.exports = router