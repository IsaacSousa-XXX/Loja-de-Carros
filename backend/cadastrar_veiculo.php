<?php
// Puxa as configurações de conexão e CORS
require 'conexao.php';

// Recebe os dados em formato JSON vindos do Angular
$dados_recebidos = file_get_contents("php://input");
$veiculo = json_decode($dados_recebidos);

// Verifica se os dados chegaram corretamente
if ($veiculo && !empty($veiculo->modelo)) {
    try {
        // Prepara a query SQL de inserção COM AS NOVAS COLUNAS
        $sql = "INSERT INTO veiculos (modelo, marca, ano, categoria, preco, imagem_url, quilometragem, motor, placa_final, revisao) 
                VALUES (:modelo, :marca, :ano, :categoria, :preco, :imagem_url, :quilometragem, :motor, :placa_final, :revisao)";
        
        $stmt = $pdo->prepare($sql);
        
        // Substitui os valores antigos
        $stmt->bindParam(':modelo', $veiculo->modelo);
        $stmt->bindParam(':marca', $veiculo->marca);
        $stmt->bindParam(':ano', $veiculo->ano);
        $stmt->bindParam(':categoria', $veiculo->categoria);
        $stmt->bindParam(':preco', $veiculo->preco);
        $stmt->bindParam(':imagem_url', $veiculo->imagem_url);
        
        // Substitui os valores NOVOS
        // Usamos null coalescing (??) para caso o campo venha vazio do Angular
        $km = $veiculo->quilometragem ?? '0';
        $motor = $veiculo->motor ?? 'Não informado';
        $placa = $veiculo->placa_final ?? '-';
        $rev = $veiculo->revisao ?? 'Em dia';

        $stmt->bindParam(':quilometragem', $km);
        $stmt->bindParam(':motor', $motor);
        $stmt->bindParam(':placa_final', $placa);
        $stmt->bindParam(':revisao', $rev);
        
        // Executa no banco
        $stmt->execute();
    } catch(PDOException $e) {
        // Responde se der algum erro no banco
        echo json_encode(["sucesso" => false, "mensagem" => "Erro no banco: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["sucesso" => false, "mensagem" => "Nenhum dado válido recebido."]);
}
?>