<?php

header('Content-Type: application/json');
require_once('../../class/Servidor.php');
$s = new Servidor;

$codfunc = $s->setDado($_GET['codfunc']);

$exec = $s->buscaCodFunc($codfunc);

if(Conexao::verificaLogin('consultaPessoal')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $s->gravaLog('Exibe dados do servidor matricula: '.$codfunc);
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('Nenhum servidor encontrado');
    }
}