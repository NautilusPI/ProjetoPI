CREATE DATABASE Nautilus;
USE Nautilus;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
NomeCompleto VARCHAR(80) NOT NULL,
Senha VARCHAR(15) NOT NULL,
email VARCHAR(80) NOT NULL,
telefone CHAR(12) NOT NULL,
cargo VARCHAR(15) NOT NULL,
CONSTRAINT chkEmail CHECK(email LIKE '%@%'),
CONSTRAINT chkCargo CHECK(cargo IN('gerente','produtor','dono'))
);

CREATE TABLE tanque (
idTanque INT PRIMARY KEY AUTO_INCREMENT,
nomeTanque VARCHAR(50),
capacidadeLitros INT,
localizacao VARCHAR(80),
fkUsuario INT,
CONSTRAINT fkUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
modelo VARCHAR(40),
dataInstalacao DATE,
statusSensor VARCHAR(20),
fkTanque INT,
CONSTRAINT fkTanque FOREIGN KEY (fkTanque) REFERENCES tanque(idTanque)
);

CREATE TABLE registroTemperatura (
	idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    RegistroTemperatura DECIMAL(4,2),
    dataHora DATETIME,
    fkSensor INT,
    CONSTRAINT fkSensor FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
	);

INSERT INTO cadastro(NomeCompleto, senha, email, telefone,cargo) VALUES
('Claudio Frizzarini', 'senha@123', 'claudio@sptech.school','11920783532', 'dono'),
('Fernando Brandão', 'senha@123', 'fernando@sptech.school','1198564781','produtor'),
('Marcos Mion', 'senha@123', 'marcos@globo.com','1140028922', 'gerente');


INSERT INTO tanque (nomeTanque, capacidadeLitros, localizacao) VALUES
('Tanque A', 5000, 'Setor Norte'),
('Tanque B', 7000, 'Setor Sul'),
('Tanque C', 6000, 'Setor Leste');

INSERT INTO sensor (modelo, dataInstalacao, statusSensor) VALUES
('Lm35', '2025-03-01', 'ativo'),
('Lm35', '2025-03-05', 'ativo'),
('Lm35', '2025-03-08', 'manutencao');

SELECT *FROM cadastro;
SELECT *FROM custosOperacionais;
SELECT *FROM tanque;
SELECT *FROM sensor;

--







