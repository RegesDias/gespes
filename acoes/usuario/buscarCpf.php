<?php
header('Content-Type: application/json');

require_once('../../class/Usuario.php');
$codfunc = $_GET['codfunc'];
$u = new Usuario;
$exec = $u->buscaCPF($codfunc);

if(Conexao::verificaLogin()){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('Nenhum comentário encontrado');
    }
}