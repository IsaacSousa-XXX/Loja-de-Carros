<?php
// Libera o CORS para o Angular conseguir acessar a API localmente
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Configurações do Banco de Dados
$host = 'localhost';
$db   = 'koc_db';
$user = 'root'; // Seu usuário do MySQL Workbench
$pass = '';     // Coloque sua senha do Workbench aqui (se tiver)

try {
    // Cria a conexão
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
} catch (PDOException $e) {
    die(json_encode(["sucesso" => false, "mensagem" => "Erro de conexão: " . $e->getMessage()]));
}
?>