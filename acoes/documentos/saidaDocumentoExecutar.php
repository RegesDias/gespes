<?php
header('Content-Type: application/json');
require_once '../../class/Documentos.php';
require_once '../../class/Movimentacao.php';
$d = new Documentos;
$m = new Movimentacao;
$idMovimentacao = $d->setDado($_GET['idMovimentacao']);
$idDocumento = $d->setDado($_GET['idDocumento']);
$destino = $d->setDado($_GET['destino']);
$encaminharTexto = $d->setDado($_GET['encaminharTexto']);

$d->verificaPreenchimentoCampo($destino, 'Destino');
$d->verificaPreenchimentoCampo($encaminharTexto, 'Encaminhamento');


if ($m->validaMovimentacao($idMovimentacao)){
    //if(Conexao::verificaLogin('consultaPessoal')){
        $d->finalizarMovimento($idMovimentacao);
        $d->saidaExecutar($idDocumento,$destino,$encaminharTexto);
        $d->arquivarDocumento($idDocumento);
            $m->gravaLog('Documento '.$idDocumento.' saída executada pelo usuário '.$_SESSION['id']);
            $retorno = array('codigo' => 1, 'mensagem' => 'Documento arquivado com sucesso!');
            echo json_encode($retorno);
    //}
}else{
    $retorno = array('codigo' => 1, 'mensagem' => 'Erro executar saída documento '.$idMovimentacao);
    echo json_encode($retorno);  
}
?>

