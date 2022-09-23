<?php

header('Content-Type: application/json');
require_once('../../class/Setor.php');
$s = new Setor;

$exec = $s->listarPorCodigo();

if(Conexao::verificaLogin('setor')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $s->gravaLog('Ordenar setor por codigo');
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('Nenhum setor encontrado');
    }
}