<?php
header('Content-Type: application/json');
require_once('../../class/Requerimento.php');
$s = new Requerimentos;
$id_requerimento_atendimento = $s->setDado($_GET['id_requerimento_atendimento']);
$exec = $s->buscarRAtendimentoExameFisico($id_requerimento_atendimento);
if(Conexao::verificaLogin('atendimentoAgenda')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('');
    }
}