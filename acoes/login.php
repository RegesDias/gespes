<?php
session_start();
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
$u->verificaUsuarioSenha($retorno[0], $senha);
$u->verificaSeSenhaIgualCPF($senha,$retorno[0]->CPF,$retorno[0]->nome);

if ($_SESSION['logado'] == 'SIM'):
	$retorno = array(
						'codigo' => 1, 
						'mensagem' => 'Logado com sucesso!', 
						'nome' => $retorno[0]->nome,
						'consultaPessoal' => $retorno[0]->consultaPessoal,
						'atendimentoEntrada' => $retorno[0]->atendimentoEntrada,
						'atendimentoAgenda' => $retorno[0]->atendimentoAgenda,
						'alterarSenha' => $retorno[0]->alterarSenha,
						'usuarios'  => $retorno[0]->usuarios
					);
	echo json_encode($retorno);
	exit();
else:
	$u->verificaBloqueio();
endif;