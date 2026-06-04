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

router.get("/buscarTempoReal/:idEmpresa", function (req, res) {
   dashController.buscarMedidasEmTempoReal(req,res)
});

router.get("/buscarTotalAlertasDia/:idEmpresa", function (req, res) {
   dashController.buscarTotalAlertasDia(req,res)
});

router.get("/totalTanques/:idEmpresa", function(req, res){
    dashController.totalTanques(req,res);
});

router.get("/sensoresOffline/:idEmpresa", function(req, res){
    dashController.sensoresOffline(req, res);
});

router.get("/tanquesRisco/:idEmpresa", function(req, res){
    dashController.tanquesRisco(req, res);
});

router.get("/statusViveiro/:idEmpresa", function(req, res){
    dashController.statusViveiro(req, res);
});

router.get("/graficoBarra/:idEmpresa", function(req, res){

    dashController.graficoBarra(req, res);

});

module.exports = router;


