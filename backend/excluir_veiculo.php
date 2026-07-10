<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require 'conexao.php';

$dados_recebidos = file_get_contents("php://input");
$requisicao = json_decode($dados_recebidos);

if ($requisicao && isset($requisicao->id)) {
    try {
        $sql = "DELETE FROM veiculos WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $requisicao->id);
        $stmt->execute();
        
        echo json_encode(["sucesso" => true, "mensagem" => "Veículo deletado."]);
    } catch(PDOException $e) {
        echo json_encode(["sucesso" => false, "mensagem" => "Erro MySQL: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["sucesso" => false, "mensagem" => "ID inválido."]);
}
?>