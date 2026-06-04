var dashModel = require("../models/dashModel");

function graficoTanqueEspecifico(req, res) {
  const tanqueID = req.params.tanqueID;
  const inicio = req.params.inicio;
  const fim = req.params.fim;

  console.log(tanqueID + " | " + inicio + " | " + fim);

  dashModel
    .buscarRegistroTanque(tanqueID, inicio, fim)
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function alertas7Dias(req, res) {
  dashModel
    .buscarAlertas7Dias()
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function temperaturaAtual(req, res) {
  dashModel
    .buscarTemperaturaAtual()
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => res.status(500).json(erro.sqlMessage));
}

function ultimoAlerta(req, res) {
  dashModel
    .buscarUltimoAlerta()
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => res.status(500).json(erro.sqlMessage));
}

function statusSensor(req, res) {
  dashModel
    .buscarStatusSensor()
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => res.status(500).json(erro.sqlMessage));
}

function StatusTanque(req, res) {
  dashModel
    .buscarStatusTanque()
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => res.status(500).json(erro.sqlMessage));
}

function modeloSensor(req, res) {
  dashModel
    .buscarModeloSensor()
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => res.status(500).json(erro.sqlMessage));
}

function instalacao(req, res) {
  dashModel
    .buscarInstalacao()
    .then((resultado) => res.status(200).json(resultado))
    .catch((erro) => res.status(500).json(erro.sqlMessage));
}

function capacidade(req, res) {
  dashModel
    .buscarCapacidade()
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
  statusSensor,
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
