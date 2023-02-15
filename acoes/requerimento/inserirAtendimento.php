<?php

header('Content-Type: application/json');
    require_once('../../class/Requerimento.php');
    $s = new Requerimentos;
    $obj = new stdClass();
    $login = $s->buscaLoginSDGC();
    $obj->userLogin = $login->id; 
    $obj->id_agenda = $s->setDado($_POST['id_agenda']);
    $obj->id_requerimento = $s->setDado($_POST['id']);
    $obj->id_requerimento_status = $s->setDado($_POST['id_requerimento_status']);
    $obj->id_info = $s->setDado($_POST['id_info']);
    //verifica campos
    $s->verificaPreenchimentoCampo($obj->id_agenda,'Datas Disponíveis');

    $s->vagasOcupadas($obj->id_agenda);
    if(Conexao::verificaLogin('consultaPessoal')){
        $exec = $s->atualizarIdAgenda($obj);
        if($exec > 0){
            $status = $s->atualizarStatus($obj);
            $tei = $s->atualizaRequerimentoHistorico($obj);
            $r = array('acao' => 'success', 'mensagem' => 'Sucesso ao agendar', 'exec'=> $exec);
        }else{
            $r = array('acao' => 'error', 'mensagem' => 'Servidor já agendado', 'exec'=> $exec);
        }
       echo json_encode($r);
    }