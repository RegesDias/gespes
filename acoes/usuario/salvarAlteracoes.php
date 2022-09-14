<?php
header('Content-Type: application/json');

require_once('../../class/Usuario.php');
$cpf = (isset($_POST['cpf'])) ? $_POST['cpf'] : '' ;
$nome = (isset($_POST['nome'])) ? $_POST['nome'] : '' ;
$status =(isset($_POST['status'])) ? $_POST['status'] : '' ;
$atendimentoEntrada =(isset($_POST['atendimentoEntrada'])) ? $_POST['atendimentoEntrada'] : '' ;
$atendimentoAgenda = (isset($_POST['atendimentoAgenda'])) ? $_POST['atendimentoAgenda'] : '';
$alterarSenha = (isset($_POST['alterarSenha'])) ? $_POST['alterarSenha'] : '';
$usuarios = (isset($_POST['usuarios'])) ? $_POST['usuarios'] : '';
$consultaPessoal = (isset($_POST['consultaPessoal'])) ? $_POST['consultaPessoal'] : '';
$u = new Usuario;
$u->verificaPreenchimentoCampo($nome,'nome');
$u->verificaPreenchimentoCampo($status, 'status');
$u->atualizarDadosUsuario($cpf,$nome,$status,$atendimentoEntrada,$atendimentoAgenda,$alterarSenha,$usuarios,$consultaPessoal);


if(Conexao::verificaLogin()){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('Erro ao salvar Usuário');
    }
}