DROP DATABASE IF EXISTS estagioof;
CREATE DATABASE IF NOT EXISTS estagioof;
USE estagioof;

-- ============================================================
-- TABELAS
-- ============================================================

CREATE TABLE unidade (
    id_unidade INT AUTO_INCREMENT PRIMARY KEY,
    nome       VARCHAR(100) NOT NULL,
    sigla      VARCHAR(20),
    ativo      BOOLEAN DEFAULT TRUE
);

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome       VARCHAR(100) NOT NULL,
    email      VARCHAR(100) NOT NULL UNIQUE,
    senha      VARCHAR(255) NOT NULL,
    perfil     ENUM('ADMIN', 'SOLICITANTE', 'APROVADOR') NOT NULL,
    ativo      BOOLEAN DEFAULT TRUE
);

CREATE TABLE fornecedor (
    id_fornecedor INT AUTO_INCREMENT PRIMARY KEY,
    nome          VARCHAR(150) NOT NULL,
    cnpj          VARCHAR(14)  NOT NULL UNIQUE,
    telefone      VARCHAR(20),
    email         VARCHAR(100),
    endereco      VARCHAR(200),
    ativo         BOOLEAN DEFAULT TRUE
);

CREATE TABLE categoria_produto (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nome         VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE produto (
    id_produto       INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria     INT            NOT NULL,
    nome             VARCHAR(100)   NOT NULL,
    descricao        VARCHAR(200),
    unidade_medida   VARCHAR(20)    NOT NULL,
    preco_referencia DECIMAL(10,2)  DEFAULT 0.00,
    ativo            BOOLEAN        DEFAULT TRUE,

    FOREIGN KEY (id_categoria) 
        REFERENCES categoria_produto(id_categoria)
        ON DELETE CASCADE
);

CREATE TABLE ordem_fornecimento (
    id_ordem                INT AUTO_INCREMENT PRIMARY KEY,
    numero_ordem            VARCHAR(30) NOT NULL UNIQUE,
    id_fornecedor           INT         NOT NULL,
    id_unidade              INT         NOT NULL,
    id_usuario_solicitante  INT         NOT NULL,
    id_usuario_aprovador    INT,
    data_emissao            DATE        NOT NULL,
    data_entrega_prevista   DATE,
    status ENUM('PENDENTE','APROVADA','ENVIADA','RECEBIDA','CANCELADA') DEFAULT 'PENDENTE',
    observacao              VARCHAR(255),

    FOREIGN KEY (id_fornecedor) 
        REFERENCES fornecedor(id_fornecedor)
        ON DELETE CASCADE,

    FOREIGN KEY (id_unidade) 
        REFERENCES unidade(id_unidade)
        ON DELETE CASCADE,

    FOREIGN KEY (id_usuario_solicitante) 
        REFERENCES usuario(id_usuario)
        ON DELETE CASCADE,

    FOREIGN KEY (id_usuario_aprovador) 
        REFERENCES usuario(id_usuario)
        ON DELETE SET NULL
);

CREATE TABLE ordem_item (
    id_item             INT AUTO_INCREMENT PRIMARY KEY,
    id_ordem            INT           NOT NULL,
    id_produto          INT           NOT NULL,
    quantidade          DECIMAL(10,2) NOT NULL,
    valor_unitario      DECIMAL(10,2) NOT NULL,
    quantidade_recebida DECIMAL(10,2) DEFAULT 0.00,

    FOREIGN KEY (id_ordem) 
        REFERENCES ordem_fornecimento(id_ordem)
        ON DELETE CASCADE,

    FOREIGN KEY (id_produto) 
        REFERENCES produto(id_produto)
        ON DELETE CASCADE
);

-- ============================================================
-- INSERTS
-- ============================================================

INSERT INTO unidade (nome, sigla) VALUES
  ('Tecnologia da Informação', 'TI'),
  ('Recursos Humanos',         'RH'),
  ('Financeiro',               'FIN'),
  ('Operações',                'OPS'),
  ('Marketing',                'MKT');

INSERT INTO usuario (nome, email, senha, perfil) VALUES
  ('Gustavo',  'gustavo@email.com',  '1234', 'ADMIN'),
  ('Cintia',   'cintia@email.com',   '1234', 'SOLICITANTE'),
  ('Vinicius', 'vinicius@email.com', '1234', 'APROVADOR'),
  ('Matheus',  'matheus@email.com',  '1234', 'SOLICITANTE'),
  ('Cauã',     'caua@email.com',     '1234', 'APROVADOR'),
  ('Mayara',   'mayara@email.com',   '1234', 'APROVADOR'),
  ('Pablo',    'pablo@email.com',    '1234', 'SOLICITANTE');

INSERT INTO fornecedor (nome, cnpj, telefone, email, endereco) VALUES
  ('Tech Supplies Ltda', '12345678000190', '(11) 3456-7890', 'contato@techsupplies.com',  'Av. Paulista, 1000 - São Paulo/SP'),
  ('Office Pro',         '98765432000110', '(11) 2345-6789', 'vendas@officepro.com.br',   'Rua Augusta, 500 - São Paulo/SP'),
  ('InfoNet',            '11222333000144', '(21) 9876-5432', 'comercial@infonet.com.br',  'Rua das Laranjeiras, 200 - Rio/RJ');

INSERT INTO categoria_produto (nome) VALUES
  ('Informática'),  
  ('Rede'),         
  ('Papelaria'),    
  ('Mobiliário'),   
  ('Limpeza'),      
  ('Outros');       

INSERT INTO produto (id_categoria, nome, descricao, unidade_medida, preco_referencia) VALUES
  (1, 'Notebook Dell Inspiron 15', 'Processador i5, 8GB RAM, SSD 256GB',   'un',    3500.00),
  (2, 'Switch 24 Portas Gigabit',  'Gerenciável, rack 1U',                  'un',    2200.00),
  (3, 'Papel A4 500 folhas',       '75g/m², pacote com 500 folhas',         'resma',   28.00),
  (4, 'Cadeira Executiva',         'Com apoio lombar e braços reguláveis',  'un',    1200.00),
  (5, 'Papel Higiênico Fardo 64',  'Folha dupla, 30m cada rolo',            'fardo',   68.00);

INSERT INTO ordem_fornecimento
  (numero_ordem, id_fornecedor, id_unidade, id_usuario_solicitante, id_usuario_aprovador,
   data_emissao, data_entrega_prevista, status, observacao)
VALUES
  ('OF-2025-001', 1, 1, 2, 3,    '2025-01-05', '2025-01-20', 'RECEBIDA',  NULL),
  ('OF-2025-005', 1, 1, 2, NULL, '2025-03-01', '2025-03-20', 'PENDENTE', 'Urgente — renovação de equipamentos.');

INSERT INTO ordem_item 
  (id_ordem, id_produto, quantidade, valor_unitario, quantidade_recebida) 
VALUES
  (1, 1, 2, 3500.00, 2),
  (1, 2, 2, 2200.00, 2),
  (2, 3, 2,   28.00, 0);

-- ============================================================
-- CONSULTAS DE TESTE
-- ============================================================

SELECT * FROM unidade;
SELECT * FROM usuario;
SELECT * FROM fornecedor;
SELECT * FROM categoria_produto;
SELECT * FROM produto;
SELECT * FROM ordem_fornecimento;
SELECT * FROM ordem_item;