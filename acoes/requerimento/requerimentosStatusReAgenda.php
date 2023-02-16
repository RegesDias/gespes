<?php
header('Content-Type: application/json');
require_once('../../class/Requerimento.php');
    $s = new Requerimentos;
    $exec = $s->requerimentosStatusReAgenda();
    if(Conexao::verificaLogin('consultaPessoal')){
        $exec->execute();
        if ($exec->rowCount() >= 1) {
            echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
        } else {
            echo json_encode('');
        }
    }