<?php
header('Content-Type: application/json');
    require_once('../../class/Requerimento.php');
    $s = new Requerimentos;
    $obj = new stdClass();
    $login = $s->buscaLoginSDGC();
    $obj->userLogin = $login->id; 
    $obj->id_requerimento = $s->setDado($_POST['id']);
    $obj->id_agenda = $s->setDado($_POST['id_agenda']);
    if($obj->id_agenda == ''){$obj->id_agenda = null;}
    $obj->id_requerimento_status = $s->setDado($_POST['id_requerimento_status']);
    $obj->id_info = $s->setDado($_POST['id_info']);
    //verifica campos
    $s->verificaPreenchimentoCampo($obj->id_requerimento_status,'Selecione uma opção');
    if(Conexao::verificaLogin('atendimentoAgenda')){
        $exec = $s->atualizarStatus($obj);
        if($exec > 0){
            $ag = $s->cancelarAgendamento($obj);
            $tei = $s->atualizaRequerimentoHistorico($obj);
            $r = array('acao' => 'success', 'mensagem' => 'Liberado para reagendamento', 'exec'=> $exec);
        }else{
            $r = array('acao' => 'error', 'mensagem' => 'Servidor já reagendamento', 'exec'=> $exec);
        }
       echo json_encode($r);
    }