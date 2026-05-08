
var database = require("../database/config");
function buscarRegistroTanque(){
 let query = `select registroTemperatura,dataHora from registroTemperatura join sensor on fkSensor = idSensor join tanque on fkTanque = idTanque where nomeTanque ='tanque 1' ;
     ;`
 return database.executar(query)
}
module.exports = {
    buscarRegistroTanque
}