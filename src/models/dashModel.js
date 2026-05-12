
var database = require("../database/config");
function buscarRegistroTanque(dataInicio,dataFim){
 let query = `select registroTemperatura,dataHora from registroTemperatura join sensor on fkSensor = idSensor join tanque on fkTanque = idTanque where nomeTanque ='tanque 1' and dataHora between '${dataInicio}' and '${dataFim}' ;
     ;`
 return database.executar(query)
}
module.exports = {
    buscarRegistroTanque
}