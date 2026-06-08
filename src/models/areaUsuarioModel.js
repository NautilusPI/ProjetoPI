var database = require("../database/config");

function cadastrarTanque(tanque, setor, capacidade, idUsuario) {
  let instrucaoSql = `
        insert into Tanque (NomeTanque, fkSetor, CapacidadeLitros, fkEmpresaSetor)
        values ('${tanque}','${setor}', '${capacidade}',
        (select fkEmpresa from Usuario where idUsuario = '${idUsuario}')
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
            t.CapacidadeLitros,
            s.nome AS NomeSetor,
            s.logradouro,
            s.numero,
            s.cep,
            e.CNPJ
        FROM Tanque t
        INNER JOIN Setor s
            ON t.fkSetor = s.idSetor
        INNER JOIN Empresa e
            ON s.fkEmpresa = e.idEmpresa
        WHERE t.fkEmpresaSetor = (
            SELECT fkEmpresa
            FROM Usuario
            WHERE idUsuario = ${idUsuario}
        )
        ORDER BY t.idTanque DESC;
    `;

    let instrucaoSqlSensores = `
        SELECT
            idSensor,
            fkTanque
        FROM Sensor;
    `;

    console.log(instrucaoSqlTanques);

    return Promise.all([
        database.executar(instrucaoSqlTanques),
        database.executar(instrucaoSqlSensores)
    ]);
}

module.exports = {
  cadastrarTanque,
  listarDados,
};
