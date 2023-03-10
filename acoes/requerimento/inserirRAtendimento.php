<?php
header('Content-Type: application/json');
    require_once('../../class/Requerimento.php');
    $s = new Requerimentos;
    $obj = new stdClass();
    $login = $s->buscaLoginSDGC();
    //Ids
    $obj->userLogin = $login->id;
    $obj->id_requerimento_status = '8';
    $obj->id_requerimento = $s->setDado($_POST['idrequerimento']);
    $obj->idAgenda = $s->setDado($_POST['idAgenda']);
    $obj->id_requerimento_medico = $s->setDado($_POST['idRequerimentoMedico']);

    //Dados do Atestado
    $obj->dadosAtestadoCRM = $s->setDado($_POST['dadosAtestadoCRM']);
    $obj->dadosAtestadoDiasAfastamento = $s->setDado($_POST['dadosAtestadoDiasAfastamento']);
    $obj->dadosAtestadoNome = $s->setDado($_POST['dadosAtestadoNome']);

    //Resultado Pericia Medica
    $obj->resultadoPericiaHistorico = $s->setDado($_POST['resultadoPericiaHistorico']);
    $obj->resultadoPericiaTipo = $s->setDado($_POST['resultadoPericiaTipo']);
    $obj->resultadoPericiaDias = $s->setDado($_POST['resultadoPericiaDias']);
    $obj->resultadoPericiaPrimeiroDia = $s->setDado($_POST['resultadoPericiaPrimeiroDia']);
    $obj->resultadoPericiaUltimoDia = $s->setDado($_POST['resultadoPericiaUltimoDia']);

    //Exame Fisico
    $obj->exameFisico = $s->setDado($_POST['exameFisico']);
    
    //CIDs
    $obj->idCid10Selecionados = $s->setDado($_POST['idCid10Selecionados']);
    $obj->idCid10SelecionadosHPP = $s->setDado($_POST['idCid10SelecionadosHPP']);

    //Dados Gerais
    $obj->observacao = $s->setDado($_POST['obsFichaMedica']);
    $obj->idLocaldoExame = $s->setDado($_POST['idLocaldoExame']);
    if(Conexao::verificaLogin('atendimentoAgenda')){
        $tei = $s->atualizaRequerimentoHistorico($obj);
        $exec = $s->atualizarStatus($obj);
        $retorno = $s->inserirRAtendimento($obj);
        if($retorno > 0){
            foreach($obj->exameFisico as $exame){
                $sql=$s->inserirRAtendimentoExameFisico($retorno->id_requerimento_atendimento,$exame['chave'],$exame['valor']);
            }
            foreach($obj->idCid10Selecionados as $cid10){
                $sql=$s->inserirRAtendimentoCid($retorno->id_requerimento_atendimento, $cid10, '0');
            }
            foreach($obj->idCid10SelecionadosHPP as $cid10){
                $sql=$s->inserirRAtendimentoCid($retorno->id_requerimento_atendimento, $cid10, '1');
            }
            $rtn = array('acao' => 'success', 'mensagem' => 'Perícia salva com sucesso', 'exec'=> $retorno, 'id'=> $retorno->id_requerimento_atendimento ,'codigo'=>'1');
            echo json_encode($rtn);
        }else{
            $rtn = array('acao' => 'error', 'mensagem' => 'Error999', 'exec'=> $exec);
            echo json_encode($rtn);
        }
    }