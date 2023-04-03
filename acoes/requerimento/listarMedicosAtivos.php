<?php

header('Content-Type: application/json');
require_once('../../class/Usuario.php');
    $s = new Usuario;
    $exec = $s->listarPorNomeAtendimentos();
    if(Conexao::verificaLogin('atendimentoAgenda')){
        $exec->execute();
        if ($exec->rowCount() >= 1) {
            $s->gravaLog('Exibe dados do servidor matricula: '.$codfunc);
            echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
        } else {
            echo json_encode('');
        }
    }