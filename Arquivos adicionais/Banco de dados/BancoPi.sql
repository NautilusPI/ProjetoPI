/*
Cauã Alonso Martos - 01261032
Eduardo Santana Santos - 01261038
Kristian Fortunato Wirthl - 01261012
Lucas dos Santos Cordeiro - 01261011
Nicolas Augusto da Silva - 01261014
Thais Barbosa Carneiro - 01261037
Vinícius Sales Garban - 01261019
*/

CREATE DATABASE BANCOPI;

USE BANCOPI;

CREATE TABLE Usuario(
	idUser INT PRIMARY KEY AUTO_INCREMENT ,
	nomeCompleto VARCHAR(50) NOT NULL,
	email VARCHAR(50) UNIQUE NOT NULL,
	CONSTRAINT chkemail CHECK (email LIKE '%@%'),
	senha VARCHAR(12) NOT NULL,
	cargo VARCHAR(11) NOT NULL,
	CONSTRAINT chkcargo CHECK (cargo IN('Funcionário', 'Gestor', 'Propietário')), 
	telefone VARCHAR(14) UNIQUE NOT NULL,
	stats VARCHAR(7), 
	CONSTRAINT chkstats CHECK (stats IN('Ativo', 'Inativo'))
);

CREATE TABLE Registro(
	idRegistro INT PRIMARY KEY AUTO_INCREMENT,
	tempAtual DECIMAL(4,2) NOT NULL,
	dtHrOcorrencia DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL
);
        
CREATE TABLE Tanque(
	idTanque INT PRIMARY KEY AUTO_INCREMENT,
	capacidadeL INT NOT NULL,
	ciclo BOOLEAN NOT NULL,
    tempMax DECIMAL(4,2) NOT NULL,
    tempMin DECIMAL(4,2) NOT NULL
);
        
CREATE TABLE Gastos(
	idMes INT PRIMARY KEY AUTO_INCREMENT,
	mesAno VARCHAR(40) NOT NULL,
	agua DECIMAL(10,2) NOT NULL,
	luz DECIMAL(10,2) NOT NULL,
	salario DECIMAL(10,2) NOT NULL,
	kgTilapia DECIMAL(10,2) NOT NULL,
	racaoKg DECIMAL(10,2) NOT NULL,
	totaloutros DECIMAL(10,2) NOT NULL
);



INSERT INTO Usuario (nomeCompleto,email,senha,cargo,stats,telefone) VALUES
('Gustavo fernando da silva','gusta@gmail.com','84senhagus','Propietário','ativo','11 9242-2424'),
('Pedro Gonçales','pedro@gmail.com','123senha','Gestor','ativo','11 9735-2347'),
('vini gabam','vinicius@gmail.com','vinigugu','Funcionário','ativo','11 92464-2023'),
('Cleber da silva','cleber.dsilva@gmail.com','cleber!23','Gestor','Inativo','11 94293-4243'),
('Rodrigo de Souza','souza@gmail.com','r@odrigoSoz','Funcionário','ativo','11 98375-8590'),
('Felipe Eduardo','felipe.edu@gmail.com','FelpsQQ','Gestor','ativo','11 9200-0099'),
('Rodrigo Silva de Santos','rodrigo.santos@gmail.com','Rfk@123','Funcionário','ativo','11 98412-4323');

INSERT INTO Registro(tempAtual) VALUES 
(26.9),
(22.6);

INSERT INTO Tanque (capacidadeL,ciclo,tempMax,tempMin) VALUES
(5,1,28.9, 22.3),
(20,1,30.1, 24.1);

INSERT INTO Gastos (mesAno,agua,luz,salario,kgTilapia,racaoKg,totaloutros) VALUES
('Outubro 2025',9000.00,20000.00,10000,90000.00,98240.00,999402.00),
('Setembro 2025',9300.00,20300.00,10300,90300.00,98230.00,129402.00);

SELECT * FROM Usuario;
SELECT * FROM Registro;
SELECT * FROM Tanque;
SELECT * FROM Gastos;

-- seleciona usuarios pelo nome e cargo
SELECT CONCAT('Nome: ',nomeCompleto,',  Cargo: ',cargo) as 'Usuarios e função'FROM usuario ORDER BY cargo;
-- mostra o nivel de acesso do usuario
SELECT nomeCompleto AS Nome, CASE WHEN cargo ='Propietário' THEN 'Acesso total' ELSE 'Acesso restrito' END AS 'Nível de acesso no site' FROM Usuario ORDER BY cargo;
-- Mudando o status do Usúario
UPDATE Usuario SET stats = 'Inativo' WHERE	idUser =5;
SELECT nomeCompleto AS Nome, CASE WHEN stats ='Ativo' THEN 'Tem acesso' ELSE 'Não tem acesso' END AS 'Acesso dos usuarios' FROM Usuario ORDER BY cargo;
DELETE FROM Usuario WHERE idUser = '5';
SElECT concat('os gastos no mês de ', mesAno, ' foram de: R$', agua, ', R$', luz, ', R$ ', salario, ', R$', Kgtilapia, ' R$', racaoKg, ' e R$', totaloutros) as 'Despesas Gerais' from Gastos order by totaloutros desc;


-- 

