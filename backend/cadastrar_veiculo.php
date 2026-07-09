<?php
// Puxa as configurações de conexão e CORS
require 'conexao.php';

// Recebe os dados em formato JSON vindos do Angular
$dados_recebidos = file_get_contents("php://input");
$veiculo = json_decode($dados_recebidos);

// Verifica se os dados chegaram corretamente
if ($veiculo && !empty($veiculo->modelo)) {
    try {
        // Prepara a query SQL de inserção
        $sql = "INSERT INTO veiculos (modelo, marca, ano, categoria, preco, imagem_url) 
                VALUES (:modelo, :marca, :ano, :categoria, :preco, :imagem_url)";
        
        $stmt = $pdo->prepare($sql);
        
        // Substitui os valores com segurança (evita SQL Injection)
        $stmt->bindParam(':modelo', $veiculo->modelo);
        $stmt->bindParam(':marca', $veiculo->marca);
        $stmt->bindParam(':ano', $veiculo->ano);
        $stmt->bindParam(':categoria', $veiculo->categoria);
        $stmt->bindParam(':preco', $veiculo->preco);
        $stmt->bindParam(':imagem_url', $veiculo->imagem_url);
        
        // Executa no banco
        $stmt->execute();
        
        // Responde para o Angular que deu tudo certo
        echo json_encode(["sucesso" => true, "mensagem" => "Veículo cadastrado com sucesso na garagem!"]);
        
    } catch(PDOException $e) {
        // Responde se der algum erro no banco
        echo json_encode(["sucesso" => false, "mensagem" => "Erro no banco: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["sucesso" => false, "mensagem" => "Nenhum dado válido recebido."]);
}
?>