<?php
header('Content-Type: application/json');
require_once '../../class/Agenda.php';
$ag = new Agenda;
$id = $ag->setDado($_GET['id']);
$resp = $ag->buscaEventoId($id);
$exec = $resp->exec;
//if(Conexao::verificaLogin('consultaPessoal')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('');
    }
?>