create database Nautilus;
use Nautilus;

CREATE TABLE Empresa (
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
	Nome VARCHAR(45),
	Endereco VARCHAR(80),
	CodigoDeAtivacao CHAR(8),
	CNPJ CHAR(14)
);

CREATE TABLE Usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	Nome VARCHAR(45) NOT NULL,
	Email VARCHAR(80) NOT NULL,
	Senha VARCHAR(15) NOT NULL,
	Telefone CHAR(11),
    CPF CHAR(11) NOT NULL,
	fkEmpresa INT,
	CONSTRAINT fkEmpresa_const FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Tanque (
	idTanque INT PRIMARY KEY AUTO_INCREMENT,
	NomeTanque VARCHAR(45),
	CapacidadeLitros INT,
	Setor VARCHAR(45),
	fkEmpresa INT,
	CONSTRAINT fkEmpresa_const_tanque FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Sensor (
	idSensor INT PRIMARY KEY AUTO_INCREMENT,
	Modelo VARCHAR(40),
	DataInstalacao DATE,
	StatusSensor VARCHAR(20), 
	CONSTRAINT chkStatus CHECK (StatusSensor IN('Crítico','Atenção','Estável')),
	fkTanque INT,
	CONSTRAINT fkTanque_const FOREIGN KEY (fkTanque) REFERENCES Tanque(idTanque)
);

CREATE TABLE RegistroTemperatura (
	idRegistro INT AUTO_INCREMENT,
    RegistroTemperatura DECIMAL(4,2),
    DataHora DATETIME,
    fkSensor INT,
    CONSTRAINT fkSensor_const FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor),
    PRIMARY KEY (idRegistro, fkSensor) 
	);
    
    CREATE TABLE Alerta(
    idAlerta INT AUTO_INCREMENT,
    Descricao VARCHAR(200),
    fkRegistroTemperatura INT,
    fkAlertaSensor INT,
	CONSTRAINT fkRegistroTemperatura FOREIGN KEY (fkRegistroTemperatura) REFERENCES RegistroTemperatura(idRegistro),
	CONSTRAINT fkAlertaSensor FOREIGN KEY (fkAlertaSensor) REFERENCES RegistroTemperatura(fkSensor),
	PRIMARY KEY (idAlerta, fkRegistroTemperatura)
    );