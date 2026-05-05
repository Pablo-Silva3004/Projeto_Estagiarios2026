drop database if exists estagioof;
create database estagioof;
 
use estagioof;
 
CREATE TABLE perfis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    descricao VARCHAR(255),
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
 
);
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    cargo VARCHAR(100),
    perfil_id INT NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    ultimo_login DATETIME NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 
    CONSTRAINT fk_usuario_perfil
        FOREIGN KEY (perfil_id) REFERENCES perfis(id)
 
);
CREATE TABLE colaboradores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    rt_id INT NOT NULL,
    gerente_id INT NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    criado_por INT NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 
    CONSTRAINT fk_colaborador_rt
        FOREIGN KEY (rt_id) REFERENCES usuarios(id),
    CONSTRAINT fk_colaborador_gerente
        FOREIGN KEY (gerente_id) REFERENCES usuarios(id),
 
    CONSTRAINT fk_colaborador_criado_por
        FOREIGN KEY (criado_por) REFERENCES usuarios(id)
);
CREATE TABLE status_of (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(80) NOT NULL UNIQUE,
    descricao VARCHAR(255),
    ordem INT NOT NULL,
    finalizador BOOLEAN DEFAULT FALSE,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE ordens_fornecimento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    colaborador_id INT NOT NULL,
    numero_of VARCHAR(50) NULL,
    descricao TEXT NOT NULL,
    status_id INT NOT NULL DEFAULT 1,
    competencia_mes TINYINT NOT NULL,
    competencia_ano YEAR NOT NULL,
    criado_por INT NOT NULL,
    validado_por INT NULL,
    data_validacao DATETIME NULL,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_of_colaborador
        FOREIGN KEY (colaborador_id) REFERENCES colaboradores(id),
    CONSTRAINT fk_of_status
        FOREIGN KEY (status_id) REFERENCES status_of(id),
    CONSTRAINT fk_of_criado_por
        FOREIGN KEY (criado_por) REFERENCES usuarios(id),
    CONSTRAINT fk_of_validado_por
        FOREIGN KEY (validado_por) REFERENCES usuarios(id),
    CONSTRAINT chk_competencia_mes
        CHECK (competencia_mes BETWEEN 1 AND 12),
    CONSTRAINT uq_of_colaborador_competencia
        UNIQUE (colaborador_id, competencia_mes, competencia_ano)
 
);
CREATE TABLE historico_status_of (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ordem_fornecimento_id INT NOT NULL,
    status_anterior_id INT NULL,
    status_novo_id INT NOT NULL,
    alterado_por INT NOT NULL,
    observacao VARCHAR(255),
    alterado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_historico_of
        FOREIGN KEY (ordem_fornecimento_id) REFERENCES ordens_fornecimento(id),
    CONSTRAINT fk_historico_status_anterior
        FOREIGN KEY (status_anterior_id) REFERENCES status_of(id),
    CONSTRAINT fk_historico_status_novo
        FOREIGN KEY (status_novo_id) REFERENCES status_of(id),
    CONSTRAINT fk_historico_alterado_por
        FOREIGN KEY (alterado_por) REFERENCES usuarios(id)
);
 
SELECT * FROM perfis;