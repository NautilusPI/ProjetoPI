CREATE DATABASE Nautilus;
USE Nautilus;

-- EMPRESA

CREATE TABLE Empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    codigoDeAtivacao VARCHAR(45) NOT NULL UNIQUE,
    cnpj CHAR(14) NOT NULL UNIQUE
);

-- USUARIO

CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(80) NOT NULL UNIQUE,
    senha VARCHAR(45) NOT NULL,
    CPF CHAR(11) NOT NULL UNIQUE,
    fkEmpresa INT NOT NULL,

    CONSTRAINT fkUsuarioEmpresa
        FOREIGN KEY (fkEmpresa)
        REFERENCES Empresa(idEmpresa)
);

-- SETOR

CREATE TABLE Setor (
    idSetor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    logradouro VARCHAR(45) NOT NULL,
    numero INT NOT NULL,
    cep CHAR(8) NOT NULL,
    fkEmpresa INT NOT NULL,

    CONSTRAINT fkSetorEmpresa
        FOREIGN KEY (fkEmpresa)
        REFERENCES Empresa(idEmpresa)
);

-- TANQUE

CREATE TABLE Tanque (
    idTanque INT PRIMARY KEY AUTO_INCREMENT,
    NomeTanque VARCHAR(45) NOT NULL,
    CapacidadeLitros INT NOT NULL,
    fkSetor INT NOT NULL,
    fkEmpresaSetor INT NOT NULL,

    CONSTRAINT fkTanqueSetor
        FOREIGN KEY (fkSetor)
        REFERENCES Setor(idSetor),

    CONSTRAINT fkTanqueEmpresa
        FOREIGN KEY (fkEmpresaSetor)
        REFERENCES Empresa(idEmpresa)
);

-- SENSOR

CREATE TABLE Sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    Modelo VARCHAR(40) NOT NULL,
    DataInstalacao DATE NOT NULL,
    StatusSensor VARCHAR(45) NOT NULL,
    fkTanque INT NOT NULL,

    CONSTRAINT fkSensorTanque
        FOREIGN KEY (fkTanque)
        REFERENCES Tanque(idTanque)
);

-- REGISTRO TEMPERATURA

CREATE TABLE RegistroTemperatura (
    idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    RegistroTemperatura DECIMAL(5,2) NOT NULL,
    DataHora DATETIME NOT NULL,
    fkSensor INT NOT NULL,

    CONSTRAINT fkRegistroSensor
        FOREIGN KEY (fkSensor)
        REFERENCES Sensor(idSensor)
);

-- ALERTA

CREATE TABLE Alerta (
    idAlerta INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(200) NOT NULL,
    fkRegistroTemperatura INT NOT NULL,
    fkAlertaSensor INT NOT NULL,

    CONSTRAINT fkAlertaRegistro
        FOREIGN KEY (fkRegistroTemperatura)
        REFERENCES RegistroTemperatura(idRegistro),

    CONSTRAINT fkAlertaSensor
        FOREIGN KEY (fkAlertaSensor)
        REFERENCES Sensor(idSensor)
);

-- VIEW

CREATE VIEW vw_medidasEmTempoReal AS
SELECT
    t.fkEmpresaSetor AS idEmpresa,
    t.NomeTanque,
    r.RegistroTemperatura AS registroTemperatura,
CASE
    WHEN r.RegistroTemperatura > 33 OR r.RegistroTemperatura < 23
        THEN CONVERT('Crítico' USING utf8mb4)

    WHEN r.RegistroTemperatura > 30 OR r.RegistroTemperatura < 26
        THEN CONVERT('Atenção' USING utf8mb4)

    ELSE CONVERT('Estável' USING utf8mb4)
END AS descricao

FROM Tanque t
JOIN Sensor s
    ON s.fkTanque = t.idTanque
JOIN RegistroTemperatura r
    ON r.fkSensor = s.idSensor
WHERE r.idRegistro = (
    SELECT MAX(r2.idRegistro)
    FROM RegistroTemperatura r2
    WHERE r2.fkSensor = s.idSensor
);