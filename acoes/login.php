<?php
session_start();
header('Content-Type: application/json');
require_once('../class/Usuario.php');
$u = new Usuario;

$email = $u->setDado($_POST['email']);
$senha = $u->setDado($_POST['senha']);

$u->verificaPreenchimentoCampo($email,'chave');
$u->verificaPreenchimentoCampo($senha, 'senha');

//Validacao
$retorno = $u->contaTentativasLoginFalhas();
$u->bloqueiaContaExcedeuTentativasLogin($retorno);
$retorno = $u->buscaEmail($email);
if ($retorno[0]->status != 'Ativo'){
	$retorno = array('codigo' => 0, 'mensagem' => 'Usuário '.$retorno[0]->nome.' está '.$retorno[0]->status);
	echo json_encode($retorno);
	exit();
}
$u->verificaSenha($retorno[0], $senha);

if ($_SESSION['logado'] == 'SIM'):
	$u->verificaSeSenhaIgualCPF($senha,$retorno[0]->CPF,$retorno[0]->nome);
	$retorno = array(
						'codigo' => 1, 
						'mensagem' => 'Logado com sucesso!', 
						'id' => $retorno[0]->id,
						'nome' => $retorno[0]->nome,
						'CPF' => $retorno[0]->CPF,
						'adm' => $retorno[0]->adm,
						'consultaPessoal' => $retorno[0]->consultaPessoal,
						'pessoal' => $retorno[0]->pessoal,
						'protocolo' => $retorno[0]->protocolo,
						'protFiltroUsuarios' => $retorno[0]->protFiltroUsuarios,
						'protFiltroSetor' => $retorno[0]->protFiltroSetor,
						'protBTNArquivar' => $retorno[0]->protBTNArquivar,
						'protBTNMovimentar' => $retorno[0]->protBTNMovimentar,
						'protBTNInserir' => $retorno[0]->protBTNInserir,
						'protSelectTodosUsuarios' => $retorno[0]->protSelectTodosUsuarios,
						'atendimentoAgenda' => $retorno[0]->atendimentoAgenda,
						'agenda' => $retorno[0]->agenda,
						'periciaMedica' => $retorno[0]->periciaMedica,
						'alterarSenha' => $retorno[0]->alterarSenha,
						'usuarios'  => $retorno[0]->usuarios,
						'relatFichaFuncional'  => $retorno[0]->relatFichaFuncional,
						'relatAtribuicoesCargo'  => $retorno[0]->relatAtribuicoesCargo,
						'relatFolhaPonto'  => $retorno[0]->relatFolhaPonto,
						'relatContraCheque'  => $retorno[0]->relatContraCheque,
						'idSetor'  => $retorno[0]->idSetor,
						'setor'  => $retorno[0]->setor,
						'atendimento'  => $retorno[0]->atendimento,
						'medico'  => $retorno[0]->medico
					);
	echo json_encode($retorno);
	exit();
else:
	$u->verificaBloqueio();
endif;