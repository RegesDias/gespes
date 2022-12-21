<?php
header('Content-Type: application/json');
require_once '../../class/Agenda.php';
$ag = new Agenda;

$id = $ag->setDado($_POST['id']);
$end = $ag->setDado($_POST['end']);
$start = $ag->setDado($_POST['start']);
$allDay =  $ag->trueFalse($ag->setDado($_POST['allDay']));


//Modificando dadas para o banco
$partes = explode("T", $end);
$end = $partes[0]." ".$partes[1];
if(isset($partes[1])){
    $end =  substr($end, 0, -6);
}

$partes = explode("T", $start);
$start = $partes[0]." ".$partes[1];
if(isset($partes[1])){
    $start =  substr($start, 0, -6); 
}

$mes = $ag->convertDataPrimeiroDiaMes($partes[0]);

$dados = array(
    'id' => $id,
    'title' => $title,
    'start' => $start,
    'end' => $end,
    'backgroundColor' =>  $backgroundColor,
    'borderColor' => $borderColor,
    'allDay' => $allDay,
    'usuario' => $usuario,
    'mes' => $mes
);
//if(Conexao::verificaLogin('consultaPessoal')){
    $sql = $ag->redefinirEvento($dados);
    //echo json_encode('redefinirEvento Ok');
    echo json_encode($dados);
//}
?>