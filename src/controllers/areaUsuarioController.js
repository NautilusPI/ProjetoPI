var areaUsuarioModel = require("../models/areaUsuarioModel");

function cadastrarTanque(req, res) {
  var tanque = req.body.nomeTanqueServer;
  var setor = req.body.nomeSetorServer;
  var capacidade = req.body.capacidadeServer;
  var idUsuario = req.body.idUsuarioServer;

  if (tanque == undefined) {
    res.status(400).send("Nome do tanque está undefined!");
  } else if (setor == undefined) {
    res.status(400).send("Nome do setor está undefined!");
  } else if (capacidade == undefined) {
    res.status(400).send("Capacidade está undefined!");
  } else {
    areaUsuarioModel
      .cadastrarTanque(tanque, setor, capacidade, idUsuario)
      .then(function (resultado) {
        res.status(200).json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function listarDados(req, res) {

    var idUsuario = req.params.idUsuario;

    areaUsuarioModel.listarDados(idUsuario)
        .then(function(resultado){

            res.json({
                tanques: resultado[0],
                sensores: resultado[1],
            });


        })
        .catch(function(erro){

            console.log(erro);
            res.status(500).json(erro.sqlMessage);

        });
}

module.exports = {
  cadastrarTanque,
  listarDados
};
