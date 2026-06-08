var areaUsuarioModel = require("../models/areaUsuarioModel");

function cadastrarTanque(req, res) {
  
  var tanque = req.body.nomeTanqueServer;
  var capacidade = req.body.capacidadeServer;
  var idUsuario = req.body.idUsuarioServer;
  var idSetor = req.body.idSetorServer;
  
    areaUsuarioModel
      .cadastrarTanque(tanque, idSetor, capacidade, idUsuario)
      .then(function (resultado) {
        res.status(200).json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
      });
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

function buscarSetores(req, res) {

    var idUsuario = req.params.idUsuario;

    areaUsuarioModel.buscarSetores(idUsuario)
        .then(function(resultado){
                  res.status(200).json(resultado);
        })
        .catch(function(erro){
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
  cadastrarTanque,
  listarDados,
  buscarSetores
};
