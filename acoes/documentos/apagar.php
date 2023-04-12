<?php
header('Content-Type: application/json');
require_once '../../class/Documentos.php';
require_once '../../class/Movimentacao.php';
$d = new Documentos;
$idDocumento = $d->setDado($_GET['idDocumento']);
if(Conexao::verificaLogin('protocolo')){
    $d->apagar($idDocumento);
    $retorno = array('codigo' => 1, 'mensagem' => 'Documento Apagado');
    echo json_encode($retorno);  
}
?>

