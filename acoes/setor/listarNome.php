<?php

header('Content-Type: application/json');
require_once('../../class/Setor.php');
$s = new Setor;

$exec = $s->listarPorNome();

if(Conexao::verificaLogin('setor')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $s->gravaLog('Ordenar usuário por nome');
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('Nenhum comentário encontrado');
    }
}