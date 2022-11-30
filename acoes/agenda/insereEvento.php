<?php
header('Content-Type: application/json');
require_once '../../class/Agenda.php';
$ag = new Agenda;



$title = $ag->setDado($_POST['title']);
$backgroundColor = $ag->setDado($_POST['backgroundColor']);
$borderColor = $ag->setDado($_POST['borderColor']);
$allDay = $ag->setDado($_POST['allDay']);
$usuario = $ag->setDado($_POST['usuario']);
$end = $ag->setDado($_POST['end']);
$start = $ag->setDado($_POST['start']);


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
    $id =  $ag->insereEvento($dados);
    $r = array(
        'id' => $id
    );
    echo json_encode($r);
//}
?>