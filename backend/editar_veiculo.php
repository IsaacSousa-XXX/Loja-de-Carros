<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require 'conexao.php';

$dados_recebidos = file_get_contents("php://input");
$veiculo = json_decode($dados_recebidos);

if ($veiculo && !empty($veiculo->id) && !empty($veiculo->modelo) && !empty($veiculo->marca)) {
    try {
        $sql = "UPDATE veiculos SET 
                modelo = :modelo, 
                marca = :marca, 
                ano = :ano, 
                categoria = :categoria, 
                preco = :preco, 
                imagem_url = :imagem_url, 
                quilometragem = :quilometragem, 
                motor = :motor, 
                placa_final = :placa_final, 
                revisao = :revisao 
                WHERE id = :id";
        
        $stmt = $pdo->prepare($sql);
        
        $stmt->bindParam(':id', $veiculo->id);
        $stmt->bindParam(':modelo', $veiculo->modelo);
        $stmt->bindParam(':marca', $veiculo->marca);
        $stmt->bindParam(':ano', $veiculo->ano);
        $stmt->bindParam(':categoria', $veiculo->categoria);
        $stmt->bindParam(':preco', $veiculo->preco);
        $stmt->bindParam(':imagem_url', $veiculo->imagem_url);
        
        $km = isset($veiculo->quilometragem) ? $veiculo->quilometragem : '0';
        $motor = isset($veiculo->motor) ? $veiculo->motor : 'Não informado';
        $placa = isset($veiculo->placa_final) ? $veiculo->placa_final : '-';
        $rev = isset($veiculo->revisao) ? $veiculo->revisao : 'Em dia';

        $stmt->bindParam(':quilometragem', $km);
        $stmt->bindParam(':motor', $motor);
        $stmt->bindParam(':placa_final', $placa);
        $stmt->bindParam(':revisao', $rev);
        
        $stmt->execute();
        
        echo json_encode(["sucesso" => true, "mensagem" => "Veículo atualizado com sucesso!"]);
    } catch(PDOException $e) {
        echo json_encode(["sucesso" => false, "mensagem" => "Erro MySQL: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["sucesso" => false, "mensagem" => "Dados incompletos para atualização."]);
}
?>