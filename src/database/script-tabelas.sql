    CREATE DATABASE nautilus;
    USE nautilus;

    -- Tabela Usuario
    CREATE TABLE usuario (
        idUsuario INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) not null,
        email VARCHAR(80) not null,
        senha VARCHAR(15) not null,
        telefone CHAR(11)
    );

    -- Tabela Empresa
    CREATE TABLE empresa (
        idEmpresa INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) not null,
        endereco VARCHAR(80),
        codigoDeAtivacao VARCHAR(45) not null,
        cnpj CHAR(14) not null,
        fkUsuarioDono INT ,
        FOREIGN KEY (fkUsuarioDono) REFERENCES usuario(idUsuario)
    );

    -- Tabela Tanque
    CREATE TABLE tanque (
        idTanque INT AUTO_INCREMENT PRIMARY KEY,
        nomeTanque VARCHAR(45),
        capacidadeLitros INT,
        fkEmpresa INT,
        FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
        
    );

    -- Tabela Sensor
    CREATE TABLE sensor (
        idSensor INT AUTO_INCREMENT PRIMARY KEY,
        modelo VARCHAR(100),
        dataInstalacao DATE,
        statusSensor VARCHAR(20),
        fkTanque INT,
        FOREIGN KEY (fkTanque) REFERENCES tanque(idTanque)
        
    );

    -- Tabela RegistroTemperatura
    CREATE TABLE registroTemperatura (
        idRegistroTemperatura INT AUTO_INCREMENT,
        registroTemperatura DECIMAL(5,2),
        dataHora DATETIME,
        fkSensor INT,
        FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor),
        primary key(idRegistroTemperatura,fkSensor)
        
    );

    -- Tabela Alerta
    CREATE TABLE alerta (
        idAlerta INT AUTO_INCREMENT ,
        descricao VARCHAR(200),
        fkRegistroTemperatura INT,
        fkSensor INT,
        FOREIGN KEY (fkRegistroTemperatura) REFERENCES registroTemperatura(idRegistroTemperatura),
        primary key(idAlerta,fkSensor)
    );

    CREATE USER'grupo11API'@'%' IDENTIFIED BY 'Grupo11@';
    GRANT INSERT, SELECT, DELETE,UPDATE ON *.* TO 'grupo11API'@'%';
    FLUSH PRIVILEGES;