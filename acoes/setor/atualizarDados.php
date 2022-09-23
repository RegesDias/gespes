<?php

header('Content-Type: application/json');
require_once('../../class/Setor.php');
$s= new Setor;

$id = $s->setDado($_POST['id']);
$nome = $s->setDado($_POST['nome']);
$status = $s->setDado($_POST['status']);

$s->verificaPreenchimentoCampo($nome,'nome');
$s->verificaPreenchimentoCampo($status, 'status');

if(Conexao::verificaLogin('usuarios')){
        $s->gravaLog('Modificado os dados do setor com o id: '.$id);
        $s->atualizarDados($id,$nome,$status);
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
}
