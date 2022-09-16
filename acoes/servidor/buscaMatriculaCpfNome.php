<?php
header('Content-Type: application/json');

require_once('../../class/Servidor.php');
$dado = $_GET['dado'];
$s = new Servidor;
$exec = $s->buscaMatriculaCpfNome($dado);

if(Conexao::verificaLogin('consultaPessoal')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('erro');
    }
}