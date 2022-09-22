<?php
header('Content-Type: application/json');

require_once('../../class/Usuario.php');
$cpf = (isset($_POST['cpf'])) ? $_POST['cpf'] : '' ;
$nome = strtoupper((isset($_POST['nome'])) ? $_POST['nome'] : '' );
$chave = (isset($_POST['email'])) ? $_POST['email'] : '';
$status = (isset($_POST['status'])) ? $_POST['status'] : '' ;
$atendimentoEntrada =(isset($_POST['atendimentoEntrada'])) ? $_POST['atendimentoEntrada'] : '' ;
$atendimentoAgenda = (isset($_POST['atendimentoAgenda'])) ? $_POST['atendimentoAgenda'] : '';
$alterarSenha = (isset($_POST['alterarSenha'])) ? $_POST['alterarSenha'] : '';
$usuarios = (isset($_POST['usuarios'])) ? $_POST['usuarios'] : '';
$setor = (isset($_POST['setor'])) ? $_POST['setor'] : '';
$consultaPessoal = (isset($_POST['consultaPessoal'])) ? $_POST['consultaPessoal'] : '';

$senha = (isset($_POST['senha'])) ? $_POST['senha'] : '';
$senha2 = (isset($_POST['senha2'])) ? $_POST['senha2'] : '';


$u = new Usuario;
$u->verificaPreenchimentoCampo($cpf,'cpf');
$u->verificaPreenchimentoCpf($cpf);
$u->verificaPreenchimentoCampo($nome,'nome');
$u->verificaPreenchimentoChave($chave,'chave');
$u->verificaPreenchimentoCampo($status, 'status');
$u->verificaSenhasCoincidem($senha, $senha2);
$senha = $u->substituirSenhaPorCPF($senha,$cpf);
$u->insereNovo($chave,$senha,$cpf, $nome,$status,$atendimentoEntrada,$atendimentoAgenda,$alterarSenha,$usuarios,$setor,$consultaPessoal);

if(Conexao::verificaLogin('usuarios')){
    $exec->execute();
    if ($exec->rowCount() >= 1) {
        $u->gravaLog('Insere novo Usuário com o CPF: '.$cpf);
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
    } else {
        echo json_encode('Erro ao salvar Usuário');
    }
}