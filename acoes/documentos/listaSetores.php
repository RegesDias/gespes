<?php

header('Content-Type: application/json');
require_once('../../class/Secretaria.php');
$s = new Secretaria;

$exec = $s->Listar();

if(Conexao::verificaLogin('protocolo')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('Nenhum comentário encontrado');
    }
}