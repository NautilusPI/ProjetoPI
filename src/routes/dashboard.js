var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");

router.get("/graficoTanqueEspecifico/:tanqueID/:inicio/:fim", function (req, res) {
   dashController.graficoTanqueEspecifico(req,res)
})
router.get("/alertas-7-dias", function (req, res) {
   dashController.alertas7Dias(req, res);
});

router.get("/status-sensor", function (req, res) {
    dashController.statusSensor(req, res);
});

router.get("/status-tanque", function (req, res) {
    dashController.StatusTanque(req, res);
});

router.get("/modelo-sensor", function (req, res) {
    dashController.modeloSensor(req, res);
});

router.get("/instalacao", function (req, res) {
    dashController.instalacao(req, res);
});

router.get("/capacidade", function (req, res) {
    dashController.capacidade(req, res);
});
router.get("/temperatura-atual", function (req, res) {
    dashController.temperaturaAtual(req, res);
});

router.get("/ultimo-alerta", function (req, res) {
    dashController.ultimoAlerta(req, res);
});

router.get("/buscarTempoReal", function (req, res) {
   dashController.buscarMedidasEmTempoReal(req,res)
});


module.exports = router;


