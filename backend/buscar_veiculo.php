<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require 'conexao.php';

if (isset($_GET['id'])) {
    try {
        $sql = "SELECT * FROM veiculos WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $_GET['id']);
        $stmt->execute();
        
        $veiculo = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($veiculo) {
            echo json_encode(["sucesso" => true, "dados" => $veiculo]);
        } else {
            echo json_encode(["sucesso" => false, "mensagem" => "Veículo não encontrado."]);
        }
    } catch(PDOException $e) {
        echo json_encode(["sucesso" => false, "mensagem" => $e->getMessage()]);
    }
} else {
    echo json_encode(["sucesso" => false, "mensagem" => "ID não fornecido."]);
}
?>