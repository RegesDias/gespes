<?php

header('Content-Type: application/json');
require_once('../../class/Usuario.php');
$u = new Usuario;

$exec = $u->listarPorNomeAtendimentos();

if(Conexao::verificaLogin('atendimentoAgenda')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $u->gravaLog('Ordenar usuário por nome');
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('Nenhum comentário encontrado');
    }
}