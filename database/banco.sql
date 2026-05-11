CREATE DATABASE IF NOT EXISTS ordem_fornecimento_db;

USE ordem_fornecimento_db;

CREATE TABLE unidade (
    id_unidade INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sigla VARCHAR(20),
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    id_unidade INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    perfil ENUM('ADMIN', 'SOLICITANTE', 'APROVADOR') NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (id_unidade) REFERENCES unidade(id_unidade)
);

CREATE TABLE fornecedor (
    id_fornecedor INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    cnpj VARCHAR(14) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(100),
    endereco VARCHAR(200),

    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE categoria_produto (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE produto (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(200),
    unidade_medida VARCHAR(20) NOT NULL,
    preco_referencia DECIMAL(10,2) DEFAULT 0.00,
    ativo BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (id_categoria) REFERENCES categoria_produto(id_categoria)
);

CREATE TABLE ordem_fornecimento (
    id_ordem INT AUTO_INCREMENT PRIMARY KEY,
    numero_ordem VARCHAR(30) NOT NULL UNIQUE,
    id_fornecedor INT NOT NULL,
    id_unidade INT NOT NULL,
    id_usuario_solicitante INT NOT NULL,
    id_usuario_aprovador INT,
    data_emissao DATE NOT NULL,
    data_entrega_prevista DATE,

    status ENUM(
        'PENDENTE',
        'APROVADA',
        'ENVIADA',
        'RECEBIDA',
        'CANCELADA'
    ) DEFAULT 'PENDENTE',

    observacao VARCHAR(255),
    FOREIGN KEY (id_fornecedor) REFERENCES fornecedor(id_fornecedor),
    FOREIGN KEY (id_unidade) REFERENCES unidade(id_unidade),
    FOREIGN KEY (id_usuario_solicitante) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_usuario_aprovador) REFERENCES usuario(id_usuario)
);

CREATE TABLE ordem_item (
    id_item INT AUTO_INCREMENT PRIMARY KEY,
    id_ordem INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade DECIMAL(10,2) NOT NULL,
    valor_unitario DECIMAL(10,2) NOT NULL,
    quantidade_recebida DECIMAL(10,2) DEFAULT 0.00,

    FOREIGN KEY (id_ordem) REFERENCES ordem_fornecimento(id_ordem),
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto)
);
