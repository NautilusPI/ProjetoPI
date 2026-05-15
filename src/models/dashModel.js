var database = require("../database/config");


function buscarRegistroTanque(tanqueID, dataInicio, dataFim){

    let query = `
        select registroTemperatura, dataHora 
        from registroTemperatura 
        join sensor on fkSensor = idSensor 
        join tanque on fkTanque = idTanque 
        where idTanque = ${tanqueID}
        and dataHora between '${dataInicio}' and '${dataFim}';
    `;

    return database.executar(query);
}

function buscarTemperaturaAtual(){
    let query = `
        SELECT registroTemperatura
        FROM registroTemperatura
        ORDER BY dataHora DESC
        LIMIT 1;
    `
    return database.executar(query)
}

function buscarStatusSensor(){
    let query = `
        SELECT StatusSensor
        FROM sensor
        LIMIT 1;
    `
    return database.executar(query)
}

function buscarStatusTanque(){
    let query = `SELECT descricao from alerta
    limit 1;`

     return database.executar(query)
}
function buscarAlertas7Dias() {

    let query = `
       SELECT DATE(s.dataInstalacao) AS dataInstalacao, COUNT(a.idAlerta) AS totalAlertas
FROM alerta a
JOIN registroTemperatura r 
    ON a.fkRegistroTemperatura = r.idRegistro
JOIN sensor s
    ON r.fkSensor = s.idSensor
WHERE s.dataInstalacao <= CURDATE()
GROUP BY DATE(s.dataInstalacao);
    `;

    return database.executar(query);
}


function buscarUltimoAlerta(){
    let query = `
        SELECT *
        FROM alerta
        ORDER BY idAlerta DESC
        LIMIT 1;
    `
    return database.executar(query)
}

function buscarModeloSensor(){
    let query = `
        SELECT Modelo
        FROM sensor
        LIMIT 1;
    `
    return database.executar(query)
}

function buscarInstalacao(){
    let query = `
        SELECT DataInstalacao
        FROM sensor
        LIMIT 1 ;
    `
    return database.executar(query)
}

function buscarCapacidade(){
    let query = `
        SELECT CapacidadeLitros
        FROM tanque
        WHERE NomeTanque = 'tanque 1'
        LIMIT 1;
    `
    return database.executar(query)
}



module.exports = {
    buscarRegistroTanque,
    buscarTemperaturaAtual,
    buscarStatusSensor,
    buscarStatusTanque,
    buscarAlertas7Dias,
    buscarUltimoAlerta,
    buscarModeloSensor,
    buscarInstalacao,
    buscarCapacidade
};