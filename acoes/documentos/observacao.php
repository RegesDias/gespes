<?php
header('Content-Type: application/json');
require_once '../../class/Observacao.php';
$m = new Observacao;
$id = $m->setDado($_GET['id']);
$exec = $m->buscaIdDocumento($id);
if(Conexao::verificaLogin('protocolo')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $m->gravaLog('Lista movimentação por ID!');
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    }
}

?>

