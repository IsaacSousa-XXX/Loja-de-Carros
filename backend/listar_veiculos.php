<?php
require 'conexao.php';

try {
    // Busca todos os veículos, ordenando do mais recente para o mais antigo
    $sql = "SELECT * FROM veiculos ORDER BY id DESC";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    
    // Puxa todos os resultados em formato de array
    $veiculos = $stmt->fetchAll();
    
    // Devolve para o Angular
    echo json_encode(["sucesso" => true, "dados" => $veiculos]);
    
} catch(PDOException $e) {
    echo json_encode(["sucesso" => false, "mensagem" => "Erro ao buscar estoque: " . $e->getMessage()]);
}
?>