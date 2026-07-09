<?php
require 'conexao.php';

// Pega o ID que vai vir pela URL
$id = isset($_GET['id']) ? $_GET['id'] : 0;

try {
    // Busca apenas o veículo que tem esse ID
    $sql = "SELECT * FROM veiculos WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    
    $veiculo = $stmt->fetch();
    
    if ($veiculo) {
        echo json_encode(["sucesso" => true, "dados" => $veiculo]);
    } else {
        echo json_encode(["sucesso" => false, "mensagem" => "Veículo não encontrado."]);
    }
} catch(PDOException $e) {
    echo json_encode(["sucesso" => false, "mensagem" => "Erro: " . $e->getMessage()]);
}
?>