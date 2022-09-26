<?php

header('Content-Type: application/json');
require_once('../../class/Servidor.php');
$s = new Servidor;

$dado = $s->setDado($_GET['dado']);
$order = $s->setDado($_GET['order']);

$s->verificaPreenchimentoCampo($dado, 'busca');
$call = $s->buscaMatriculaCpfNome($dado, $order);
$exec = Conexao::InstSDGC()->prepare($call);

if(Conexao::verificaLogin('consultaPessoal')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $s->gravaLog('Busca Pessoal: '.$dado);
        $exec = $exec->fetchAll(PDO::FETCH_ASSOC);
        $total = count($exec);
        if ($order ==''){
            $retorno = array('codigo' => 1, 'exec' => $exec, 'mensagem' => 'Total de '.$total.' Servidores encontrados');
            echo json_encode($retorno);
        }else{
            $retorno = array('codigo' => 1, 'exec' => $exec, 'mensagem' => 'Busca ordenada por  '.$order.' !');
            echo json_encode($retorno);
        }
    } else {
        $retorno = array('codigo' => 0, 'mensagem' => 'Nenhum servidor encontrado!');
        echo json_encode($retorno);
    }
}