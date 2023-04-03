<?php
header('Content-Type: application/json');
require_once '../../class/Documentos.php';
require_once '../../class/Movimentacao.php';
$d = new Documentos;
$m = new Movimentacao;
$idMovimentacao = $d->setDado($_GET['idMovimentacao']);
$idDocumento = $d->setDado($_GET['idDocumento']);
$encaminharTexto = 'DOCUMENTO DESARQUIVADO POR '.$_SESSION['nome'];


if(Conexao::verificaLogin('protocolo')){
    $d->entradaExecutar($idDocumento,$encaminharTexto);
    $d->desarquivarDocumento($idDocumento);
        $m->gravaLog('Documento '.$idDocumento.' desarquivamento executada pelo usuário '.$_SESSION['id']);
        $retorno = array('codigo' => 1, 'mensagem' => 'Documento desarquivado com sucesso!');
        echo json_encode($retorno);
}

?>

