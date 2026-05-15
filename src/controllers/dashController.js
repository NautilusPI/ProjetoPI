var dashModel = require("../models/dashModel");

function graficoTanqueEspecifico(req, res) {

    const tanqueID = req.params.tanqueID;
    const inicio = req.params.inicio;
    const fim = req.params.fim;

    console.log(tanqueID + " | " + inicio + " | " + fim);

    dashModel.buscarRegistroTanque(tanqueID, inicio, fim)
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((erro) => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function alertas7Dias(req, res) {

    dashModel.buscarAlertas7Dias()
        .then(resultado => {
            res.status(200).json(resultado);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function temperaturaAtual(req, res) {
    dashModel.buscarTemperaturaAtual()
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

function ultimoAlerta(req, res) {
    dashModel.buscarUltimoAlerta()
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

function statusSensor(req, res) {
    dashModel.buscarStatusSensor()
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

function StatusTanque(req, res) {
    dashModel.buscarStatusTanque()
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

function modeloSensor(req, res) {
    dashModel.buscarModeloSensor()
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

function instalacao(req, res) {
    dashModel.buscarInstalacao()
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

function capacidade(req, res) {
    dashModel.buscarCapacidade()
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

function buscarMedidasEmTempoReal(req,res){
   console.log(req.params.inicio+"   "+req.params.fim)
   dashModel.buscarMedidasEmTempoReal(req.params.inicio,req.params.fim).then((resultado) => {
    res.status(200).json(resultado);
  });
}

module.exports = {
    graficoTanqueEspecifico,
    alertas7Dias,
    temperaturaAtual,
    ultimoAlerta,
    statusSensor,
    StatusTanque,
    modeloSensor,
    instalacao,
    capacidade,
    buscarMedidasEmTempoReal
};
