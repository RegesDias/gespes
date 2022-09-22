<?php
header('Content-Type: application/json');

require_once('../../class/Usuario.php');
$dado = $_GET['dado'];
$u = new Usuario;
$u->verificaPreenchimentoCampo($dado, 'busca');
$exec = $u->buscaCpfNome($dado);

if(Conexao::verificaLogin('usuarios')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $u->gravaLog('Busca usuario: '.$dado);
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        $retorno = array('codigo' => 0, 'mensagem' => 'Nenhum usuário encontrado!');
        echo json_encode($retorno);
    }
}