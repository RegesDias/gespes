<?php
header('Content-Type: application/json');
require_once('../../class/Requerimento.php');
    $s = new Requerimentos;
    $obj = new stdClass();
    $obj->id_requerimento = $s->setDado($_GET['id_requerimento']);
    $exec = $s->resumoAgendamento($obj->id_requerimento);
    if(Conexao::verificaLogin('consultaPessoal')){
        $exec->execute();
        if ($exec->rowCount() >= 1) {
            echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
        } else {
            echo json_encode('');
        }
    }