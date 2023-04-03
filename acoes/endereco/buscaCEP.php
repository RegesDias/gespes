<?php

header('Content-Type: application/json');
require_once('../../class/Endereco.php');
$s = new Endereco;

$cep = $s->setDado($_GET['cep']);
$exec = $s->buscarCep($cep);
if(Conexao::verificaLogin('consultaPessoal')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $s->gravaLog('Exibe dados do servidor matricula: '.$codfunc);
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('');
    }
}