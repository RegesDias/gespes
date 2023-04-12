<?php
header('Content-Type: application/json');
    require_once('../../class/Requerimento.php');
    $s = new Requerimentos;
    $obj = new stdClass();
    $login = $s->buscaLoginSDGC();
    $obj->userLogin = $login->id;
    $obj->id_requerimento_status = $s->setDado($_POST['id_requerimento_status']);
    $obj->id_requerimento = $s->setDado($_POST['id']);
    $obj->id_requerimento_atendimento = $s->setDado($_POST['idRequerimentoAtendimento']);
    $obj->id_requerimento_medico = $s->setDado($_POST['idRequerimentoMedico']);
    $obj->finalizaStatus = '0';
    
    if(Conexao::verificaLogin('atendimentoAgenda')){
        $tei = $s->atualizaRequerimentoHistorico($obj);
        $exec = $s->atualizarStatus($obj);
        $finalizaR = $s->finalizaRAtendimento($obj);
        $finaliza = $s->finalizaRequerimento($obj);
        if($exec > 0){
            $rtn = array('acao' => 'success', 'mensagem' => 'Perícia salva com sucesso', 'exec'=> $retorno, 'id'=> $retorno->id_requerimento_atendimento ,'codigo'=>'1');
            echo json_encode($rtn);
        }else{
            $r = array('acao' => 'error', 'mensagem' => 'Error999', 'exec'=> $exec);
        }
    }