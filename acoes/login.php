<?php
session_start();

// Constante com a quantidade de tentativas aceitas
define('TENTATIVAS_ACEITAS', 5); 

// Constante com a quantidade minutos para bloqueio
define('MINUTOS_BLOQUEIO', 30); 

// Require da classe de conexão
require_once('../class/Conexao.php');


//1 - Verifica se a origem da requisição é do mesmo domínio da aplicação
/*if (isset($_SERVER['HTTP_REFERER']) && $_SERVER['HTTP_REFERER'] != "http://localhost/login/index.php"):
	$retorno = array('codigo' => 0, 'mensagem' => 'Origem da requisição não autorizada!');
	echo json_encode($retorno);
	exit();
endif;
*/


// Recebe os dados do formulário
$email = (isset($_POST['email'])) ? $_POST['email'] : '' ;
$senha = md5((isset($_POST['senha'])) ? $_POST['senha'] : '' );

//2 - Validações de preenchimento e-mail e senha se foi preenchido o e-mail
if (empty($email)):
	$retorno = array('codigo' => 0, 'mensagem' => 'Preencha seu e-mail!');
	echo json_encode($retorno);
	exit();
endif;

if (empty($senha)):
	$retorno = array('codigo' => 0, 'mensagem' => 'Preencha sua senha!');
	echo json_encode($retorno);
	exit();
endif;


//3 - Verifica se o formato do e-mail é válido
/*
if (!filter_var($email, FILTER_VALIDATE_EMAIL)):
    $retorno = array('codigo' => 0, 'mensagem' => 'Formato de e-mail inválido!');
	echo json_encode($retorno);
	exit();
endif;
*/

// Dica 4 - Verifica se o usuário já excedeu a quantidade de tentativas erradas do dia
$sql = "SELECT count(*) AS tentativas, MINUTE(TIMEDIFF(NOW(), MAX(data_hora))) AS minutos ";
$sql .= "FROM usuario_log WHERE ip = ? and DATE_FORMAT(data_hora,'%Y-%m-%d') = ? AND bloqueado = ?";
$stm = Conexao::Inst()->prepare($sql);
$stm->bindValue(1, $_SERVER['SERVER_ADDR']);
$stm->bindValue(2, date('Y-m-d'));
$stm->bindValue(3, 'SIM');
$stm->execute();
$retorno = $stm->fetch(PDO::FETCH_OBJ);

if (!empty($retorno->tentativas) && intval($retorno->minutos) <= MINUTOS_BLOQUEIO):
	$_SESSION['tentativas'] = 0;
	$retorno = array('codigo' => 0, 'mensagem' => 'Você excedeu o limite de '.TENTATIVAS_ACEITAS.' tentativas, login bloqueado por '.MINUTOS_BLOQUEIO.' minutos!');
	echo json_encode($retorno);
	exit();
endif;

//5 - Válida os dados do usuário com o banco de dados
$sql = "SELECT id, nome, senha, email FROM usuario WHERE email = ? AND status = 'A' LIMIT 1";
$stm = Conexao::Inst()->prepare($sql);
$stm->bindValue(1, $email);
$stm->execute();
$retorno = $stm->fetch(PDO::FETCH_OBJ);


//6 - Válida a senha utlizando a API Password Hash
if(!empty($retorno) && ($senha == $retorno->senha)):
	$token = uniqid();
	$_SESSION['id'] = $retorno->id;
	$_SESSION['nome'] = $retorno->nome;
	$_SESSION['email'] = $retorno->email;
	$_SESSION['tentativas'] = 0;
	$_SESSION['logado'] = 'SIM';
	$_SESSION['token'] = $token;
	$sql = "UPDATE usuario SET token = '$token' WHERE id = ?";
	$stm = Conexao::Inst()->prepare($sql);
	$stm->bindValue(1, $retorno->id);
	$stm->execute();
else:
	$_SESSION['logado'] = 'NAO';
	$_SESSION['tentativas'] = (isset($_SESSION['tentativas'])) ? $_SESSION['tentativas'] += 1 : 1;
	$bloqueado = ($_SESSION['tentativas'] == TENTATIVAS_ACEITAS) ? 'SIM' : 'NAO';

	//7 - Grava a tentativa independente de falha ou não
	$sql = 'INSERT INTO usuario_log (ip, email, senha, origem, bloqueado) VALUES (?, ?, ?, ?, ?)';
	$stm = Conexao::Inst()->prepare($sql);
	$stm->bindValue(1, $_SERVER['SERVER_ADDR']);
	$stm->bindValue(2, $email);
	$stm->bindValue(3, $senha);
	$stm->bindValue(4, $_SERVER['HTTP_REFERER']);
	$stm->bindValue(5, $bloqueado);
	$stm->execute();
endif;


// Se logado envia código 1, senão retorna mensagem de erro para o login
if ($_SESSION['logado'] == 'SIM'):
	$retorno = array('codigo' => 1, 'mensagem' => 'Logado com sucesso!');
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