<?php

//header('Content-Type: application/json');
require_once('../../class/Agenda.php');
    $s = new Agenda;
    $cpf = $s->setDado($_GET['cpf']);
    $exec = $s->ListaAgendamentosCPF($cpf);
    if(Conexao::verificaLogin('consultaPessoal')){
        $exec->execute();
        if ($exec->rowCount() >= 1) {
            $s->gravaLog('Exibe dados do servidor matricula: '.$codfunc);
            echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
        } else {
            echo json_encode('');
        }
    }