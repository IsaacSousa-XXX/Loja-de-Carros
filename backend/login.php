<?php
require 'conexao.php';

$dados_recebidos = file_get_contents("php://input");
$credenciais = json_decode($dados_recebidos);

if ($credenciais && !empty($credenciais->email) && !empty($credenciais->senha)) {
    try {
        // Procura o usuário no banco
        $sql = "SELECT id, nome_usuario, email FROM usuarios WHERE email = :email AND senha = :senha";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':email', $credenciais->email);
        $stmt->bindParam(':senha', $credenciais->senha);
        $stmt->execute();
        
        $usuario = $stmt->fetch();
        
        if ($usuario) {
            // Achou o usuário! Login liberado.
            echo json_encode(["sucesso" => true, "dados" => $usuario]);
        } else {
            // E-mail ou senha não bateram
            echo json_encode(["sucesso" => false, "mensagem" => "E-mail ou senha incorretos."]);
        }
    } catch(PDOException $e) {
        echo json_encode(["sucesso" => false, "mensagem" => "Erro no banco: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["sucesso" => false, "mensagem" => "Preencha todos os campos."]);
}
?>