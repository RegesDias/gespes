<?php
header('Content-Type: application/json');
require_once '../../class/Agenda.php';
$ag = new Agenda;

$id = $ag->setDado($_POST['id']);
$start = $ag->setDado($_POST['start']);
$end = $ag->setDado($_POST['end']);
$allDay =  $ag->trueFalse($ag->setDado($_POST['allDay']));
$title = $ag->setDado($_POST['title']);
$color = $ag->setDado($_POST['color']);
$usuario = $ag->setDado($_POST['usuario']);

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
                'id'=>$id,
                'start'=>$start,
                'end'=>$end,
                'allDay'=>$allDay,
                'title'=>$title,
                'color'=>$color,
                'mes'=>$mes,
                'usuario' => $usuario
            );
$sql =  $ag->AtualizaEvento($dados);
echo json_encode($sql);
/*$exec = $ag->agendamentosMes($date);
//if(Conexao::verificaLogin('consultaPessoal')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('');
    }
?>