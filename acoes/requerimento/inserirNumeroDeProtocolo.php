<?php

header('Content-Type: application/json');
require_once('../../class/Requerimento.php');
    $s = new Requerimentos;
    $obj = new stdClass();
    $login = $s->buscaLoginSDGC();
    $obj->userLogin = $login->id; 
    $obj->protocolo = $s->setDado($_POST['protocolo']);
    $obj->id_requerimento = $s->setDado($_POST['id']);
    $obj->id_requerimento_status = $s->setDado($_POST['id_requerimento_status']);
    $obj->id_info = $s->setDado($_POST['id_info']);
    //verifica campos
    $s->verificaPreenchimentoCampo($obj->protocolo,'Protocolo');
    if(Conexao::verificaLogin('consultaPessoal')){
        $exec = $s->inserirNumeroDeProtocolo($obj);
        if($exec > 0){
            $s->atualizarStatus($obj);
            $tei = $s->atualizaRequerimentoHistorico($obj);
            $r = array('acao' => 'success', 'mensagem' => 'Sucesso as atualizar Protocolo', 'exec'=> $exec);
        }else{
            $r = array('acao' => 'error', 'mensagem' => 'Protocolo já Cadastrado', 'exec'=> $exec);
        }
       echo json_encode($r);
    }