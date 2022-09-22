<?php
header('Content-Type: application/json');

require_once('../../class/Usuario.php');
$cpf = (isset($_POST['cpf'])) ? $_POST['cpf'] : '' ;
$nome = (isset($_POST['nome'])) ? $_POST['nome'] : '' ;
$status =(isset($_POST['status'])) ? $_POST['status'] : '' ;
$atendimentoEntrada =(isset($_POST['atendimentoEntrada'])) ? $_POST['atendimentoEntrada'] : '' ;
$atendimentoAgenda = (isset($_POST['atendimentoAgenda'])) ? $_POST['atendimentoAgenda'] : '';
$alterarSenha = (isset($_POST['alterarSenha'])) ? $_POST['alterarSenha'] : '';
$usuarios = (isset($_POST['usuarios'])) ? $_POST['usuarios'] : '';
$setor = (isset($_POST['setor'])) ? $_POST['setor'] : '';
$consultaPessoal = (isset($_POST['consultaPessoal'])) ? $_POST['consultaPessoal'] : '';
$u = new Usuario;
$u->verificaPreenchimentoCampo($nome,'nome');
$u->verificaPreenchimentoCampo($status, 'status');

if(Conexao::verificaLogin('usuarios')){
        $u->gravaLog('Modificado os dados do usuário com o cpf: '.$cpf);
        $u->atualizarDados($cpf,$nome,$status,$atendimentoEntrada,$atendimentoAgenda,$alterarSenha,$usuarios,$consultaPessoal,$setor);
        echo json_encode($exec->fetchAll(PDO::FETCH_ASSOC));
}