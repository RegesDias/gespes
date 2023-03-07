<?php
header('Content-Type: application/json');
require_once '../../class/Documentos.php';
require_once '../../class/Movimentacao.php';
$d = new Documentos;
$m = new Movimentacao;
$idMovimentacao = $d->setDado($_GET['idMovimentacao']);
$idDocumento = $d->setDado($_GET['idDocumento']);
$encaminharTexto = 'DOCUMENTO ARQUIVADO POR '.$_SESSION['nome'];
$destino = 'PROCESSO FINALIZADO NA SEMARH';

if ($m->validaMovimentacao($idMovimentacao)){
    if(Conexao::verificaLogin('protocolo')){
        $d->finalizarMovimento($idMovimentacao);
        $d->saidaExecutar($idDocumento,$destino,$encaminharTexto);
        $d->arquivarDocumento($idDocumento);
            $m->gravaLog('Documento '.$idDocumento.' arquivamento executada pelo usuário '.$_SESSION['id']);
            $retorno = array('codigo' => 1, 'mensagem' => 'Documento arquivado com sucesso!');
            echo json_encode($retorno);
    }
}else{
    $retorno = array('codigo' => 1, 'mensagem' => 'Erro executar saída documento '.$idMovimentacao);
    echo json_encode($retorno);  
}
?>

