CREATE DATABASE loja_veiculos;
USE loja_veiculos;

CREATE TABLE veiculos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo ENUM('Carro', 'Moto') NOT NULL,
  marca VARCHAR(50) NOT NULL,
  modelo VARCHAR(100) NOT NULL,
  ano INT NOT NULL,
  preco DECIMAL(10, 2) NOT NULL
);

-- Inserindo nossa moto de teste para ter o que listar depois
INSERT INTO veiculos (tipo, marca, modelo, ano, preco)
VALUES ('Moto', 'Honda', 'CBX 250 Twister', 2008, 8500.00);