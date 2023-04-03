<?php
header('Content-Type: application/json');
require_once '../../class/Observacao.php';
$o = new Observacao;
$documento_id = $o->setDado($_POST['documento_id']);
$observacao = $o->setDado($_POST['observacao']);

$o->verificaPreenchimentoCampo($observacao, 'Observação');


if(Conexao::verificaLogin('protocolo')){
    $o->escrever($documento_id, $observacao);
        $o->gravaLog('Observacao salva no documento '.$idDocumento);
        $retorno = array('codigo' => 1, 'mensagem' => 'Observação salva com sucesso!');
        echo json_encode($retorno);
}

//22851
?>
