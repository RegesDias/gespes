<?php
header('Content-Type: application/json');
require_once '../../class/DocumentosTipo.php';
$m = new DocumentosTipo;
$id = $m->setDado($_GET['id']);
$exec = $m->buscaId($id);
if(Conexao::verificaLogin('protocolo')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $m->gravaLog('Busca Movimentacao por ID!');
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('Nenhum servidor encontrado');
    }
}
?>

