<?php

header('Content-Type: application/json');
require_once('../../class/Usuario.php');
$u = new Usuario;

$cpf = $u->setDado($_POST['cpf']);
$nome = $u->setDado($_POST['nome']);
$status = $u->setDado($_POST['status']);
$protocolo = $u->setDado($_POST['protocolo']);
$atendimentoAgenda = $u->setDado($_POST['atendimentoAgenda']);
$alterarSenha = $u->setDado($_POST['alterarSenha']);
$usuarios = $u->setDado($_POST['usuarios']);
$setor = $u->setDado($_POST['setor']);
$consultaPessoal = $u->setDado($_POST['consultaPessoal']);
$idSetor = $u->setDado($_POST['idSetor']);
$relatFichaFuncional = $u->setDado($_POST['relatFichaFuncional']);
$relatAtribuicoesCargo = $u->setDado($_POST['relatAtribuicoesCargo']);
$relatFolhaPonto = $u->setDado($_POST['relatFolhaPonto']);
$relatContraCheque = $u->setDado($_POST['relatContraCheque']);

$u->verificaPreenchimentoCampo($nome,'nome');
$u->verificaPreenchimentoCampo($status, 'status');

if(Conexao::verificaLogin('usuarios')){
        $u->gravaLog('Modificado os dados do usuário com o cpf: '.$cpf);
        $u->atualizarDados($cpf,$nome,$status,$protocolo,$atendimentoAgenda,$alterarSenha,$usuarios,$consultaPessoal,$setor,$idSetor,$relatFichaFuncional,$relatAtribuicoesCargo,$relatFolhaPonto,$relatContraCheque);
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
}