<?php
header('Content-Type: application/json');
require_once '../../class/Documentos.php';
$m = new Documentos;
$id = $m->setDado($_GET['id']);
$exec = $m->buscaId($id);
//if(Conexao::verificaLogin('consultaPessoal')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $m->gravaLog('Busca Documentos por ID!');
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('Nenhum servidor encontrado');
    }
//}
?>

