<?php
header('Content-Type: application/json');
    require_once('../../class/Requerimento.php');
    $s = new Requerimentos;
    $obj = new stdClass();
    $obj->id_requerimento_atendimento = $s->setDado($_POST['id_requerimento_atendimento']);
    $obj->medicamentosFichaMedica = $s->setDado($_POST['medicamentosFichaMedica']);
    $obj->CRMFichaMedica = $s->setDado($_POST['CRMFichaMedica']);
    $obj->nomeMedicoAtestado = $s->setDado($_POST['nomeMedicoAtestado']);
    $obj->obsFichaMedica = $s->setDado($_POST['obsFichaMedica']);
    $obj->diasAfastamentoFichaMedica = $s->setDado($_POST['diasAfastamentoFichaMedica']);
    $obj->idCid10Selecionados = $s->setDado($_POST['idCid10Selecionados']);
    $obj->idCid10SelecionadosHPP = $s->setDado($_POST['idCid10SelecionadosHPP']);
    if(Conexao::verificaLogin('atendimentoAgenda')){
        $rtn = $s->atualizarRAtendimento($obj);
        if($rtn->exec > 0){
            $s->limparRAtendimentoCid($obj->id_requerimento_atendimento);
            foreach($obj->idCid10Selecionados as $cid10){
                $sql=$s->inserirRAtendimentoCid($obj->id_requerimento_atendimento, $cid10, '0');
            }
            foreach($obj->idCid10SelecionadosHPP as $cid10){
                $sql=$s->inserirRAtendimentoCid($obj->id_requerimento_atendimento, $cid10, '1');
            }
            $r = array('acao' => 'success', 'mensagem' => 'Dados Atualizados', 'exec'=> $rtn->exec, 'sql'=>$rtn->sql);
        }else{
            $r = array('acao' => 'error', 'mensagem' => 'Erro ao Atualizar Dados', 'exec'=> $rtn->exec, 'sql'=>$rtn->sql);
        }
       echo json_encode($r);
    }