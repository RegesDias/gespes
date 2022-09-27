<?php

header('Content-Type: application/json');
require_once('../../class/Usuario.php');
$u = new Usuario;

$dado = $u->setDado($_GET['dado']);
$exec = $u->buscaCpfSDGC($dado);

if(Conexao::verificaLogin('usuarios')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $dados = $exec->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($dados);
    } else {
        echo json_encode('Nenhum comentário encontrado'.$dado);
    }
}