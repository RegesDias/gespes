<?php
header('Content-Type: application/json');

require_once('../../class/Usuario.php');
$cpf = (isset($_POST['cpf'])) ? $_POST['cpf'] : '' ;
$nome = (isset($_POST['nome'])) ? $_POST['nome'] : '' ;
$email = (isset($_POST['email'])) ? $_POST['email'] : '';
$status = (isset($_POST['status'])) ? $_POST['status'] : '' ;
$atendimentoEntrada =(isset($_POST['atendimentoEntrada'])) ? $_POST['atendimentoEntrada'] : '' ;
$atendimentoAgenda = (isset($_POST['atendimentoAgenda'])) ? $_POST['atendimentoAgenda'] : '';
$alterarSenha = (isset($_POST['alterarSenha'])) ? $_POST['alterarSenha'] : '';
$usuarios = (isset($_POST['usuarios'])) ? $_POST['usuarios'] : '';
$consultaPessoal = (isset($_POST['consultaPessoal'])) ? $_POST['consultaPessoal'] : '';

//$senha = (isset($_POST['senha'])) ? $_POST['senha'] : '';
//$senha2 = (isset($_POST['senha2'])) ? $_POST['senha2'] : '';


$u = new Usuario;
$u->verificaPreenchimentoCampo($cpf,'cpf');
$u->verificaPreenchimentoCpf($cpf);
$u->verificaPreenchimentoCampo($nome,'nome');
$u->verificaPreenchimentoCampo($email,'chave');
$u->verificaPreenchimentoCampo($status, 'status');
//$u->atualizarDadosUsuario($cpf,$nome,$status,$atendimentoEntrada,$atendimentoAgenda,$alterarSenha,$usuarios,$consultaPessoal);

/*
if(Conexao::verificaLogin()){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('Erro ao salvar Usuário');
    }
}