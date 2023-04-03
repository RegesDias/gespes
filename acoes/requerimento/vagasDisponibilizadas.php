<?php
header('Content-Type: application/json');
require_once('../../class/Requerimento.php');
    $s = new Requerimentos;
    $obj = new stdClass();
    $obj->id_agenda = $s->setDado($_GET['id_agenda']);
    $exec = $s->vagasDisponibilizadas($obj->id_agenda);
    if(Conexao::verificaLogin('atendimentoAgenda')){
        $exec->execute();
        if ($exec->rowCount() >= 1) {
            echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
        } else {
            echo json_encode('');
        }
    }