<?php
header('Content-Type: application/json');
require_once '../../class/Agenda.php';
$ag = new Agenda;
$id = $ag->setDado($_GET['id']);
echo json_encode($ag->removeEvento($id));
//if(Conexao::verificaLogin('consultaPessoal')){
//        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
?>