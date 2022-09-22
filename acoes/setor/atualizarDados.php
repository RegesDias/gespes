<?php
header('Content-Type: application/json');

require_once('../../class/Setor.php');
$id = (isset($_POST['id'])) ? $_POST['id'] : '' ;
$nome = (isset($_POST['nome'])) ? $_POST['nome'] : '' ;
$status =(isset($_POST['status'])) ? $_POST['status'] : '' ;
$u = new Setor;
$u->verificaPreenchimentoCampo($nome,'nome');
$u->verificaPreenchimentoCampo($status, 'status');

if(Conexao::verificaLogin('usuarios')){
        $u->gravaLog('Modificado os dados do setor com o id: '.$id);
        $u->atualizarDados($id,$nome,$status);
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
}
