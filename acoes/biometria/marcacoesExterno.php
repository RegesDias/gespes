<?php
header('Content-Type: application/json');
require_once '../../class/BiometriaExterno.php';
$be = new BiometriaExterno;
$cpf = $be->setDado($_GET['cpf']);
$dataInicio = $be->setDado($_GET['dataInicio']." 00:00:00");
$dataFim = $be->setDado($_GET['dataFim']." 23:59:59");
$exec = $be->marcacoesExterno($cpf, $dataInicio, $dataFim);
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

