<?php
session_start();
require_once('../class/Conexao.php');



// Recebe os dados do formulário
$email = (isset($_POST['email'])) ? $_POST['email'] : '' ;
$senha =(isset($_POST['senha'])) ? $_POST['senha'] : '' ;
$senhaNovaSenha =(isset($_POST['senhaNovaSenha'])) ? $_POST['senhaNovaSenha'] : '' ;
$senhaNovaSenha2 = (isset($_POST['senhaNovaSenha2'])) ? $_POST['senhaNovaSenha2'] : '';

//2 - Validações de preenchimento e-mail e senha se foi preenchido o e-mail
if (empty($email)):
	$retorno = array('codigo' => 0, 'mensagem' => 'Preencha seu login!');
	echo json_encode($retorno);
	exit();
endif;

if (empty($senha)):
	$retorno = array('codigo' => 0, 'mensagem' => 'Preencha sua senha!');
	echo json_encode($retorno);
	exit();
endif;

if (empty($senhaNovaSenha)):
	$retorno = array('codigo' => 0, 'mensagem' => 'Preencha nova 1senha!');
	echo json_encode($retorno);
	exit();
endif;

if (empty($senhaNovaSenha2)):
	$retorno = array('codigo' => 0, 'mensagem' => 'Preencha nova 2senha!');
	echo json_encode($retorno);
	exit();
endif;
if ($senhaNovaSenha2 != $senhaNovaSenha):
	$retorno = array('codigo' => 0, 'mensagem' => 'Senhas não coincidem!');
	echo json_encode($retorno);
	exit();
endif;
if(Conexao::verificaLogin()){
	$token = $_SESSION['token'];
	$senha = md5($senha);
	$senhaNovaSenha = md5($senhaNovaSenha);
	$senhaNovaSenha2 = md5($senhaNovaSenha2);
	$sql = "UPDATE usuario SET senha = '$senhaNovaSenha' WHERE token = '$token'";
	$stm = Conexao::Inst()->prepare($sql);
	$stm->bindValue(1, $retorno->id);
	$stm->execute();
	$retorno = array('codigo' => 1, 'mensagem' => 'Senha alterada com sucesso!');
	echo json_encode($retorno);
	exit();
}
