<?php
header('Content-Type: application/json');

require_once('../../class/Usuario.php');
$u = new Usuario;
$exec = $u->listarPorCodigo();

if(Conexao::verificaLogin('usuarios')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('Nenhum comentário encontrado');
    }
}