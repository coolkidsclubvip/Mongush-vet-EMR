var express = require("express");
var router = express.Router();
const GPModel = require("../models/GPModel");
const GPController = require("../controllers/GPController"); 
const multer = require("multer");
const upload = multer({ dest: "public/uploads/avatar/" });
const isAdmin = require("../middleware/isAdmin");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Medical Practitioner" });
});


// 添加 的路由中间件
router.post("/", isAdmin,upload.single("avatar"), GPController.addGP);

// 更新 的路由中间件
router.put("/:id", isAdmin, GPController.updateGP); 

// 删除 的路由中间件
router.delete("/:id", isAdmin, GPController.deleteGP);

// 首页出现全部用户列表
router.get("/list", GPController.getGPList);



module.exports = router;
