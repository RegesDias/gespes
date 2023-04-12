<?php
header('Content-Type: application/json');
    require_once('../../class/Requerimento.php');
    $s = new Requerimentos;
    $obj = new stdClass();
    $obj->id_requerimento = $s->setDado($_POST['id']);
    if(Conexao::verificaLogin('atendimentoAgenda')){
        $exec = $s->requerimentoSolicitacaoApagar($obj);
        if($exec > 0){
            $r = array('acao' => 'success', 'mensagem' => 'Documento Apagado', 'exec'=> $exec);
        }else{
            $r = array('acao' => 'error', 'mensagem' => 'Documento não existe', 'exec'=> $exec);
        }
       echo json_encode($r);
    }