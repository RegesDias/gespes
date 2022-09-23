<?php

header('Content-Type: application/json');
require_once('../../class/Servidor.php');
$s = new Servidor;

$dado = $s->setDado($_GET['dado']);

$s->verificaPreenchimentoCampo($dado, 'busca');
$exec = $s->buscaMatriculaCpfNome($dado);

if(Conexao::verificaLogin('consultaPessoal')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $s->gravaLog('Busca Pessoal: '.$dado);
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        $retorno = array('codigo' => 0, 'mensagem' => 'Nenhum servidor encontrado!');
        echo json_encode($retorno);
    }
}