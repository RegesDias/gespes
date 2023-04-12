<?php

header('Content-Type: application/json');
require_once('../../class/Usuario.php');
$u = new Usuario;
if ($_SESSION['protSelectTodosUsuarios'] == 1){
    $exec = $u->listarPorNome();
}else{
    $id = $_SESSION['id'];
    $exec = $u->listarPorNomeId($id);
}


if(Conexao::verificaLogin('protocolo')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $u->gravaLog('Ordenar usuário por nome');
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('Nenhum comentário encontrado');
    }
}