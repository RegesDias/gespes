<?php
header('Content-Type: application/json');
require_once '../../class/Biometria.php';
$be = new Biometria;
$cpf = $be->setDado($_GET['cpf']);
$dataInicio = $be->setDado($_GET['dataInicio']);
$dataFim = $be->setDado($_GET['dataFim']);
$exec = $be->marcacoes($cpf, $dataInicio, $dataFim);
//if(Conexao::verificaLogin('consultaPessoal')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $be->gravaLog('Verificar Marcacoes!');
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('Nenhum servidor encontrado');
    }
//}
?>

