<?php

header('Content-Type: application/json');
require_once('../../class/Requerimento.php');
$s = new Requerimentos;

$obj = new stdClass();
$obj->id_requerimento_status = $s->setDado($_POST['id_requerimento_status']);
$obj->id_requerimento_solicitacao = $s->setDado($_POST['id_requerimento_solicitacao']);
$obj->id_historico_funcional = $s->setDado($_POST['id_historico_funcional']);
$obj->id_info = $s->setDado($_POST['id_info']);

if(Conexao::verificaLogin('consultaPessoal')){
    $id = $s->inserir($obj);
    echo json_encode($id);
    $r = array(
        'id' => $id
    );
   // echo json_encode($r);
}