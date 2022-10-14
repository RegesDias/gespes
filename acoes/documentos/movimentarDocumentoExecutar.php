<?php
header('Content-Type: application/json');
require_once '../../class/Documentos.php';
require_once '../../class/Movimentacao.php';
$d = new Documentos;
$m = new Movimentacao;
$idMovimentacao = $d->setDado($_GET['idMovimentacao']);
$idDocumento = $d->setDado($_GET['idDocumento']);
$encaminharResponsavel = $d->setDado($_GET['encaminharResponsavel']);
$movimentacoesSetor = $d->setDado($_GET['movimentacoesSetor']);
$encaminharTexto = $d->setDado($_GET['encaminharTexto']);

$d->verificaPreenchimentoCampo($movimentacoesSetor, 'Setor');
$d->verificaPreenchimentoCampo($encaminharResponsavel, 'Responsável');
$d->verificaPreenchimentoCampo($encaminharTexto, 'Encaminhamento');


if ($m->validaMovimentacao($idMovimentacao)){
    //if(Conexao::verificaLogin('consultaPessoal')){
        $d->finalizarMovimento($idMovimentacao);
        $d->movimentarExecutar($idDocumento,$encaminharResponsavel,$movimentacoesSetor,$encaminharTexto);
            $m->gravaLog('Documento '.$idDocumento.' movimentado pelo usuario '.$_SESSION['id']);
            $retorno = array('codigo' => 1, 'mensagem' => 'Documento encaminhado com sucesso!');
            echo json_encode($retorno);
    //}
}else{
    $retorno = array('codigo' => 1, 'mensagem' => 'Erro ao movimentar documento '.$idMovimentacao);
    echo json_encode($retorno);  
}
?>

