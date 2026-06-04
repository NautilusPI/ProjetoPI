var database = require("../database/config");

function cadastrarTanque(tanque, setor, capacidade, idUsuario) {
  let instrucaoSql = `
        insert into Tanque (NomeTanque, Setor, CapacidadeLitros, fkEmpresa)
        values ('${tanque}','${setor}', '${capacidade}',
        (select fkEmpresa from usuario where idUsuario = '${idUsuario}')
        );
        `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarDados(idUsuario) {

    let instrucaoSqlTanques = `
    SELECT
        t.idTanque,
        t.NomeTanque,
        t.Setor,
        t.CapacidadeLitros,
        e.CNPJ,
        e.Endereco
    FROM Tanque t
    JOIN Empresa e
        ON t.fkEmpresa = e.idEmpresa
    WHERE t.fkEmpresa = (
        SELECT fkEmpresa
        FROM Usuario
        WHERE idUsuario = ${idUsuario}
    );
`;

    let instrucaoSqlSensores = `
        SELECT
            idSensor,
            fkTanque
        FROM Sensor;
    `;

    return Promise.all([
        database.executar(instrucaoSqlTanques),
        database.executar(instrucaoSqlSensores)
    ]);
}

module.exports = {
  cadastrarTanque,
  listarDados,
};
