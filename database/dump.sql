-- --------------------------------------------------------
-- DUMP DO BANCO DE DADOS: King of Cars
-- --------------------------------------------------------

-- 1. Cria o banco de dados se ele não existir e já seleciona para uso
CREATE DATABASE IF NOT EXISTS king_of_cars CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE king_of_cars;

-- --------------------------------------------------------

-- 2. Criação da tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_usuario VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Inserindo o usuário administrador padrão
-- ATENÇÃO: A senha abaixo está como 'admin123'. 
-- Se você usa hash (password_hash), você deve gerar um novo hash e substituir aqui.
INSERT INTO usuarios (usuario, senha, nivel) VALUES
('admin', 'admin123', 'admin');

-- 4. Criação da estrutura da tabela `veiculos`
CREATE TABLE IF NOT EXISTS veiculos (
  id INT(11) NOT NULL AUTO_INCREMENT,
  modelo VARCHAR(255) NOT NULL,
  marca VARCHAR(100) NOT NULL,
  ano INT(4) NOT NULL,
  categoria VARCHAR(50) NOT NULL,
  preco DECIMAL(12,2) NOT NULL,
  imagem_url LONGTEXT NOT NULL, -- Configurado como LONGTEXT para suportar o Base64
  quilometragem VARCHAR(100) DEFAULT NULL,
  motor VARCHAR(100) DEFAULT NULL,
  placa_final VARCHAR(10) DEFAULT NULL,
  revisao VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- 5. Inserindo dados de exemplo (População do banco)
-- Nota: O campo imagem_url está vazio aqui para o arquivo não ficar gigante com o Base64,
-- mas ao cadastrar pelo sistema, o Base64 será inserido normalmente.

INSERT INTO veiculos (modelo, marca, ano, categoria, preco, imagem_url, quilometragem, motor, placa_final, revisao) VALUES
('CBX 250 Twister', 'Honda', 2005, 'MOTO', 8250.00, '', '45.000 km', '249cc', '4', 'Em dia'),
('M4 CS', 'BMW', 2014, 'CARRO', 300000.00, '', '32.000 km', '3.0 TwinPower Turbo', '9', 'Revisado na concessionária'),
('CB 500F', 'Honda', 2026, 'MOTO', 42000.00, '', '0 km', '471cc', '0', 'Garantia de Fábrica');