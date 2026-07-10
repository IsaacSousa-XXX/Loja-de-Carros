<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require 'conexao.php';

$dados_recebidos = file_get_contents("php://input");
$usuario = json_decode($dados_recebidos);

if ($usuario && !empty($usuario->nome) && !empty($usuario->email) && !empty($usuario->senha)) {
    try {
        // 1. Verifica se o e-mail já existe no banco
        $sqlCheck = "SELECT id FROM usuarios WHERE email = :email";
        $stmtCheck = $pdo->prepare($sqlCheck);
        $stmtCheck->bindParam(':email', $usuario->email);
        $stmtCheck->execute();
        
        if ($stmtCheck->fetch()) {
            echo json_encode(["sucesso" => false, "mensagem" => "Este e-mail já está cadastrado."]);
            exit;
        }

        // 2. Insere o novo usuário
        $sql = "INSERT INTO usuarios (nome_usuario, email, senha) VALUES (:nome, :email, :senha)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':nome', $usuario->nome);
        $stmt->bindParam(':email', $usuario->email);
        $stmt->bindParam(':senha', $usuario->senha);
        $stmt->execute();
        
        echo json_encode(["sucesso" => true, "mensagem" => "Conta criada com sucesso!"]);
    } catch(PDOException $e) {
        echo json_encode(["sucesso" => false, "mensagem" => "Erro MySQL: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["sucesso" => false, "mensagem" => "Preencha todos os campos corretamente."]);
}
?>