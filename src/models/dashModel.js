var database = require("../database/config");


function buscarRegistroTanque(tanque, dataInicio, dataFim){
    let where =''
    console.log(dataFim)
    if(dataInicio == 'aovivo' || dataFim == 'aovivo' ){
        where = 'order by r.DataHora desc limit 15'
    }else{
        where =`and r.DataHora between '${dataInicio}' and '${dataFim}'`
    }
   
    let query = `
        select r.RegistroTemperatura, r.DataHora 
        from registroTemperatura r
        join Sensor s on r.fkSensor = s.idSensor 
        join Tanque t on s.fkTanque = t.idTanque 
        where t.nomeTanque = '${tanque}'
        ${where};
    `;

    return database.executar(query);
}

function buscarTemperaturaAtual(tanque){
    let query = `
        SELECT r.registroTemperatura FROM registroTemperatura r
        JOIN Sensor s
        ON r.fkSensor = s.idSensor
        JOIN Tanque t
        ON s.fkTanque = t.idTanque
        WHERE nomeTanque = '${tanque}'
        ORDER BY dataHora DESC
        LIMIT 1;;
    `
    return database.executar(query)
}

function buscarNomeSetor(tanque){
    let query = `
        SELECT s.nome FROM setor s
        JOIN Tanque t
        ON s.idSetor = t.fkSetor
        WHERE nomeTanque = '${tanque}';
    `
    return database.executar(query)
}

function buscarStatusTanque(tanque){
    let query = `
        SELECT
            CASE
            WHEN r.registroTemperatura > 33 OR r.registroTemperatura < 23 THEN 'Crítico'
            WHEN r.registroTemperatura > 30 OR r.registroTemperatura < 26 THEN 'Atenção'
            ELSE 'Estável'
            END AS descricao
            FROM registroTemperatura r
            JOIN Sensor s
            ON s.idSensor = r.fkSensor
            JOIN Tanque t
            ON t.idTanque = s.fkTanque
            WHERE t.nomeTanque = '${tanque}'
            ORDER BY r.dataHora DESC
            LIMIT 1;
    `

     return database.executar(query)
}
function buscarAlertas7Dias(tanque) {

    let query = `
       SELECT DATE_FORMAT(dataDia, '%d/%m') AS 'date', totalAlertas 
        FROM (
            SELECT
				   DATE(r.DataHora) AS dataDia, -- pega apenas a data, sem a hora
				   COUNT(a.idAlerta) AS totalAlertas -- conta o número de alertas para cada data
            FROM Alerta a 
            JOIN RegistroTemperatura r
            ON r.idRegistro = a.fkRegistroTemperatura
            JOIN Sensor s
            ON s.idSensor = r.fkSensor
            JOIN Tanque t
            ON t.idTanque = s.fkTanque
            WHERE t.nomeTanque = '${tanque}'
            GROUP BY DATE(r.DataHora) -- agrupa os resultados por data
            ORDER BY dataDia ASC -- ordena por data em ordem decrescente
            LIMIT 10
        ) AS dados;
    `;

    return database.executar(query);
}


function buscarUltimoAlerta(tanque){
    let query = `
         SELECT a.idAlerta, r.RegistroTemperatura FROM Alerta a
         JOIN registroTemperatura r
         ON r.idRegistro = a.fkRegistroTemperatura
         JOIN Sensor s
         ON s.idSensor = fkAlertaSensor
         JOIN Tanque t
         ON t.idTanque = s.fkTanque
         WHERE nomeTanque = '${tanque}'
         ORDER BY a.idAlerta DESC
         LIMIT 1;`
    return database.executar(query)
}

function buscarModeloSensor(tanque){
    let query = `
        SELECT Modelo FROM sensor s
	JOIN Tanque t
    ON t.idTanque = s.fkTanque
    WHERE nomeTanque = '${tanque}';
    `
    return database.executar(query)
}

function buscarInstalacao(tanque){
    let query = `
        SELECT DataInstalacao
        FROM sensor s
        JOIN Tanque t
        ON t.idTanque = s.fkTanque
        WHERE nomeTanque = '${tanque}';
    `
    return database.executar(query)
}

function buscarCapacidade(tanque){
    let query = `
        SELECT CapacidadeLitros
        FROM tanque
        WHERE NomeTanque = '${tanque}';
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
    buscarNomeSetor,
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