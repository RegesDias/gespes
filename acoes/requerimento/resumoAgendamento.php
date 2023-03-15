<?php
header('Content-Type: application/json');
require_once('../../class/Requerimento.php');
    $s = new Requerimentos;
    $obj = new stdClass();
    $obj->id_requerimento = $s->setDado($_GET['id_requerimento']);
    $exec = $s->resumoAgendamento($obj->id_requerimento);
    if(Conexao::verificaLogin('atendimentoAgenda')){
        $exec->execute();
        if ($exec->rowCount() >= 1) {
            $resumoAgendamento = $exec->fetchAll(PDO::FETCH_ASSOC);
            $exec = $s->resumoAgendamentoAtendimento($obj->id_requerimento);
            $exec->execute();
            if ($exec->rowCount() >= 1) {
                $resumoAgendamentoAtendimento = $exec->fetchAll(PDO::FETCH_ASSOC);
                $result = array_merge($resumoAgendamento[0], $resumoAgendamentoAtendimento[0]);
                $result = array($result);
            }else{
                $result = $resumoAgendamento;
            }
            echo json_encode($result);
        } else {
            echo json_encode('');
        }
    }