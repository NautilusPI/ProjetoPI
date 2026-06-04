var database = require("../database/config");


function buscarRegistroTanque(tanqueID, dataInicio, dataFim){
    let where =''
    console.log(dataFim)
    if(dataInicio == 'aovivo' || dataFim == 'aovivo' ){
        where = 'order by DataHora desc limit 15'
    }else{
        where =`and dataHora between '${dataInicio}' and '${dataFim}'`
    }
   
    let query = `
        select registroTemperatura, dataHora 
        from registroTemperatura 
        join sensor on fkSensor = idSensor 
        join tanque on fkTanque = idTanque 
        where idTanque = ${tanqueID}
        ${where};
    `;

    return database.executar(query);
}

function buscarTemperaturaAtual(){
    let query = `
        SELECT registroTemperatura
        FROM registroTemperatura
        ORDER BY dataHora DESC;
    `
    return database.executar(query)
}

function buscarStatusSensor(){
    let query = `
        SELECT StatusSensor
        FROM sensor;
    `
    return database.executar(query)
}

function buscarStatusTanque(){
    let query = `SELECT descricao FROM vw_statusTanque`

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
         SELECT r.RegistroTemperatura, r.dataHora
FROM RegistroTemperatura r
WHERE r.RegistroTemperatura > 30
   OR r.RegistroTemperatura < 26
ORDER BY r.idRegistro DESC;`
    return database.executar(query)
}

function buscarModeloSensor(){
    let query = `
        SELECT Modelo
        FROM sensor;
    `
    return database.executar(query)
}

function buscarInstalacao(){
    let query = `
        SELECT DataInstalacao
        FROM sensor;
    `
    return database.executar(query)
}

function buscarCapacidade(){
    let query = `
        SELECT CapacidadeLitros
        FROM tanque
        WHERE NomeTanque = 'tanque 1';
    `
    return database.executar(query)
}

function buscarMedidasEmTempoReal(idEmpresa){
    var query = `
    SELECT * FROM vw_medidasEmTempoReal WHERE idEmpresa = ${idEmpresa};
    `

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

function buscarTotalAlertasDia(idEmpresa){
    let query = `
        SELECT idEmpresa, DATE_FORMAT(dataDia, '%d/%m') AS 'date', totalAlertas 
        FROM (
            SELECT t.fkEmpresa as idEmpresa,
				   DATE(r.DataHora) AS dataDia, -- pega apenas a data, sem a hora
				   COUNT(a.idAlerta) AS totalAlertas -- conta o número de alertas para cada data
            FROM Alerta a 
            JOIN RegistroTemperatura r
            ON r.idRegistro = a.fkRegistroTemperatura
            JOIN Sensor s
            ON s.idSensor = r.fkSensor
            JOIN Tanque t
            ON t.idTanque = s.fkTanque
            GROUP BY idEmpresa, DATE(r.DataHora) -- agrupa os resultados por data
            ORDER BY dataDia ASC -- ordena por data em ordem decrescente
            LIMIT 10
        ) AS dados
        WHERE idEmpresa = ${idEmpresa};
    `
    
    return database.executar(query);
}

function buscarTotalTanques(idEmpresa){
    let query = `
        SELECT t.fkEmpresa, COUNT(*) AS totalTanques
        FROM tanque t
        WHERE t.fkEmpresa = ${idEmpresa}
        GROUP BY t.fkEmpresa;
    `

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

function buscarSensoresOffline(idEmpresa){

    let query = `
        SELECT DISTINCT t.idTanque
        FROM tanque t
        JOIN sensor s
            ON s.fkTanque = t.idTanque
        LEFT JOIN registroTemperatura r
            ON r.fkSensor = s.idSensor
        WHERE r.RegistroTemperatura IS NULL
        AND t.fkEmpresa = ${idEmpresa};
    `;

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

function buscarTanquesRisco(idEmpresa){
    let query = `
        SELECT COUNT(DISTINCT t.idTanque) AS tanquesRisco
        FROM tanque t
        JOIN sensor s
            ON s.fkTanque = t.idTanque
        JOIN registroTemperatura r
            ON r.fkSensor = s.idSensor
        WHERE (r.RegistroTemperatura < 26
        OR r.RegistroTemperatura > 30) AND t.fkEmpresa = ${idEmpresa};
    `

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

function buscarStatusViveiro(idEmpresa){

    let query = `
        SELECT COUNT(*) AS totalCritico FROM vw_medidasEmTempoReal WHERE idEmpresa = ${idEmpresa} AND descricao COLLATE utf8mb4_unicode_ci = 'Crítico';
    `;

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

function buscarDadosGraficoBarra(idEmpresa){

    let query = `
        SELECT
            t.fkEmpresa, 
            t.NomeTanque,
            r.RegistroTemperatura
        FROM tanque t
        JOIN sensor s
            ON s.fkTanque = t.idTanque
        JOIN registroTemperatura r
            ON r.fkSensor = s.idSensor
        WHERE r.idRegistro = (
            SELECT MAX(r2.idRegistro)
            FROM registroTemperatura r2
            WHERE r2.fkSensor = s.idSensor
        ) AND t.fkEmpresa = ${idEmpresa}
        ORDER BY t.idTanque;
    `;

    return database.executar(query);
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
    buscarCapacidade,
    buscarMedidasEmTempoReal,
    buscarTotalAlertasDia,
    buscarTotalTanques,
    buscarSensoresOffline,
    buscarTanquesRisco,
    buscarStatusViveiro,
    buscarDadosGraficoBarra
};