<?php

header('Content-Type: application/json');
require_once('../../class/Documentos.php');
$s = new Documentos;

$exec = $s->listarNumero();

//if(Conexao::verificaLogin('consultaPessoal')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $s->gravaLog('Busca Pessoal ordenar por Nome');
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('');
    }
//}