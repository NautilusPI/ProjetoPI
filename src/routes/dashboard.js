var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");

// src/routes/dashboard.js

router.get("/graficoTanqueEspecifico/:tanque/:inicio/:fim", function (req, res) {
   dashController.graficoTanqueEspecifico(req,res)
})
router.get("/alertas-7-dias/:tanque", function (req, res) {
   dashController.alertas7Dias(req, res);
});

router.get("/nome-setor/:tanque", function (req, res) {
    dashController.nomeSetor(req, res);
});

router.get("/status-tanque/:tanque", function (req, res) {
    dashController.StatusTanque(req, res);
});

router.get("/modelo-sensor/:tanque", function (req, res) {
    dashController.modeloSensor(req, res);
});

router.get("/instalacao/:tanque", function (req, res) {
    dashController.instalacao(req, res);
});

router.get("/capacidade/:tanque", function (req, res) {
    dashController.capacidade(req, res);
});
router.get("/temperatura-atual/:tanque", function (req, res) {
    dashController.temperaturaAtual(req, res);
});

router.get("/ultimo-alerta/:tanque", function (req, res) {
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


