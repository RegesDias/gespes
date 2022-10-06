<?php
header('Content-Type: application/json');
require_once '../../class/DocumentosTipo.php';
$m = new DocumentosTipo;
$exec = $m->listar();
//if(Conexao::verificaLogin('consultaPessoal')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $m->gravaLog('Listar tipo de documentos');
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('Nenhum servidor encontrado');
    }
//}
?>

