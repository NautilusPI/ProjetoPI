var dashModel = require("../models/dashModel");
function graficoTanqueEspecifico(req,res){
   console.log(req.params.inicio+"   "+req.params.fim)
 dashModel.buscarRegistroTanque(req.params.inicio,req.params.fim).then((resultado) => {
    res.status(200).json(resultado);
  });
}
module.exports = {
   graficoTanqueEspecifico
}