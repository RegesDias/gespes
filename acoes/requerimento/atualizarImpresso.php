<?php
header('Content-Type: application/json');
    require_once('../../class/Requerimento.php');
    $s = new Requerimentos;
    $obj = new stdClass();
    $obj->id_requerimento = $s->setDado($_POST['id']);
    $obj->impresso = $s->setDado($_POST['impresso']);
    if(Conexao::verificaLogin('atendimentoAgenda')){
        $exec = $s->atualizarImpresso($obj);
        $r = array('acao' => 'success', 'mensagem' => 'Atendimento Finalizado', 'exec'=> $exec);
        echo json_encode($r);
    }