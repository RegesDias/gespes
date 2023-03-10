<?php

header('Content-Type: application/json');
require_once('../../class/Requerimento.php');
$s = new Requerimentos;

$exec = $s->listaLocaldaPericia();
if(Conexao::verificaLogin('atendimentoAgenda')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $s->gravaLog('verificaLogin');
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('');
    }
}