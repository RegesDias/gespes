<?php

header('Content-Type: application/json');
require_once('../../class/Setor.php');
$s = new Setor;

$exec = $s->ListarAtivos();

if(Conexao::verificaLogin('protocolo')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('Nenhum comentário encontrado');
    }
}