<?php

header('Content-Type: application/json');
require_once('../../class/Setor.php');
$s = new Setor;

$nome = strtoupper($s->setDado($_POST['nome']));
$status = $s->setDado($_POST['status']);

$s->verificaPreenchimentoCampo($nome,'nome');
$s->verificaPreenchimentoCampo($status, 'status');
$s->insereNovo($nome, $status);

if(Conexao::verificaLogin('setor')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $u->gravaLog('Insere novo setor com o nome: '.$nome);
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('Erro ao salvar setor');
    }
}