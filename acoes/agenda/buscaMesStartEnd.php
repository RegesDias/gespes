<?php
header('Content-Type: application/json');
require_once '../../class/Agenda.php';
$ag = new Agenda;
$start = $ag->setDado($_POST['start']);
$end = $ag->setDado($_POST['end']);
$a = array('start' => $start, 'end'=>$end);

$exec = $ag->agendamentosMesStartEnd($start, $end);
//echo json_encode(array($exec));
//if(Conexao::verificaLogin('consultaPessoal')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('');
    }
?>