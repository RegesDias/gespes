<?php
session_start();
define('TENTATIVAS_ACEITAS', 5); 
define('MINUTOS_BLOQUEIO', 30); 
require_once('../../class/Usuario.php');

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
$u->isValidPassword($senhaNovaSenha);

$retorno = $u->buscaUsuarioEmail($email);
$u->verificaUsuarioSenha($retorno[0], $email, $senha);
if ($_SESSION['logado'] == 'SIM'){
	if(Conexao::verificaLogin('alterarSenha')){
		$u->insereNovaSenha($senhaNovaSenha,$email);
	}
}else{
	if ($_SESSION['tentativas'] == TENTATIVAS_ACEITAS):
		$retorno = array('codigo' => 0, 'mensagem' => 'Você excedeu o limite de '.TENTATIVAS_ACEITAS.' tentativas, login bloqueado por '.MINUTOS_BLOQUEIO.' minutos!');
		echo json_encode($retorno);
		exit();
	else:
		$retorno = array('codigo' => '0', 'mensagem' => 'Senha incorreta usuário não autorizado, você tem mais '. (TENTATIVAS_ACEITAS - $_SESSION['tentativas']) .' tentativa(s) antes do bloqueio!');
		echo json_encode($retorno);
		exit();
	endif;
}

//http://localhost/gespes/gespes/acoes/usuario/trocarSenha.php?email=dreges&senha=teste&senhaNovaSenha=omegaX0521&senhaNovaSenha2=omegaX0521