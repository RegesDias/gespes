<?php
session_start();
define('TENTATIVAS_ACEITAS', 5); 
define('MINUTOS_BLOQUEIO', 30); 

// Require da classe de conexão
require_once('../class/Usuario.php');

// Recebe os dados do formulário
$email = (isset($_POST['email'])) ? $_POST['email'] : '' ;
$senha = (isset($_POST['senha'])) ? $_POST['senha'] : '' ;

$u = new Usuario;
$u->verificaPreenchimentoCampo($email,'chave');
$u->verificaPreenchimentoCampo($senha, 'senha');

//Validacao
$retorno = $u->contaTentativasLoginFalhas();
$u->bloqueiaContaExcedeuTentativasLogin($retorno);
$retorno = $u->buscaUsuarioEmail($email);
if ($retorno[0]->status != 'Ativo'){
	$retorno = array('codigo' => 0, 'mensagem' => 'Usuário '.$retorno[0]->nome.' está '.$retorno[0]->status);
	echo json_encode($retorno);
	exit();
}
$u->verificaUsuarioSenha($retorno[0], $email, $senha);
$u->verificaSeSenhaIgualCPF($senha,$retorno[0]->CPF,$retorno[0]->nome);

if ($_SESSION['logado'] == 'SIM'):
	$retorno = array('codigo' => 1, 'mensagem' => 'Logado com sucesso!', 'nome' => $retorno[0]->nome);
	echo json_encode($retorno);
	exit();
else:
	if ($_SESSION['tentativas'] == TENTATIVAS_ACEITAS):
		$retorno = array('codigo' => 0, 'mensagem' => 'Você excedeu o limite de '.TENTATIVAS_ACEITAS.' tentativas, login bloqueado por '.MINUTOS_BLOQUEIO.' minutos!');
		echo json_encode($retorno);
		exit();
	else:
		$retorno = array('codigo' => '0', 'mensagem' => 'Usuário não autorizado, você tem mais '. (TENTATIVAS_ACEITAS - $_SESSION['tentativas']) .' tentativa(s) antes do bloqueio!');
		echo json_encode($retorno);
		exit();
	endif;
endif;