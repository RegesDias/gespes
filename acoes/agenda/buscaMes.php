<?php
header('Content-Type: application/json');
require_once '../../class/Agenda.php';
$ag = new Agenda;
$date = $ag->setDado($_GET['date']);
$exec = $ag->agendamentosMes($date);
//if(Conexao::verificaLogin('consultaPessoal')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('');
    }
?>