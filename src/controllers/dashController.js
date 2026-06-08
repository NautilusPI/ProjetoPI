var dashModel = require("../models/dashModel");


function graficoTanqueEspecifico(req, res) {
  const tanque = req.params.tanque;
  const inicio = req.params.inicio;
  const fim = req.params.fim;

  console.log(tanque + " | " + inicio + " | " + fim);

  dashModel
    .buscarRegistroTanque(tanque, inicio, fim)
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function alertas7Dias(req, res) {
  const tanque = req.params.tanque;
  dashModel
    .buscarAlertas7Dias(tanque)
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function temperaturaAtual(req, res) {
  const tanque = req.params.tanque;
  dashModel
    .buscarTemperaturaAtual(tanque)
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => res.status(500).json(erro.sqlMessage));
}

function ultimoAlerta(req, res) {
  const tanque = req.params.tanque;
  dashModel
    .buscarUltimoAlerta(tanque)
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => res.status(500).json(erro.sqlMessage));
}

function nomeSetor(req, res) {
  const tanque = req.params.tanque;
  dashModel
    .buscarnomeSetor(tanque)
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => res.status(500).json(erro.sqlMessage));
}

function StatusTanque(req, res) {
  const tanque = req.params.tanque;
  dashModel
    .buscarStatusTanque(tanque)
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => res.status(500).json(erro.sqlMessage));
}

function modeloSensor(req, res) {
  const tanque = req.params.tanque;
  dashModel
    .buscarModeloSensor(tanque)
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => res.status(500).json(erro.sqlMessage));
}

function instalacao(req, res) {
  const tanque = req.params.tanque;
  dashModel
    .buscarInstalacao(tanque)
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => res.status(500).json(erro.sqlMessage));
}

function capacidade(req, res) {
  const tanque = req.params.tanque;
  dashModel
    .buscarCapacidade(tanque)
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => res.status(500).json(erro.sqlMessage));
}

function buscarMedidasEmTempoReal(req, res) {

  let idEmpresa = req.params.idEmpresa;

  dashModel.buscarMedidasEmTempoReal(idEmpresa).then((resultado) => {
      res.status(200).json(resultado);
    });
}

function buscarTotalAlertasDia(req, res) {
  let idEmpresa = req.params.idEmpresa;

  dashModel
    .buscarTotalAlertasDia(idEmpresa)
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => res.status(500).json(erro.sqlMessage));
}

function totalTanques(req, res) {
  let idEmpresa = req.params.idEmpresa;

  dashModel
    .buscarTotalTanques(idEmpresa)
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function sensoresOffline(req, res) {
  let idEmpresa = req.params.idEmpresa;

  dashModel
    .buscarSensoresOffline(idEmpresa)
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function tanquesRisco(req, res) {
  let idEmpresa = req.params.idEmpresa;

  dashModel
    .buscarTanquesRisco(idEmpresa)
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function statusViveiro(req, res) {
  let idEmpresa = req.params.idEmpresa;

  dashModel
    .buscarStatusViveiro(idEmpresa)
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function graficoBarra(req, res) {
  let idEmpresa = req.params.idEmpresa;

  dashModel
    .buscarDadosGraficoBarra(idEmpresa)
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  graficoTanqueEspecifico,
  alertas7Dias,
  temperaturaAtual,
  ultimoAlerta,
  nomeSetor,
  StatusTanque,
  modeloSensor,
  instalacao,
  capacidade,
  buscarMedidasEmTempoReal,
  buscarTotalAlertasDia,
  totalTanques,
  sensoresOffline,
  tanquesRisco,
  statusViveiro,
  graficoBarra,
};
