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
    $obj->id_requerimento_atendimento = $s->setDado($_POST['idRequerimentoAtendimento']);

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

    if(Conexao::verificaLogin('atendimentoAgenda')){
        $rtn = $s->atualizarRAtendimento($obj);
        if($rtn->exec > 0){
            $s->limparRAtendimentoCid($obj->id_requerimento_atendimento);
            $s->limparRAtendimentoExameFisico($obj->id_requerimento_atendimento);
            foreach($obj->exameFisico as $exame){
                $sql=$s->inserirRAtendimentoExameFisico($obj->id_requerimento_atendimento,$exame['chave'],$exame['valor']);
            }            
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