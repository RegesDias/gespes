<?php
//header('Content-Type: application/json');

require_once('../../class/Setor.php');
$nome = strtoupper((isset($_POST['nome'])) ? $_POST['nome'] : '' );
$status = (isset($_POST['status'])) ? $_POST['status'] : '' ;
$u = new Setor;
$u->verificaPreenchimentoCampo($nome,'nome');
$u->verificaPreenchimentoCampo($status, 'status');
$u->insereNovo($nome, $status);

if(Conexao::verificaLogin('setor')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $u->gravaLog('Insere novo setor com o nome: '.$nome);
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('Erro ao salvar setor');
    }
}