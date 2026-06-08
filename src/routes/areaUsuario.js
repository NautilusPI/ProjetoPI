var express = require("express");
var router = express.Router();

var areaUsuarioController = require ("../controllers/areaUsuarioController");

router.post("/cadastrarTanque", function (req, res) {
    areaUsuarioController.cadastrarTanque(req, res);
});

router.get("/listarDados/:idUsuario", function(req, res){
    areaUsuarioController.listarDados(req, res);
});

router.get("/buscarSetores/:idUsuario", function(req, res){
    areaUsuarioController.buscarSetores(req, res);
});

module.exports = router;