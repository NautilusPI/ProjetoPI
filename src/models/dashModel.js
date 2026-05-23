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
    let query = `SELECT descricao from alerta;`

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

function buscarMedidasEmTempoReal() {

    var query = `
   SELECT t.nomeTanque, r.registroTemperatura, a.descricao
FROM tanque t
JOIN sensor s ON s.fkTanque = t.idTanque
JOIN registroTemperatura r ON r.fkSensor = s.idSensor
LEFT JOIN alerta a
    ON a.fkRegistroTemperatura = r.idRegistro
WHERE r.idRegistro = (
    SELECT MAX(r2.idRegistro)
    FROM registroTemperatura r2
    JOIN sensor s2 ON s2.idSensor = r2.fkSensor
    WHERE s2.fkTanque = t.idTanque
)
ORDER BY 
    CASE
        WHEN a.descricao = 'Risco' THEN 1
        WHEN a.descricao = 'Atenção' THEN 2
        WHEN a.descricao = 'Estável' THEN 3
    END,
    r.registroTemperatura DESC;`

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

function buscarTotalAlertasDia(){
    let query = `
        SELECT DATE_FORMAT(r.DataHora, '%d/%m') AS date, COUNT(a.idAlerta) as totalAlertas FROM Alerta a
        JOIN RegistroTemperatura r
        ON r.idRegistro = a.fkRegistroTemperatura
        GROUP BY DATE_FORMAT(r.DataHora, '%d/%m')
        ORDER BY DATE_FORMAT(r.DataHora, '%d/%m') DESC
        LIMIT 10;
    `
    
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
    buscarTotalAlertasDia
};