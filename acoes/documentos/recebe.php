<?php
header('Content-Type: application/json');
require_once '../../class/Documentos.php';
require_once '../../class/Movimentacao.php';
$d = new Documentos;
$m = new Movimentacao;
$idMovimentacao = $d->setDado($_GET['dado']);

$result = $d->recebe($idMovimentacao);
if ($m->validaMovimentacao($idMovimentacao)){
    //if(Conexao::verificaLogin('consultaPessoal')){
        if (count($result) >= 1){
            $m->gravaLog('Recebe Documento'.$idMovimentacao);
            echo json_encode($result);
        } else {
                //echo json_encode('Nenhum servidor encontrado');
        }
    //}
}
?>

