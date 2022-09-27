<?php

header('Content-Type: application/json');
require_once('../../class/Usuario.php');
$u = new Usuario;

$cpf = $u->setDado($_POST['cpf']);
$nome = $u->setDado($_POST['nome']);
$chave = $u->setDado($_POST['email']);
$status = $u->setDado($_POST['status']);
$atendimentoEntrada = $u->setDado($_POST['atendimentoEntrada']);
$atendimentoAgenda = $u->setDado($_POST['atendimentoAgenda']);
$alterarSenha = $u->setDado($_POST['alterarSenha']);
$usuarios = $u->setDado($_POST['usuarios']);
$setor = $u->setDado($_POST['setor']);
$consultaPessoal = $u->setDado($_POST['consultaPessoal']);
$idSetor = $u->setDado($_POST['idSetor']);

$senha = $u->setDado($_POST['senha']);
$senha2 = $u->setDado($_POST['senha2']);

$u->verificaPreenchimentoCampo($cpf,'cpf');
$u->verificaPreenchimentoCpf($cpf);
$u->verificaPreenchimentoCampo($nome,'nome');
$u->verificaPreenchimentoChave($chave,'chave');
$u->verificaPreenchimentoCampo($status, 'status');
$u->verificaSenhasCoincidem($senha, $senha2);
$senha = $u->substituirSenhaPorCPF($senha,$cpf);
$u->insereNovo($chave,$senha,$cpf, $nome,$status,$atendimentoEntrada,$atendimentoAgenda,$alterarSenha,$usuarios,$setor,$consultaPessoal,$idSetor);

if(Conexao::verificaLogin('usuarios')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $u->gravaLog('Insere novo Usuário com o CPF: '.$cpf);
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('Erro ao salvar Usuário');
    }
}