<?php

header('Content-Type: application/json');
require_once('../../class/Usuario.php');
$u = new Usuario;

$cpf = $u->setDado($_POST['cpf']);
$nome = $u->setDado($_POST['nome']);
$status = $u->setDado($_POST['status']);
$atendimentoEntrada = $u->setDado($_POST['atendimentoEntrada']);
$atendimentoAgenda = $u->setDado($_POST['atendimentoAgenda']);
$alterarSenha = $u->setDado($_POST['alterarSenha']);
$usuarios = $u->setDado($_POST['usuarios']);
$setor = $u->setDado($_POST['setor']);
$consultaPessoal = $u->setDado($_POST['consultaPessoal']);
$idSetor = $u->setDado($_POST['idSetor']);

$u->verificaPreenchimentoCampo($nome,'nome');
$u->verificaPreenchimentoCampo($status, 'status');

if(Conexao::verificaLogin('usuarios')){
        $u->gravaLog('Modificado os dados do usuário com o cpf: '.$cpf);
        $u->atualizarDados($cpf,$nome,$status,$atendimentoEntrada,$atendimentoAgenda,$alterarSenha,$usuarios,$consultaPessoal,$setor,$idSetor);
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
}