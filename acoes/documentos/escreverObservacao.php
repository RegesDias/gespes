<?php
header('Content-Type: application/json');
require_once '../../class/Observacao.php';
$o = new Observacao;
$documento_id = $o->setDado($_GET['documento_id']);
$observacao = $o->setDado($_GET['observacao']);

$o->verificaPreenchimentoCampo($observacao, 'Observação');


//if(Conexao::verificaLogin('consultaPessoal')){
    $o->escrever($documento_id, $observacao);
        $o->gravaLog('Observacao salva no documento '.$idDocumento);
        $retorno = array('codigo' => 1, 'mensagem' => 'Observação salva com sucesso!');
        echo json_encode($retorno);
//}

//22851
?>
