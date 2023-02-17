<?php
header('Content-Type: application/json');
    require_once('../../class/Requerimento.php');
    $s = new Requerimentos;
    $obj = new stdClass();
    $obj->id_requerimento = $s->setDado($_POST['idrequerimento']);
    $obj->idAgenda = $s->setDado($_POST['idAgenda']);
    $obj->id_requerimento_medico = $s->setDado($_POST['idRequerimentoMedico']);
    $obj->medicamentosFichaMedica = $s->setDado($_POST['medicamentosFichaMedica']);
    $obj->CRMFichaMedica = $s->setDado($_POST['CRMFichaMedica']);
    $obj->nomeMedicoAtestado = $s->setDado($_POST['nomeMedicoAtestado']);
    $obj->obsFichaMedica = $s->setDado($_POST['obsFichaMedica']);
    $obj->diasAfastamentoFichaMedica = $s->setDado($_POST['diasAfastamentoFichaMedica']);
    $obj->idCid10Selecionados = $s->setDado($_POST['idCid10Selecionados']);
    $obj->idCid10SelecionadosHPP = $s->setDado($_POST['idCid10SelecionadosHPP']);

    if(Conexao::verificaLogin('consultaPessoal')){
        $retorno=$s->inserirRAtendimento($obj);
        if($retorno > 0){
            foreach($obj->idCid10Selecionados as $cid10){
                $sql=$s->inserirRAtendimentoCid($retorno->id_requerimento_atendimento, $cid10, '0');
            }
            foreach($obj->idCid10SelecionadosHPP as $cid10){
                $sql=$s->inserirRAtendimentoCid($retorno->id_requerimento_atendimento, $cid10, '1');
            }
            $rtn = array('acao' => 'success', 'mensagem' => 'Perícia salva com sucesso', 'exec'=> $retorno, 'id'=> $retorno->id_requerimento_atendimento ,'codigo'=>'1');
            echo json_encode($rtn);
        }else{
            $r = array('acao' => 'error', 'mensagem' => 'Error999', 'exec'=> $exec);
        }
    }