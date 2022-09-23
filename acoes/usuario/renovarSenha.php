<?php
session_start();
header('Content-Type: application/json');
require_once('../../class/Usuario.php');
$u = new Usuario;

$email = $u->setDado($_POST['email']);
$cpf = $u->setDado($_POST['cpf']);

//Validar dados
if(Conexao::verificaLogin('usuarios')){
    $u->gravaLog('Renovar senha do usuário com o cpf: '.$cpf);
    $retorno = $u->insereNovaSenha($cpf,$email);
}