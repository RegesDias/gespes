<?php

header('Content-Type: application/json');
require_once('../../class/Requerimento.php');
$s = new Requerimentos;

$obj = new stdClass();
$obj->id_requerimento_status = $s->setDado($_POST['id_requerimento_status']);
$obj->id_requerimento_solicitacao = $s->setDado($_POST['id_requerimento_solicitacao']);
$obj->matricula = $s->setDado($_POST['matricula']);
$obj->id_info = $s->setDado($_POST['id_info']);

if(Conexao::verificaLogin('atendimentoAgenda')){
    $id = $s->inserir($obj);
    echo json_encode($id);
    $r = array(
        'id' => $id
    );
   //echo json_encode($id);
}