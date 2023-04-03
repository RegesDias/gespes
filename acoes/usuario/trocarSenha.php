<?php
session_start();
header('Content-Type: application/json');
require_once('../../class/Usuario.php');
$u = new Usuario;

$email = $u->setDado($_POST['email']);
$senha = $u->setDado($_POST['senha']);
$senhaNovaSenha = $u->setDado($_POST['senhaNovaSenha']);
$senhaNovaSenha2 = $u->setDado($_POST['senhaNovaSenha2']);

$u->verificaPreenchimentoCampo($email,' chave');
$u->verificaPreenchimentoCampo($senha, 'senha');
$u->verificaPreenchimentoCampo($senhaNovaSenha, 'Nova Senha');
$u->verificaPreenchimentoCampo($senhaNovaSenha, 'Nova Senha');
$u->verificaSenhasCoincidem($senhaNovaSenha, $senhaNovaSenha2);
$u->isValidPassword($senhaNovaSenha);

$retorno = $u->buscaEmail($email);
$u->verificaSenha($retorno[0], $senha);
if ($_SESSION['logado'] == 'SIM'){
	if(Conexao::verificaLogin('alterarSenha')){
		$u->gravaLog('Usuario trocou sua senha');
		$u->insereNovaSenha($senhaNovaSenha,$email);
	}
}else{
	$u->verificaBloqueio();
}
