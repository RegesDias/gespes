<?php
header('Content-Type: application/json');
require_once('../../class/Requerimento.php');
$s = new Requerimentos;
$HPP = $s->setDado($_GET['HPP']);
$id_requerimento_atendimento = $s->setDado($_GET['id_requerimento_atendimento']);
$exec = $s->buscarRAtendimentoCid($HPP,$id_requerimento_atendimento);
if(Conexao::verificaLogin('consultaPessoal')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $s->gravaLog('Exibe dados do servidor matricula: '.$codfunc);
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('');
    }
}