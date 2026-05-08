var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");

router.get("/graficoTanqueEspecifico/:tanqueID", function (req, res) {
   dashController.graficoTanqueEspecifico(req,res)
})
module.exports = router;