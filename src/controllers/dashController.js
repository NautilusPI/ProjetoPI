var dashModel = require("../models/dashModel");
function graficoTanqueEspecifico(req,res){
 dashModel.buscarRegistroTanque().then((resultado) => {
    res.status(200).json(resultado);
  });
}
module.exports = {
   graficoTanqueEspecifico
}