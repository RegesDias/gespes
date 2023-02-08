<?php

header('Content-Type: application/json');
require_once('../../class/Endereco.php');
$s = new Endereco;

$idEstado = $s->setDado($_GET['id']);
if($idEstado == ''){
    $exec = $s->listaEstados();
}else{
    $exec = $s->listaEstadoId($idEstado);
}
if(Conexao::verificaLogin('consultaPessoal')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $s->gravaLog('Exibe dados do servidor matricula: '.$codfunc);
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('');
    }
}