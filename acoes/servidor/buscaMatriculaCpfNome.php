<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('../../class/Servidor.php');
$dado = (isset($_GET['dado'])) ? $_GET['dado'] : '' ;
$s = new Servidor;
$s->verificaPreenchimentoCampo($dado, 'busca');
$exec = $s->buscaMatriculaCpfNome($dado);

if(Conexao::verificaLogin('consultaPessoal')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $s->gravaLog('Busca Pessoal: '.$dado);
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        $retorno = array('codigo' => 0, 'mensagem' => 'Nenhum servidor encontrado!');
        echo json_encode($retorno);
    }
}