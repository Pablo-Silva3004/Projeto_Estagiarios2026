CREATE DATABASE EstagioOF;
USE EstagioOF;

CREATE TABLE usuario(
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(200) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
funcao ENUM ('ADMIN', 'RT', 'GERENTE') NOT NULL
);

CREATE TABLE usuarioRT(
idUsuarioRT INT PRIMARY KEY,
CONSTRAINT fkUsuarioRT
FOREIGN KEY (idUsuarioRT)
REFERENCES usuario(idUsuario));

CREATE TABLE usuarioGerente(
idUsuarioGerente INT PRIMARY KEY,
CONSTRAINT fkUsuarioGerente
FOREIGN KEY (idUsuarioGerente)
REFERENCES usuario(idUsuario));

CREATE TABLE colaborador(
idColaborador INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(200) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
fkRT INT NOT NULL,
fkGerente INT NOT NULL,
CONSTRAINT fkUsuario_RT
FOREIGN KEY (fkRT)
REFERENCES usuarioRT(idUsuarioRT),
CONSTRAINT fkUsuario_Gerente
FOREIGN KEY (fkGerente)
REFERENCES usuarioGerente(idUsuarioGerente));

CREATE TABLE ordemFabricacao(
idOrdem INT PRIMARY KEY AUTO_INCREMENT,
descricao VARCHAR(500) NOT NULL,
status ENUM('PENDENTE_CADASTRAMENTO', 'INICIADA', 'VALIDADA') NOT NULL DEFAULT 'PENDENTE_CADASTRAMENTO',
criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
fkColaborador INT NOT NULL,
CONSTRAINT fkOrdem_Colaborador
FOREIGN KEY (fkColaborador)
REFERENCES colaborador(idColaborador));

-- ADMIN
INSERT INTO usuario (nome, email, funcao)
VALUES ('Admin Master', 'admin@email.com', 'ADMIN');

-- RTs
INSERT INTO usuario (nome, email, funcao)
VALUES ('RT João', 'rt1@email.com', 'RT');

INSERT INTO usuario (nome, email, funcao)
VALUES ('RT Maria', 'rt2@email.com', 'RT');

-- GERENTES
INSERT INTO usuario (nome, email, funcao)
VALUES ('Gerente Carlos', 'ger1@email.com', 'GERENTE');

INSERT INTO usuario (nome, email, funcao)
VALUES ('Gerente Ana', 'ger2@email.com', 'GERENTE');

-- RTs (pegando IDs automaticamente)
INSERT INTO usuarioRT (idUsuarioRT)
SELECT idUsuario FROM usuario WHERE funcao = 'RT';

-- Gerentes
INSERT INTO usuarioGerente (idUsuarioGerente)
SELECT idUsuario FROM usuario WHERE funcao = 'GERENTE';

INSERT INTO colaborador (nome, email, fkRT, fkGerente)
VALUES (
   'Colaborador 1',
   'colab1@email.com',
   (SELECT idUsuarioRT FROM usuarioRT LIMIT 1),
   (SELECT idUsuarioGerente FROM usuarioGerente LIMIT 1)
);

INSERT INTO ordemFabricacao (fkColaborador, descricao)
VALUES (
   (SELECT idColaborador FROM colaborador LIMIT 1),
   'Primeira OF criada'
);

SELECT * FROM usuario;
SELECT * FROM usuarioRT;
SELECT * FROM usuarioGerente;
SELECT * FROM colaborador;
SELECT * FROM ordemFabricacao;