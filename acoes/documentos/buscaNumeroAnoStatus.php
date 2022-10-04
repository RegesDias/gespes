<?php
header('Content-Type: application/json');
require_once '../../class/Documentos.php';
$m = new Documentos;
$numero = $m->setDado($_GET['numero']);
$ano = $m->setDado($_GET['ano']);
$status = $m->setDado($_GET['status']);
$exec = $m->buscaNumeroAnoStatus($numero, $ano, $status);
//if(Conexao::verificaLogin('consultaPessoal')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $m->gravaLog('Busca Historico de Documentos!');
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('Nenhum servidor encontrado');
    }
//}
?>

