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
    
    $ip = $s->inserirNumeroDeProtocolo($obj);
    $as = $s->atualizarStatus($obj);
    $arh = $s->atualizaRequerimentoHistorico($obj);
if(Conexao::verificaLogin('consultaPessoal')){
        $s->gravaLog('Exibe dados do servidor matricula: '.$codfunc);
        echo json_encode($ip);

}