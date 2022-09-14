<?php
session_start();
require_once('../class/Usuario.php');

// Recebe os dados do formulário
$email = (isset($_POST['email'])) ? $_POST['email'] : '' ;
$senha =(isset($_POST['senha'])) ? $_POST['senha'] : '' ;
$senhaNovaSenha =(isset($_POST['senhaNovaSenha'])) ? $_POST['senhaNovaSenha'] : '' ;
$senhaNovaSenha2 = (isset($_POST['senhaNovaSenha2'])) ? $_POST['senhaNovaSenha2'] : '';

//Validar dados
$u = new Usuario;
$u->verificaPreenchimentoCampo($email,' chave');
$u->verificaPreenchimentoCampo($senha, 'senha');
$u->verificaPreenchimentoCampo($senhaNovaSenha, 'Nova Senha');
$u->verificaPreenchimentoCampo($senhaNovaSenha, 'Nova Senha');

$u->verificaSenhasCoincidem($senhaNovaSenha, $senhaNovaSenha2);
if(Conexao::verificaLogin()){
	$u->insereNovaSenha($senhaNovaSenha);
}
