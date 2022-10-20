<?php
ini_set('display_errors',1);
ini_set('display_startup_erros',1);
error_reporting(E_ALL);
header('Content-Type: application/json');
require_once '../../class/Observacao.php';
$o = new Observacao;
$id = $o->setDado($_GET['id']);
$exec = $o->buscaId($id);
//if(Conexao::verificaLogin('consultaPessoal')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $o->gravaLog('Lista movimentação por ID!');
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    }
//}

?>

