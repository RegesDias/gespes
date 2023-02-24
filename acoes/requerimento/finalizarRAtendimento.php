<?php
header('Content-Type: application/json');
    require_once('../../class/Requerimento.php');
    $s = new Requerimentos;
    $obj = new stdClass();
    $login = $s->buscaLoginSDGC();
    $obj->userLogin = $login->id;
    $obj->id_requerimento_status = $s->setDado($_POST['id_requerimento_status']);
    $obj->id_requerimento = $s->setDado($_POST['idrequerimento']);
    $obj->idAgenda = $s->setDado($_POST['idAgenda']);
    $obj->id_requerimento_medico = $s->setDado($_POST['idRequerimentoMedico']);
    $obj->medicamentosFichaMedica = $s->setDado($_POST['medicamentosFichaMedica']);
    $obj->CRMFichaMedica = $s->setDado($_POST['CRMFichaMedica']);
    $obj->nomeMedicoAtestado = $s->setDado($_POST['nomeMedicoAtestado']);
    $obj->obsFichaMedica = $s->setDado($_POST['obsFichaMedica']);
    $obj->diasAfastamentoFichaMedica = $s->setDado($_POST['diasAfastamentoFichaMedica']);
    $obj->id_requerimento_atendimento = $s->setDado($_POST['idRequerimentoAtendimento']);
    
    if(Conexao::verificaLogin('atendimentoAgenda')){
        $tei = $s->atualizaRequerimentoHistorico($obj);
        $exec = $s->atualizarStatus($obj);
        $finaliza = $s->finalizaRAtendimento($obj);
        if($exec > 0){
            $rtn = array('acao' => 'success', 'mensagem' => 'Perícia salva com sucesso', 'exec'=> $retorno, 'id'=> $retorno->id_requerimento_atendimento ,'codigo'=>'1');
            echo json_encode($rtn);
        }else{
            $r = array('acao' => 'error', 'mensagem' => 'Error999', 'exec'=> $exec);
        }
    }