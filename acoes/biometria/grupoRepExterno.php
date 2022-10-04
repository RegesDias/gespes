<?php
header('Content-Type: application/json');
require_once '../../class/BiometriaExterno.php';
$be = new BiometriaExterno;
$cpf = $be->setDado($_GET['cpf']);
$exec = $be->grupoRepExterno($cpf);
//if(Conexao::verificaLogin('consultaPessoal')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $be->gravaLog('Busca grupos REP');
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('Nenhum servidor encontrado');
    }
//}
?>